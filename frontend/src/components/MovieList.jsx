import React, { useState, useRef, useEffect } from 'react';
import lcdp from "../images/lcdpBg.jpg";

import playIcon from '../images/icons/play-icon.png'
import addList from '../images/icons/addList-icon.png'
import addList2 from '../images/icons/addList-icon2.png'
import likeIcon from '../images/icons/like-icon.png'
import likeIcon2 from '../images/icons/like-icon-2.png'
import moreInf from '../images/icons/more-icon.png'

import MovieDetailModal from './MovieDetailModal';
import MovieDataService from '../services/MovieDataService';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ ListName = "", MovieCategory = "", uD=[] }) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserData(userData.data);
        }
    }, [uD]);

    const [scrollPosition, setScrollPosition] = useState(0);
    const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
    const containerRef = useRef(null);

    const [linelist, setLinelist] = useState(0);

    const [hoveredIndex, setHoveredIndex] = useState(-1);
    var hoverTimer = useRef(null);

    const [movieDetailDisplay, setMovieDetailDisplay] = useState('none');
    const [movieDetail, setMovieDetail] = useState();


    const [ListData, setListData] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await MovieDataService.listMoviesByCategory(MovieCategory);
                setListData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [MovieCategory, userData]);

    const handleScroll = (scrollDirection) => {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.scrollWidth;
        const scrollAmount = 1400;

        let newPosition;
        if (scrollDirection === -1) {
            newPosition = Math.max(scrollPosition - scrollAmount, 0);
            if (linelist !== 0 && linelist > 0) {
                setLinelist(linelist - 1);
            }
        } else {
            newPosition = Math.min(scrollPosition + scrollAmount, containerWidth - container.offsetWidth);
            if (linelist < 2) {
                setLinelist(linelist + 1);
            }
        }

        setScrollPosition(newPosition);
        container.scrollTo({ left: newPosition, behavior: 'smooth' });

        setIsLeftButtonVisible(newPosition > 0);
    };

    const handleMouseEnter = (index) => {
        hoverTimer.current = setTimeout(() => {
            setHoveredIndex(index);
        }, 1000);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer.current);
        setHoveredIndex(-1);
    };


    const handleMovieDetail = (movieData) => {
        setMovieDetailDisplay('block');
        setMovieDetail(movieData);
    }


    const [loading, setLoading] = useState(true);

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


    return (
        <div className='movies-lists'>
            <div className='d-flex justify-content-between align-items-center list-name'>
                <h3>{ListName}</h3>

                <div className='d-flex float-left gap-1 listline-set'>
                    <span style={linelist === 0 ? { opacity: '100%' } : { opacity: '50%' }}>⎯</span>
                    <span style={linelist === 1 ? { opacity: '100%' } : { opacity: '50%' }}>⎯</span>
                    <span style={linelist === 2 ? { opacity: '100%' } : { opacity: '50%' }}>⎯</span>
                </div>
            </div>

            <div className='d-flex float-left gap-4 justify-content-center align-items-center movie-list-line'>

                {isLeftButtonVisible && (
                    <button onClick={() => handleScroll(-1)} className="btn-lr btn-l"><i className="fa-solid fa-chevron-left"></i></button>
                )}

                <div ref={containerRef} className='d-flex float-left gap-2 justify-content-between align-items-center' style={{ width: '100%', height: '25rem', overflowX: 'hidden' }}>

                    <div id='list1' className='d-flex float-left gap-2 justify-content-center align-items-center' style={{ flexShrink: 0 }}>
                        <div className='f-space'></div>
                        {loading ? (
                            <div className='d-flex movies-list justify-content-center align-items-center'><h5>Filmler Yükleniyor</h5></div>
                        ) : ListData.length > 0 ? (
                            ListData.map((movieData) => (
                                <div className='single-movie' key={movieData._id}>
                                    <img src={movieData.posterURL} alt="movie-image" />
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
                                        <div className='mt-2 inf-text'>{/*<span className='sp-inf-text'>%97 Eşleşme</span> |*/} {movieData.ageLimit} | {movieData.duration}</div>
                                        <div className='inf-text'>
                                            {movieData.category}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (<div>No movies available</div>)}
                        <div className='f-space'></div>
                    </div>

                </div>

                <button onClick={() => handleScroll(1)} className="btn-lr btn-r"><i className="fa-solid fa-chevron-right"></i></button>

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

export default MovieList;
