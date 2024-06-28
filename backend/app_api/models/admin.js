var mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var admin = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    token: String
});

admin.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

admin.methods.checkPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
};

admin.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            nickname: this.nickname,
            name: this.name
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

mongoose.model("admin", admin, "admins");
