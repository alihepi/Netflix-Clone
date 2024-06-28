import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PlayMovie = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const movieName = location.state && location.state.movieName;
    const movieURI = location.state && location.state.movieURL;
    const movieEpisodes = (location.state && location.state.movieEpisodes) || null;

    const [episodesOrLastEpisode, setEpisodesOrLastEpisode] = useState(false);

    const [playNextEpisode, setPlayNextEpisode] = useState(null);

    const [movName, setMovName] = useState('none');
    const [nextEpisode, setNextEpisode] = useState('none');
    let timer;

    useEffect(() => {
        if (movieEpisodes) {
            setEpisodesOrLastEpisode(true);
            if(movieEpisodes[movieEpisodes.length - 1].videoURL === movieURI) {
                setEpisodesOrLastEpisode(false);
            }
        }
    }, [movieEpisodes]);

    useEffect(() => {
        const handleMouseMove = () => {
            setNextEpisode('block');
            setMovName('block');
            clearTimeout(timer);
            timer = setTimeout(() => {
                setNextEpisode('none');
                setMovName('none');
            }, 2680);
        };

        const handleMouseOut = (event) => {
            if (!event.relatedTarget) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    setNextEpisode('none');
                    setMovName('none');
                }, 200);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseout', handleMouseOut);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (movieEpisodes) {
            const currentIndex = movieEpisodes.findIndex(ep => ep.videoURL === movieURI);
            if (currentIndex !== -1) {
                if (currentIndex < movieEpisodes.length - 1) {
                    setPlayNextEpisode(movieEpisodes[currentIndex + 1]);
                }
            } else {
                setPlayNextEpisode(movieEpisodes[0]);
            }
        }
    }, [movieEpisodes, movieURI]);

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
        navigate(`/watch/${link}`, { state: { movieName: movieDet.name , movieURL: movieDet.videoURL, movieEpisodes: movieEpisodes } });
    }

    return (
        <div className='d-flex watch-movie' onContextMenu={(e) => e.preventDefault()} >
            <span className='play-mov-back-home d-flex align-items-center' 
                onClick={() => navigate('/browse')}>
                <i class="fa-solid fa-arrow-left fs-3" style={{ display: `${movName}`, cursor: 'pointer' }}></i>
            </span>
            <span className='play-movie-name d-flex align-items-center justify-content-center'>
                <h2 style={{ display: `${movName}` }}>{movieName}</h2>
            </span>
            <video src={movieURI} className='play-movie-video' controls autoPlay />
            {episodesOrLastEpisode ? (
                <span className='next-episode' style={{ display: `${nextEpisode}` }} onClick={() => playMovie(playNextEpisode)}>
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
            ) : null}
        </div>
    );
}

export default PlayMovie;
