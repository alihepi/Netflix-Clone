var express = require('express');
router = express.Router();

const ctrlMovies = require('../controllers/MovieController');

const ctrlAuthUser = require('../controllers/Auth');
const ctrlUser = require('../controllers/UserController');

const ctrlAuthAdmin = require('../controllers/AdminAuth');
const ctrlAdmin = require('../controllers/AdminController');

const jwt = require('express-jwt');
const { get } = require('mongoose');
const auth = jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["sha1", "RS256", "HS256"]
});


/*********************** JWT ADMIN ***********************/
router.post("/admin/signup", ctrlAuthAdmin.signUpAdmin);
router.post("/admin/login", ctrlAuthAdmin.loginAdmin);

/*ADMIN CTRL*/
router
    .route('/admin/:adminid')
    .post(auth, ctrlAdmin.updateAdmin)
    .delete(auth, ctrlAdmin.deleteAdmin);

router
    .route('/admin/getAdmin/:adminid')
    .get(auth, ctrlAdmin.adminInf);

router
    .route('/admin/allAdmin')
    .get(auth, ctrlAdmin.getAllAdmins);

router
    .route('/admin/allUser')
    .get(auth, ctrlUser.getAllUser);

/*ADMIN MOVIES*/
router
    .route('/ctrlMovie/addmovie')
    .post(auth, ctrlMovies.addMovie);

router
    .route('/ctrlMovie/movies/:movieid')
    .put(auth, ctrlMovies.updateMovie)
    .delete(auth, ctrlMovies.deleteMovie);

router
    .route('/ctrlMovie/movie-character/:movieid')
    .post(auth, ctrlMovies.addCharacter)
    .delete(auth, ctrlMovies.deleteCharacter);


/*ADMIN EPISODES*/

router
    .route('/ctrlMovie/:movieid/episodes')
    .post(auth, ctrlMovies.addEpisode);

router
    .route('/ctrlMovie/:movieid/episodes/:episodeid')
    .put(auth, ctrlMovies.updateEpisode)
    .delete(auth, ctrlMovies.deleteEpisode);


/*********************** JWT USER ***********************/
router.post("/signup", ctrlAuthUser.signUp);
router.post("/login", ctrlAuthUser.login);

/*USER CTRL*/
router
    .route('/user/:userid')
    .get(auth, ctrlUser.userInf)
    .post(auth, ctrlUser.updateUser)
    .delete(auth, ctrlUser.deleteUser);

router
    .route('/user/:userid/toggle-like-movie')
    .post(auth, ctrlUser.toggleLikeMovie);

router
    .route('/user/:userid/toggle-fav-movie')
    .post(auth, ctrlUser.toggleFavMovie);

router
    .route('/userlist')
    .get(ctrlUser.getAllUser);

/*
router
    .route('/userVerification')
    .post(ctrlUser.sendVerificationEmail);
*/

/*********************** MOVIES ***********************/
router
    .route('/movies')
    .get(ctrlMovies.listAllMovies);

router
    .route('/movies/category/:category')
    .get(ctrlMovies.listMoviesByCategory);

router
    .route('/movies/:movieid')
    .get(ctrlMovies.getMovie);


module.exports = router;