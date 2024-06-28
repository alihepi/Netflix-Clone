const passport = require("passport");
const mongoose = require("mongoose");
require("../models/admin");
const Admin = mongoose.model("admin");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

const signUpAdmin = async function (req, res) {
    try {
        if (!req.body.nickname || !req.body.name || !req.body.password) {
            createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
            return;
        }

        const existingAdmin = await Admin.findOne({ nickname: req.body.nickname });
        if (existingAdmin) {
            createResponse(res, 400, { status: "Bu nickname'e sahip bir hesap zaten var." });
            return;
        }

        const admin = new Admin();
        admin.name = req.body.name;
        admin.nickname = req.body.nickname;
        admin.setPassword(req.body.password);

        await admin.save().then((newAdmin) => {
            createResponse(res, 201, newAdmin);
        });
    } catch (error) {
        console.error(error);
        createResponse(res, 400, { status: "Kayıt Başarısız!" });
    }
};

const loginAdmin = async function (req, res) {
    if (!req.body.nickname || !req.body.password) {
        createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
        return;
    }
    passport.authenticate("admin", (err, currentAdmin, info) => {
        if (err) {
            console.error(err);
            return createResponse(res, 500, { status: "Sunucu hatası!" });
        }
        if (!currentAdmin) {
            console.error(info);
            return createResponse(res, 400, { status: info.message || "Kullanıcı adı ya da şifre hatalı" });
        }
        let generateToken = currentAdmin.generateToken();
        createResponse(res, 200, { 
            token: generateToken, 
            name: currentAdmin.name, 
            nickname: currentAdmin.nickname,
            id: currentAdmin._id
        });
    })(req, res);
};

module.exports = {
    signUpAdmin,
    loginAdmin
};
