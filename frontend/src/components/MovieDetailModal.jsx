import React, { useEffect, useState } from 'react';

import playIcon from '../images/icons/play-icon.png'

import addList from '../images/icons/addList-icon.png'
import addList2 from '../images/icons/addList-icon2.png'
import likeIcon from '../images/icons/like-icon.png'
import likeIcon2 from '../images/icons/like-icon-2.png'
import moreInf from '../images/icons/more-icon.png'

import close from '../images/icons/close-icon.png';

import ligr from '../images/tr-li-gr.png';
import { useNavigate } from 'react-router-dom';
import SimilarMovies from './SimilarMovies';
import MovieDataService from '../services/MovieDataService';
import Episodes from './Episodes';

const MovieDetailModal = ({ movieDetailDisplay, setMovieDetailDisplay, movieDetail, setUD = () => { }, uD = [] }) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserData(userData.data);
        }
    }, [uD]);

    useEffect(() => {
        const closeModalOnOutsideClick = (event) => {
            const modal = document.getElementById('myModal');
            if (event.target === modal) {
                setMovieDetailDisplay('none');
            }
        };

        document.addEventListener('mousedown', closeModalOnOutsideClick);

        return () => {
            document.removeEventListener('mousedown', closeModalOnOutsideClick);
        };
    }, [setMovieDetailDisplay]);

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
            setUD({ ...userData, favMovies: user.data.favMovies });
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
            setUD({ ...userData, likeMovies: user.data.likeMovies });
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
        <div id="myModal" className="modal" style={{ display: `${movieDetailDisplay}` }}>
            {movieDetail && (
                <div className="modal-content d-flex gap-2" style={{ padding: '0' }}>
                    <span onClick={() => setMovieDetailDisplay('none')} className="close">
                        <span className='' style={{ cursor: 'pointer' }}><img src={close} className='icon-img-set' alt='icon' /></span>
                    </span>

                    <div>
                        <img src={movieDetail.posterURL} alt='movie-image' className='modal-movie-image' />
                    </div>

                    <div className='d-flex float-left gap-2 det-buttons' style={{ padding: '0 2rem' }}>
                        <span className='d-flex justify-content-center align-items-center icon-btn-set-play gap-2 '
                            style={{ cursor: 'pointer' }} onClick={() => playMovie(movieDetail)}><i className="fa-solid fa-play fs-4"></i>  Oynat</span>
                        <span className={`d-flex justify-content-center align-items-center icon-btn-set`}  >
                            <img src={`${isFavMovie(movieDetail._id) ? addList2 : addList}`} className='icon-img-set' alt='icon' onClick={() => addFavMovies(movieDetail._id)} />
                        </span>
                        <span className={`d-flex justify-content-center align-items-center icon-btn-set`} >
                            <img src={`${isLikeMovie(movieDetail._id) ? likeIcon2 : likeIcon}`} className='icon-img-set' alt='icon' onClick={() => addLikeMovies(movieDetail._id)} />
                        </span>
                    </div>

                    <div className='img-li-gr'>
                        <span className='d-flex justify-content-center align-items-center ' style={{ cursor: '' }}><img src={ligr} className='' alt='-' /></span>
                    </div>

                    <div className='d-flex float-left gap-1 justify-content-between' style={{ fontSize: '0.90rem', padding: '2rem' }}>
                        <div className='modal-movie-detail'>
                            <div className=''>{/* <span className='sp-inf-text'>%97 Eşleşme</span>&nbsp; | &nbsp; */}
                                {movieDetail.productionYear}&nbsp; | &nbsp;{movieDetail.duration}</div>
                            <div className=''> {movieDetail.ageLimit}&nbsp; | &nbsp;{movieDetail.category}</div>

                            <div className='mt-4'>
                                {movieDetail.description}
                            </div>
                        </div>
                        <div className='d-flex flex-column mini-inf gap-2 modal-actor-inf'>
                            <div>Oyuncu kadrosu: &nbsp;
                                {movieDetail.characters.map((character, index) => (
                                    <span className='opacity-50' key={index}>
                                        {character.actor}
                                        {index !== movieDetail.characters.length - 1 && ' , '}
                                    </span>
                                ))}
                            </div>
                            <div>Türler: &nbsp;
                                <span className='opacity-50'>
                                    {movieDetail.category}
                                </span>
                            </div>
                            <div>Bu film: <span className='opacity-50'>Şiddet içerikli</span></div>
                        </div>
                    </div>



                    {movieDetail.isSeries ? (
                        <div style={{ padding: '0 2rem' }}>
                            <h4 className='mt-4'>Bölümler</h4>

                            <Episodes episodesList={movieDetail.episodes} />
                        </div>
                    ) : null}

                    <div style={{ padding: '0 2rem' }}>
                        <h4 className='mt-4'>Benzerleri</h4>

                        <SimilarMovies movieCategory={movieDetail.category} movId={movieDetail._id} />
                    </div>

                    <div className='d-flex flex-column mt-5 modal-movie-inf' style={{ fontSize: '0.90rem', padding: '0 2rem', marginBottom: '2rem' }}>
                        <h4><strong>{movieDetail.name}</strong>&nbsp;Hakkında</h4>
                        <div><span>Yöntemen: </span> {movieDetail.director}</div>
                        <div>
                            <span>Oyuncu Kadrosu: </span>
                            {movieDetail.characters.map((character, index) => (
                                <span key={index} style={{color: "white"}}>
                                    {character.actor}
                                    {index !== movieDetail.characters.length - 1 && ' , '}
                                </span>
                            ))}
                        </div>
                        <div><span>Senarist: </span>
                            {movieDetail.screenwriter}
                        </div>
                        <div><span>Türler: </span> {movieDetail.category}</div>
                        {/*<div><span>Bu film: </span> Şiddet içerikli</div>
                        <div><span>Yetişkinlik Düzeyi: </span> 18+ | şiddet, argo, cinsel şiddet    18 yaş ve üzerindeki izleyiciler için uygun</div>*/}
                    </div>

                </div>
            )}
        </div>
    );
}

export default MovieDetailModal;
