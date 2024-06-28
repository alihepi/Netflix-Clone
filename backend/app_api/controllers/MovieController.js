const mongoose = require("mongoose");
const Movie = mongoose.model("movie");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

const checkAuth = function (req, res, next) {
    if (req.auth && (req.auth.nickname || req.auth.email)) {
        next();
    } else {
        createResponse(res, 401, { status: "Yetkisiz kullanıcı." });
    }
};

const checkAdmin = function (req, res, next) {
    if (req.auth && (req.auth.nickname)) {
        next();
    } else {
        createResponse(res, 401, { status: "Yetkisiz kullanıcı." });
    }
};

const getMovie = async function (req, res) {
    try {
        const movie = await Movie.findById(req.params.movieid);
        if (!movie) {
            return createResponse(res, 404, { status: "Film bulunamadı." });
        }
        createResponse(res, 200, movie);
    } catch (error) {
        createResponse(res, 500, { status: "Sunucu hatası." });
    }
};

const listAllMovies = async function (req, res) {
    try {
        const movies = await Movie.find({});
        createResponse(res, 200, movies);
    } catch (error) {
        createResponse(res, 500, { status: "Sunucu hatası." });
    }
};

const listMoviesByCategory = async function (req, res) {
    const requestedCategory = req.params.category;

    try {
        const movies = await Movie.find({ category: requestedCategory });

        if (movies.length === 0) {
            return createResponse(res, 404, { status: "Belirtilen kategoriye ait film bulunamadı." });
        }

        createResponse(res, 200, movies);
    } catch (error) {
        createResponse(res, 500, { status: "Sunucu hatası." });
    }
};

const addMovie = async (req, res) => {
    try {
        checkAdmin(req, res, async () => {
            const newMovie = await Movie.create(req.body);
            createResponse(res, 201, newMovie);
        });
    } catch (error) {
        createResponse(res, 400, { status: "Film eklenirken bir hata oluştu." });
    }
};

const updateMovie = async function (req, res) {
    try {
        checkAdmin(req, res, async () => {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieid, req.body, { new: true });
            createResponse(res, 200, updatedMovie);
        });
    } catch (error) {
        console.error("Error adding movie:", error.message);
        createResponse(res, 400, { status: "Film güncellenirken bir hata oluştu." });
    }
};

const addCharacter = async function (req, res) {
    try {
        checkAdmin(req, res, async () => {
            const movie = await Movie.findById(req.params.movieid);
            if (!movie) {
                return createResponse(res, 404, { status: "Film bulunamadı." });
            }

            const newCharacter = req.body;
            movie.characters.push(newCharacter);
            await movie.save();

            createResponse(res, 201, movie);
        });
    } catch (error) {
        createResponse(res, 400, { status: "Karakter eklenirken bir hata oluştu.", error: error.message });
    }
};

const deleteCharacter = async function (req, res) {
    const movieId = req.params.movieid;
    const characterName = req.query.name;

    try {
        checkAdmin(req, res, async () => {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return createResponse(res, 404, { status: "Film bulunamadı." });
            }

            const characterIndex = movie.characters.findIndex(character => character.name === characterName);
            if (characterIndex === -1) {
                return createResponse(res, 404, { status: "Belirtilen isimde karakter bulunamadı." });
            }

            movie.characters.splice(characterIndex, 1);
            await movie.save();

            createResponse(res, 200, movie);
        });
    } catch (error) {
        createResponse(res, 400, { status: "Karakter silinirken bir hata oluştu.", error: error.message });
    }
};

const deleteMovie = async function (req, res) {
    try {
        checkAdmin(req, res, async () => {
            const deletedMovie = await Movie.findByIdAndDelete(req.params.movieid);
            if (!deletedMovie) {
                return createResponse(res, 404, { status: "Silinecek film bulunamadı." });
            }
            createResponse(res, 200, { status: "Film başarıyla silindi." });
        });
    } catch (error) {
        createResponse(res, 400, { status: "Film silinirken bir hata oluştu." });
    }
};

const addEpisode = async function (req, res) {
    try {
        checkAdmin(req, res, async () => {
            const movie = await Movie.findById(req.params.movieid);
            if (!movie) {
                return createResponse(res, 404, { status: "Film bulunamadı." });
            }

            const newEpisode = req.body;
            movie.episodes.push(newEpisode);
            await movie.save();

            createResponse(res, 201, movie);
        });
    } catch (error) {
        createResponse(res, 400, { status: "Episode eklenirken bir hata oluştu.", error: error.message });
    }
};

const updateEpisode = async function (req, res) {
    try {
        checkAdmin(req, res, async () => {
            const movie = await Movie.findById(req.params.movieid);
            if (!movie) {
                return createResponse(res, 404, { status: "Film bulunamadı." });
            }

            const episodeIndex = movie.episodes.findIndex(episode => episode._id.equals(req.params.episodeid));
            if (episodeIndex === -1) {
                return createResponse(res, 404, { status: "Episode bulunamadı." });
            }

            movie.episodes[episodeIndex] = { ...movie.episodes[episodeIndex]._doc, ...req.body };
            await movie.save();

            createResponse(res, 200, movie);
        });
    } catch (error) {
        createResponse(res, 400, { status: "Episode güncellenirken bir hata oluştu.", error: error.message });
    }
};

const deleteEpisode = async function (req, res) {
    try {
        checkAdmin(req, res, async () => {
            const movie = await Movie.findById(req.params.movieid);
            if (!movie) {
                return createResponse(res, 404, { status: "Film bulunamadı." });
            }

            const episodeIndex = movie.episodes.findIndex(episode => episode._id.equals(req.params.episodeid));
            if (episodeIndex === -1) {
                return createResponse(res, 404, { status: "Episode bulunamadı." });
            }

            movie.episodes.splice(episodeIndex, 1);
            await movie.save();

            createResponse(res, 200, movie);
        });
    } catch (error) {
        createResponse(res, 400, { status: "Episode silinirken bir hata oluştu.", error: error.message });
    }
};

module.exports = {
    getMovie,
    listAllMovies,
    addMovie,
    updateMovie,
    addCharacter,
    deleteCharacter,
    deleteMovie,
    listMoviesByCategory,
    addEpisode,
    updateEpisode,
    deleteEpisode,
};
