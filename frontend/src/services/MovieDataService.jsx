import http from "./http-common";

const config = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

class MovieDataService {

    /*********************** JWT ADMIN ***********************/
    signUpAdmin(data) {
        return http.post("/admin/signup", data);
    }
    loginAdmin(data) {
        return http.post("/admin/login", data);
    }

    /*ADMIN CTRL*/
    getAdmin(token, adminid) {
        return http.get(`/admin/getAdmin/${adminid}`, config(token));
    }
    updateAdmin(token, data, adminid) {
        return http.post(`/admin/${adminid}`, data, config(token));
    }
    deleteAdmin(token, adminid) {
        return http.delete(`/admin/${adminid}`, config(token));
    }

    adminList(token) {
        return http.get('/admin/allAdmin', config(token));
    }
    userList(token) {
        return http.get('/admin/allUser', config(token));
    }

    /*ADMIN MOVIES*/
    addMovie(token, data) {
        return http.post("/ctrlMovie/addmovie", data, config(token));
    }

    updateMovie(token, movieid, data) {
        return http.put(`/ctrlMovie/movies/${movieid}`, data, config(token));
    }

    deleteMovie(token, movieid) {
        return http.delete(`/ctrlMovie/movies/${movieid}`, config(token));
    }

    addCharacter(token, movieid, data) {
        return http.post(`/ctrlMovie/movie-character/${movieid}`, data, config(token));
    }

    deleteCharacter(token, movieid, characterName) {
        return http.delete(`/ctrlMovie/movie-character/${movieid}?name=${characterName}`, config(token));
    }
    
    /*ADMIN EPISODES*/
    addEpisode(token, movieid, data) {
        return http.post(`/ctrlMovie/${movieid}/episodes`, data, config(token));
    }

    updateEpisode(token, movieid, episodeid, data) {
        return http.put(`/ctrlMovie/${movieid}/episodes/${episodeid}`, data, config(token));
    }

    deleteEpisode(token, movieid, episodeid) {
        return http.delete(`/ctrlMovie/${movieid}/episodes/${episodeid}`, config(token));
    }

    /*********************** JWT USER ***********************/
    signUp(data) {
        return http.post("/signup", data);
    }

    login(data) {
        return http.post("/login", data);
    }

    getAllUsers() {
        return http.get("/userlist");
    }
    
    /*USER CTRL*/
    getUser(token, userid) {
        return http.get(`/user/${userid}`, config(token));
    }    
    updateUser(token, data, userid) {
        return http.post(`/user/${userid}`, data, config(token));
    }
    deleteUser(token, userid) {
        return http.delete(`/user/${userid}`, config(token));
    }

    toggleLikeMovie(token, movieId, userid) {
        return http.post(`/user/${userid}/toggle-like-movie`, { movieId }, config(token));
    }
    toggleFavMovie(token, movieId, userid) {
        return http.post(`/user/${userid}/toggle-fav-movie`, { movieId }, config(token));
    }    

    /*********************** MOVIES ***********************/
    getMovie(movieId) {
        return http.get(`/movies/${movieId}`);
    }
    listAllMovies() {
        return http.get("/movies");
    }

    listMoviesByCategory(category) {
        return http.get(`/movies/category/${category}`);
    }

}

export default new MovieDataService();