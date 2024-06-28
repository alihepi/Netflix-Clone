import React, { useState, useRef, useEffect } from 'react';
import Navbar from "./Navbar";
import infImg from "../images/information.png";
import MovieList from './MovieList';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieDataService from '../services/MovieDataService';
import MovieDetailModal from './MovieDetailModal';
import Loader from './Loader';
import SearchMov from './SearchMov';

const MainPage = ({ handleLogout }) => {

  const location = useLocation();

  const navigate = useNavigate();
  const listRef = useRef(null);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [randomMovie, setRandomMovie] = useState(null);

  const [movieDetailDisplay, setMovieDetailDisplay] = useState('none');
  const [movieDetail, setMovieDetail] = useState();

  const [searchMov, setSearchMov] = useState('');

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserData(userData.data);
      }
    }

    const fetchMovies = async () => {
      try {
        const response = await MovieDataService.listAllMovies();
        setLoading(false);

        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomSelectedMovie = response.data[randomIndex];
        setRandomMovie(randomSelectedMovie);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    

    fetchUser();
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await MovieDataService.getUser(userData.token, userData._id);
      localStorage.setItem('userData', JSON.stringify({ data: { ...userData, favMovies: user.data.favMovies, likeMovies: user.data.likeMovies } }));
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserData(userData.data);
      }
    };
    fetchUser();
  }, [userData]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 75;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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

  const handleMovieDetail = (movieData) => {
    setMovieDetailDisplay('block');
    setMovieDetail(movieData);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='main-page-set'>
      <div className={`fixed-top ust ${scrolled ? 'navScroll scrolled' : 'navScroll'}`}>
        <Navbar userPage={true} setSearchMov={setSearchMov} handleLogout={handleLogout} />
      </div>
      {searchMov !== "" ? (
        <SearchMov searchMov={searchMov} />
      ) : (
        <div className='user-page min-vh-100 alt'>
          <div className='user-page-gr d-flex align-items-end justify-content-between min-vh-100'
            style={{ backgroundImage: `url(${randomMovie.posterURL})` }}
          >
            <div className='d-flex flex-column gap-1 col-6'>
              <div className='d-flex flex-column gap-5 tr-main'>
                <div className='text-justify text-shadow1'>
                  {randomMovie.description}
                </div>
                <div className='d-flex float-left gap-3'>
                  <button className='d-flex float-left align-items-center justify-content-center gap-3 mybtn play' onClick={() => playMovie(randomMovie)}><i className="fa-solid fa-play"></i>  Oynat</button>
                  <button className='d-flex float-left align-items-center justify-content-center gap-3 mybtn info' onClick={() => handleMovieDetail(randomMovie)}><img src={infImg} alt='info' />Daha Fazla Bilgi</button>
                </div>
              </div>
              <div className='tr-main-page'></div>
            </div>
          </div>

          <MovieDetailModal
            setMovieDetailDisplay={setMovieDetailDisplay}
            movieDetailDisplay={movieDetailDisplay}
            movieDetail={movieDetail}
            setUD={setUserData}
            uD={userData}
          />

          <div className='d-flex flex-column movies-lists'>
            <MovieList ListName={"Aksiyon Dolu Filmler"} MovieCategory={"Aksiyon"} uD={userData} />
            <MovieList ListName={"Bol Kahkahalı Filmler"} MovieCategory={"Komedi"} uD={userData} />
            <MovieList ListName={"Ailecek İzle!"} MovieCategory={"Animasyon"} uD={userData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage;
