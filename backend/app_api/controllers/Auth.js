const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

const signUp = async function (req, res) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
            return;
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            createResponse(res, 400, { status: "Bu e-posta adresiyle zaten bir hesap var." });
            return;
        }

        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save().then((newUser) => {
            createResponse(res, 201, newUser);
        });
    } catch (error) {
        console.error(error);
        createResponse(res, 400, { status: "Kayıt Başarısız!" });
    }
};

const login = async function (req, res) {
    if (!req.body.email || !req.body.password) {
        createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
        return;
    }
    
    passport.authenticate("user", (err, currentUser, info) => {
        if (err) {
            console.error(err);
            return createResponse(res, 500, { status: "Sunucu hatası!" });
        }
        if (currentUser) {
            let generateToken = currentUser.generateToken();
            createResponse(res, 200, {
                _id: currentUser._id, 
                token: generateToken , 
                name: currentUser.name, 
                email: currentUser.email, 
                favMovies: currentUser.favMovies, 
                likeMovies: currentUser.likeMovies 
            });
        } else {
            console.error(info);
            createResponse(res, 400, { status: info.message || "Kullanıcı adı ya da şifre hatalı" });
        }
    })(req, res);
};


module.exports = {
    signUp,
    login
};
