import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import TemplateUser from "./components/TemplateUser";
import Home from "./components/Home";
import MainPage from "./components/MainPage";
import AdminPanel from "./components/admin/AdminPanel";
import NotFound from "./NotFound";
import TemplateSignup from "./components/TemplateSignup";

import AWSupload from "./AWS/AWSupload";
import AddMoviePageOne from "./components/admin/AddMoviePageOne";
import AddMoviePageTwo from "./components/admin/AddMoviePageTwo";
import PlayMovie from "./components/PlayMovie";
import Login from "./components/user/Login";
import AddMovieInf from "./components/admin/AddMovieInf";
import UpdateMovie from "./components/admin/UpdateMovie";
import UpdateMovieList from "./components/admin/UpdateMovieList";
import TemplateAdmin from "./components/TemplateAdmin";
import CategoryMovies from "./components/CategoryMovies";
import FavoriteMovies from "./components/FavoriteMovies";
import AddSeriesEpisode from "./components/admin/AddSeriesEpisode";
import AWSepisodeUpOrDel from "./AWS/AWSepisodeUpOrDel";

import AddUserPageOne from "./components/user/AddUserPageOne";
import AddUserPageTwo from "./components/user/AddUserPageTwo";
import AddUserPageThree from "./components/user/AddUserPageThree";
import AddUserPageFour from "./components/user/AddUserPageFour";
import AddUserPageFive from "./components/user/AddUserPageFive";
import UserSettings from "./components/user/UserSettings";

import './App.css'
import './css/NavAndFoot.css'
import './css/Home.css'
import './css/MainPage.css'
import './css/Modal.css'
import './css/AdminPanel.css'
import './css/AWS.css'
import './css/UpdateMovie.css'
import './css/AdminNavbar.css'
import './css/AddMovie.css'
import './css/PlayMovie.css'
import './css/LoginRegister.css'
import './css/Search.css'
import './css/CharactersModel.css'
import './css/Episode.css'
import './css/EpisodesUporDel.css'
import './css/AdminSet.css'
import './css/Signup.css'
import './css/UserSettings.css'


function App() {
  const [userData, setUserData] = useState({
    data: [],
    isAdmin: false,
    connected: false,
    token: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    setUserData({
      data: [],
      isAdmin: false,
      connected: false,
      token: "",
    });
    localStorage.removeItem("userData");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            (userData.connected === false && userData.isAdmin === false)
              ? <Home />
              : (
                (userData.connected === true && userData.isAdmin === true)
                  ? <Navigate to="/admin" />
                  : <Navigate to="/browse" />
              )
          }
        />

        <Route path="/signup" element={<TemplateSignup />}>
          <Route path="/signup" element={<AddUserPageOne />} />
          <Route path="/signup/regform" element={<AddUserPageTwo />} />
          <Route path="/signup/toapprove" element={<AddUserPageThree />} />
          <Route path="/signup/planform" element={<AddUserPageFour />} />
          <Route path="/signup/paymentPicker" element={<AddUserPageFive />} />
        </Route>

        <Route path="/login"
          element={
            (userData.connected === false && userData.isAdmin === false)
              ? <Login setLogin={(userData) => {
                setUserData(userData);
                localStorage.setItem("userData", JSON.stringify(userData));
              }} />
              : (
                (userData.connected === true && userData.isAdmin === true)
                  ? <Navigate to="/admin" />
                  : <Navigate to="/browse" />
              )
          }
        />

        {userData.connected === true && userData.isAdmin === false && (
          <Route path="/browse" element={<TemplateUser />}>
            <Route path="/browse" element={<MainPage handleLogout={handleLogout}/>} />
            <Route path="/browse/genre/:id" element={<CategoryMovies handleLogout={handleLogout}/>} />
            <Route path="/browse/favorite-movies" element={<FavoriteMovies handleLogout={handleLogout}/>} />
          </Route>
        )}

        {userData.connected === true && userData.isAdmin === false && (
          <Route path="/account" element={<UserSettings handleLogout={handleLogout}/>} />
        )}

        {userData.connected === true && (
          <Route path="/watch/:id" element={<PlayMovie />} />
        )}

        {userData.connected === true && userData.isAdmin === true && (
          <Route path="/admin" element={<TemplateAdmin />}>
            <Route path="/admin" element={<AdminPanel handleLogout={handleLogout} />} />

            <Route path="/admin/add-movie/upload-video" element={<AWSupload />} />
            <Route path="/admin/add-movie/detail" element={<AddMoviePageOne pageTitle="Yeni Film Ekle" />} />
            <Route path="/admin/add-movie/detail/1" element={<AddMoviePageTwo pageTitle="Yeni Film Ekle" />} />
            <Route path="/admin/add-movie/detail/2" element={<AddSeriesEpisode />} />
            <Route path="/admin/add-movie" element={<AddMovieInf />} />

            <Route path="/admin/allmovies" element={<UpdateMovieList />} />
            <Route path="/admin/allmovies/:id/detail" element={<UpdateMovie token={userData.token} />} />
            <Route path="/admin/allmovies/:id/detail/episodes" element={<AWSepisodeUpOrDel/>} />

            <Route path="/admin/user-list" element={<h1>Üye Listesi</h1>} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;