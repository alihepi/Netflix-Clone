import React, { useState, useEffect } from 'react';
import MovieDataService from '../../services/MovieDataService';
import { useNavigate } from 'react-router-dom';

const UpdateMovieList = () => {
    const navigate = useNavigate();

    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setToken(userData.token);
        }

        const fetchMovies = async () => {
            try {
                const response = await MovieDataService.listAllMovies();
                setAllMovies(response.data);
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const goToUpdateOrDelete = (movie) => {
        navigate(`/admin/allmovies/${movie._id}/detail`, { state: { movieData: movie, token: token } });
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-start min-vh-100 gap-4 flex-wrap update-film-list'>
            <h2 className='d-flex justify-content-between align-items-center'>Film Listesi <span onClick={() => navigate("/admin")}>Geri</span></h2>
            <div className='d-flex float-left align-items-center justify-content-center gap-4 flex-wrap'>
                {loading ? (
                    <div className='d-flex movies-list justify-content-center align-items-center'><h3>Filmler Yükleniyor</h3></div>
                ) : allMovies.length > 0 ? (
                    allMovies.map(movie => (
                        <div key={movie.id} className='list-all-movie d-flex flex-column gap-1' onClick={() => goToUpdateOrDelete(movie)}>
                            <img src={movie.posterURL} alt={`${movie.title} image`} />
                            <div className='d-flex align-items-center font-bold'>{movie.name}</div>
                        </div>
                    ))
                ) : (
                    <div className='d-flex movies-list justify-content-center align-items-center'><h3>Film Bulunamadı</h3></div>
                )}
            </div>
        </div>
    );
};

export default UpdateMovieList;
