require('dotenv').config();
const mongoose = require("mongoose");
const User = mongoose.model("user");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.PROJECT_MAIL,
    pass: process.env.PROJECT_MAIL_PASSWORD,
  },
});

// createResponse function to create a consistent response format
const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

// getUser function to fetch user based on authentication token
const getUser = async (req, res, callback) => {
  try {
    if (req.auth && req.auth.email) {
      const user = await User.findOne({ email: req.auth.email });
      if (user) {
        callback(req, res, user.name);
      } else {
        createResponse(res, 404, { status: "Kullanıcı Bulunamadı" });
      }
    } else {
      createResponse(res, 400, { status: "Token Girilmedi" });
    }
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

const userInf = async (req, res) => {
  try {
    await getUser(req, res, async (req, res, userName) => {
      const user = await User.findOne({ email: req.auth.email });
      if (!user) {
        return createResponse(res, 404, { status: "Kullanıcı bulunamadı." });
      } else {
        return createResponse(res, 200, user);
      }
    });
  } catch (error) {
    createResponse(res, 400, { status: "Kullanıcı bilgileri getirilirken bir hata oluştu." });
  }
};


const updateUser = async (req, res) => {
  try {
    await getUser(req, res, async (req, res, userName) => {
      const userId = req.params.userid;
      const updateObject = {};

      if (req.body.email) {
        const newUserEmail = req.body.email;

        if (newUserEmail !== userName) {
          const existingUser = await User.findOne({ email: newUserEmail });
          if (existingUser) {
            return createResponse(res, 400, { status: "Bu e-postaya sahip bir hesap zaten var." });
          }
        }
        updateObject.email = req.body.email;
      }
      if (req.body.name) {
        updateObject.name = req.body.name;
      }
      if (req.body.password) {
        const user = await User.findById(userId);
        user.setPassword(req.body.password);
        await user.save();
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateObject, { new: true });
      if (!updatedUser) {
        return createResponse(res, 400, { status: "Güncellenecek kullanıcı bulunamadı." });
      }
      createResponse(res, 200, updatedUser);
    });
  } catch (error) {
    createResponse(res, 400, { status: "Kullanıcı güncellenirken bir hata oluştu." });
  }
};

const deleteUser = async (req, res) => {
  try {
    await getUser(req, res, async (req, res, userName) => {
      const deletedUser = await User.findByIdAndDelete(req.params.userid);
      if (!deletedUser) {
        return createResponse(res, 404, { status: "Silinecek kullanıcı bulunamadı." });
      }
      createResponse(res, 200, { status: "Kullanıcı başarıyla silindi." });
    });
  } catch (error) {
    createResponse(res, 400, { status: "Kullanıcı silinirken bir hata oluştu." });
  }
};

const toggleLikeMovie = async (req, res) => {
  try {
    await getUser(req, res, async (req, res, userName) => {
      const user = await User.findOne({ email: req.auth.email });
      const movieId = req.body.movieId;

      if (!user) {
        return createResponse(res, 404, { status: "Kullanıcı bulunamadı." });
      }

      const likeMovieIndex = user.likeMovies.findIndex(likeMovie => likeMovie.likeMovie === movieId);
      if (likeMovieIndex === -1) {
        user.likeMovies.push({ likeMovie: movieId });
      } else {
        user.likeMovies.splice(likeMovieIndex, 1);
      }

      await user.save();
      createResponse(res, 200, user);
    });
  } catch (error) {
    createResponse(res, 400, { status: "Like işlemi sırasında bir hata oluştu." });
  }
};

const toggleFavMovie = async (req, res) => {
  try {
    await getUser(req, res, async (req, res, userName) => {
      const user = await User.findOne({ email: req.auth.email });
      const movieId = req.body.movieId;

      if (!user) {
        return createResponse(res, 404, { status: "Kullanıcı bulunamadı." });
      }

      const favMovieIndex = user.favMovies.findIndex(favMovie => favMovie.favMovie === movieId);
      if (favMovieIndex === -1) {
        user.favMovies.push({ favMovie: movieId });
      } else {
        user.favMovies.splice(favMovieIndex, 1);
      }

      await user.save();
      createResponse(res, 200, user);
    });
  } catch (error) {
    createResponse(res, 400, { status: "Fav işlemi sırasında bir hata oluştu." });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, 'name email');
    createResponse(res, 200, users);
  } catch (error) {
    createResponse(res, 500, { status: "Kullanıcılar listelenirken bir hata oluştu." });
  }
}

const sendVerificationEmail = async (req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;

  try {
    const mailOptions = {
      from: process.env.PROJECT_MAIL,
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return createResponse(res, 500, { status: "Email gönderilemedi." + error });
      }
      createResponse(res, 200, { status: "Doğrulama kodu gönderildi.", info });
    });
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

module.exports = {
  getUser,
  userInf,
  updateUser,
  deleteUser,
  toggleLikeMovie,
  toggleFavMovie,
  getAllUser,
  sendVerificationEmail, // Yeni fonksiyonu ekleyin
};