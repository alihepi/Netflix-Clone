const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("user");
const Admin = mongoose.model("admin");

passport.use('user', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({ email: email }).then(user => {
        if (!user || !user.checkPassword(password)) {
            return done(null, false, { message: 'Geçersiz e-posta veya şifre' });
        } else {
            return done(null, user);
        }
    }).catch(err => done(err));
}));

passport.use('admin', new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password'
}, (nickname, password, done) => {
    Admin.findOne({ nickname: nickname }).then(admin => {
        if (!admin || !admin.checkPassword(password)) {
            return done(null, false, { message: 'Kullanıcı adı veya şifre hatalı' });
        } else {
            return done(null, admin);
        }
    }).catch(err => done(err));
}));

module.exports = passport;
