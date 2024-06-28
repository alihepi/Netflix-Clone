import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import playIcon from '../images/icons/play-icon.png'
import addList from '../images/icons/addList-icon.png'
import addList2 from '../images/icons/addList-icon2.png'
import likeIcon from '../images/icons/like-icon.png'
import likeIcon2 from '../images/icons/like-icon-2.png'
import moreInf from '../images/icons/more-icon.png'

import MovieDetailModal from './MovieDetailModal';
import MovieDataService from '../services/MovieDataService';

const SearchMov = ({ searchMov="" , mainPage=true }) => {

    const navigate = useNavigate();

    const [allMovies, setAllMovies] = useState([]);
    const [previousSelections, setPreviousSelections] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searchMovNameTF, setSearchMovNameTF] = useState("");

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserData(userData.data);
        }

        const fetchMovies = async () => {
            try {
                const response = await MovieDataService.listAllMovies();
                setAllMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const searchMovie = async () => {
            if (searchMov !== "") {
                const filteredMovies = allMovies.filter(movie =>
                    movie.name.toLowerCase().includes(searchMov.toLowerCase())
                );
                if (filteredMovies.length > 0) {
                    setSearchedMovies(filteredMovies);
                    setSearchMovNameTF(searchMov);
                } else {
                    setSearchMovNameTF(searchMov + " bulunamadı, bunları izlediniz mi!");
                    if (allMovies.length <= 8) {
                        setSearchedMovies(allMovies);
                    } else {
                        const randomMovies = [];
                        const numRandomMovies = 8;
                        const totalMovies = allMovies.length;

                        const selectedMovieIds = previousSelections.map(movie => movie.id);

                        for (let i = 0; i < numRandomMovies; i++) {
                            let randomIndex;
                            let randomMovie;
                            do {
                                randomIndex = Math.floor(Math.random() * totalMovies);
                                randomMovie = allMovies[randomIndex];
                            } while (selectedMovieIds.includes(randomMovie.id));

                            randomMovies.push(randomMovie);
                            selectedMovieIds.push(randomMovie.id);
                        }
                        setSearchedMovies(randomMovies);
                        setPreviousSelections(randomMovies);
                    }
                }
            } else {
                setSearchedMovies([]);
            }
        };

        searchMovie();
    }, [searchMov, allMovies, previousSelections]);


    const [movieDetailDisplay, setMovieDetailDisplay] = useState('none');
    const [movieDetail, setMovieDetail] = useState();

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

    return (
        <div className={`d-flex flex-column align-items-start justify-content-start gap-5 flex-wrap ${mainPage===true ? "search-container" : "search-container-cat"}`}>
            <h4 style={{ color: '#818f8e' }}>{searchMovNameTF}</h4>
            <div className='d-flex float-left align-items-start justify-content-between gap-5 flex-wrap'>
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

export default SearchMov
