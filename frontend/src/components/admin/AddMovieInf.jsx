import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddMovieInf = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const movieData = location.state && location.state.movieData;
    
    return (
        <div className='d-flex flex-column gap-4 align-items-center justify-content-center upload-video-panel movie-det-page'>
            <div className='d-flex float-left gap-1 align-items-center justify-content-center add-mov-pnl'>
                <div className='d-flex flex-column align-items-center justify-content-center gap-4 add-mov-inf add-mov-inf-left'>
                    <div>
                        <img src={movieData.posterURL} alt='Kapak Fotoğrafı'
                            className='movie-cover-photo'
                            onContextMenu={(e) => e.preventDefault()} />
                    </div>
                    <div>
                        <video src={movieData.videoURL} className='movie-video'
                            controls onContextMenu={(e) => e.preventDefault()} />
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center gap-4 add-mov-inf add-mov-inf-right'>
                    <div className='d-flex float-left align-items-center justify-content-center gap-4 add-mov-inf-det'>
                        <div className='d-flex flex-column align-items-start justify-content-center gap-4'>
                            <div className='d-flex gap-2'><span>Film İsmi</span>: {movieData.name} </div>
                            <div className='d-flex gap-2'><span>Kategory</span>: {movieData.category} </div>
                            <div className='d-flex gap-2'><span>Yapım Yılı</span>: {movieData.productionYear} </div>
                            <div className='d-flex gap-2'><span>IMDB Puanı</span>: {movieData.imdbScore} </div>
                            <div className='d-flex gap-2'><span>Duration</span>: {movieData.duration} </div>
                        </div>
                        <div className='d-flex flex-column align-items-start justify-content-center gap-4'>
                            <div className='d-flex gap-2'><span>Senarist</span>: {movieData.screenwriter} </div>
                            <div className='d-flex gap-2'><span>Yönetmen</span>: {movieData.director} </div>
                            <div className='d-flex gap-2'><span>Yapımcı</span>: {movieData.producer} </div>
                            <div className='d-flex gap-2'><span>Dil</span>: {movieData.language} </div>
                            <div className='d-flex gap-2'><span>Yaş Sınırlaması</span>: {movieData.ageLimit} </div>
                        </div>
                    </div>
                    <div className='add-mov-inf-characters'>
                        <div className='d-flex gap-2'><span className='font-bold'>Karakterler</span>:
                            <span className='d-flex float-left gap-3'>
                                {movieData.characters.map((character, index) => {
                                    return (<span key={index}>{character.name} - {character.actor}</span>);
                                })}
                            </span>
                        </div>
                    </div>
                    <div className='add-mov-inf-desc'>
                        <div className='d-flex gap-2'><span className='font-bold'>Özet</span>: <span className='text-justify'>{movieData.description}</span> </div>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-end add-mov-det-btn mt-4'>
                <button className={`btn btn-primary`} onClick={() => navigate("/admin")}>Admin Panel'e Dön</button>
            </div>
        </div>
    )
}

export default AddMovieInf
