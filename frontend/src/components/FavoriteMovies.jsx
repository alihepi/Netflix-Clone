import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import MovieDataService from '../services/MovieDataService';

import playIcon from '../images/icons/play-icon.png'
import addList from '../images/icons/addList-icon.png'
import addList2 from '../images/icons/addList-icon2.png'
import likeIcon from '../images/icons/like-icon.png'
import likeIcon2 from '../images/icons/like-icon-2.png'
import moreInf from '../images/icons/more-icon.png'

import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import MovieDetailModal from './MovieDetailModal';
import SearchMov from './SearchMov';

const FavoriteMovies = ({ handleLogout }) => {

  const navigate = useNavigate();

  const [movieDetailDisplay, setMovieDetailDisplay] = useState('none');
  const [movieDetail, setMovieDetail] = useState();

  const [searchMov, setSearchMov] = useState('');

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserData(userData.data);
    }
  }, []);

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (userData) {
      const fetchMovies = async () => {
        try {
          if (searchedMovies.length == 0) {
            setIsLoading(true);
          };

          const allMovieData = await MovieDataService.listAllMovies();
          const userInfData = await MovieDataService.getUser(userData.token, userData._id);

          const favoriteMoviesIds = userInfData.data.favMovies;
          const favoriteMovies = [];

          favoriteMoviesIds.forEach(favMovie => {
            const favoriteMovie = allMovieData.data.find(movie => movie._id === favMovie.favMovie);
            if (favoriteMovie) {
              favoriteMovies.push(favoriteMovie);
            }
          });
          setSearchedMovies(favoriteMovies);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      fetchMovies();
    }
  }, [userData]);

  const playMovie = async (movieDet) => {
    async function randChar(str) {
      const arr = (str + "abcghimnostuyzDEFJKLPQRVWX13579").split("");
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr.join("");
    }

    var link = await randChar(movieDet._id);
    if (movieDet.isSeries) {
      navigate(`/watch/${link}`, { state: { movieName: movieDet.name, movieURL: movieDet.videoURL, movieEpisodes: movieDet.episodes } });
    } else {
      navigate(`/watch/${link}`, { state: { movieName: movieDet.name, movieURL: movieDet.videoURL } });
    }
  }

  const addFavMovies = async (movieId) => {
    try {
      await MovieDataService.toggleFavMovie(userData.token, movieId, userData._id);
      const user = await MovieDataService.getUser(userData.token, userData._id);
      setUserData({ ...userData, favMovies: user.data.favMovies });
      localStorage.setItem('userData', JSON.stringify({ data: { ...userData, favMovies: user.data.favMovies } }));
    } catch (error) {
      console.error("Favori film eklerken bir hata oluştu:", error);
    }
  };

  const addLikeMovies = async (movieId) => {
    try {
      await MovieDataService.toggleLikeMovie(userData.token, movieId, userData._id);
      const user = await MovieDataService.getUser(userData.token, userData._id);
      setUserData({ ...userData, likeMovies: user.data.likeMovies });
      localStorage.setItem('userData', JSON.stringify({ data: { ...userData, likeMovies: user.data.likeMovies } }));
    } catch (error) {
      console.error("Beğenilen film eklerken bir hata oluştu:", error);
    }
  };


  const isFavMovie = (movieId) => {
    return userData && userData.favMovies && userData.favMovies.some(fav => fav.favMovie === movieId);
  };

  const isLikeMovie = (movieId) => {
    return userData && userData.likeMovies && userData.likeMovies.some(like => like.likeMovie === movieId);
  };

  const handleMovieDetail = (movieData) => {
    setMovieDetailDisplay('block');
    setMovieDetail(movieData);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='d-flex flex-column align-items-start justify-content-start gap-5 flex-wrap min-vh-100'>
      <Navbar userPage={true} setSearchMov={setSearchMov} handleLogout={handleLogout} />

      {searchMov !== "" ? (
        <SearchMov searchMov={searchMov} mainPage={false}/>
      ) : (
        <div className='d-flex flex-column align-items-start justify-content-start min-vh-100 cate-page'>
          <h2>Favori Filmlerim</h2>

          <div className='mt-5 d-flex float-left align-items-start justify-content-between gap-5 flex-wrap'>
            {searchedMovies.length > 0 ? (
              searchedMovies.map(movieData => (
                <div key={movieData._id} className='search-mov-container d-flex justify-content-center align-items-center'>
                  <div className='single-movie searchMovLine'>
                    <img src={movieData.posterURL} alt='movie-image' />
                    <div className='justify-content-between single-movie-dets'>
                      <div className='d-flex float-left justify-content-between'>
                        <div className='fs-2 d-flex float-left justify-content-center align-items-center gap-2'>
                          <span className='d-flex justify-content-center align-items-center icon-btn-set icon-btn-set1' onClick={() => playMovie(movieData)}><img src={playIcon} className='icon-img-set' alt='icon' /></span>
                          <span className={`d-flex justify-content-center align-items-center icon-btn-set`}  >
                            <img src={`${isFavMovie(movieData._id) ? addList2 : addList}`} className='icon-img-set' alt='icon' onClick={() => addFavMovies(movieData._id)} />
                          </span>
                          <span className={`d-flex justify-content-center align-items-center icon-btn-set`} >
                            <img src={`${isLikeMovie(movieData._id) ? likeIcon2 : likeIcon}`} className='icon-img-set' alt='icon' onClick={() => addLikeMovies(movieData._id)} />
                          </span>
                        </div>
                        <div onClick={() => handleMovieDetail(movieData)} className='d-flex justify-content-center align-items-center icon-btn-set'><img src={moreInf} className='icon-img-set' alt='icon' /></div>
                      </div>
                      <div className='mt-2 inf-text'>{movieData.ageLimit} | {movieData.duration}</div>
                      <div className='inf-text'>
                        {movieData.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='d-flex movies-list justify-content-center align-items-center'><h3>Film Bulunamadı</h3></div>
            )}
          </div>
        </div>
      )}

      <MovieDetailModal
        setMovieDetailDisplay={setMovieDetailDisplay}
        movieDetailDisplay={movieDetailDisplay}
        movieDetail={movieDetail}
        setUD={setUserData}
        uD={userData}
      />
    </div>
  )
}

export default FavoriteMovies
