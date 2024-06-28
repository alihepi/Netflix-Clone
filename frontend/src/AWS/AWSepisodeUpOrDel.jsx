import React, { useEffect, useState } from 'react';
import { getSignedUrl, uploadFileToSignedUrl } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';
import MovieDataService from '../services/MovieDataService';

const AWSepisodeUpOrDel = () => {
    const location = useLocation();
    const movieData = location.state && location.state.movieData;
    const [token, setToken] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [originalEpisodes, setOriginalEpisodes] = useState([]);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setToken(userData.token);
        }
    }, []);

    useEffect(() => {
        if (movieData && movieData.episodes) {
            setEpisodes(movieData.episodes);
            setOriginalEpisodes(movieData.episodes);
        }
    }, [movieData]);

    const navigate = useNavigate();

    const [btnCtrl, setBtnCtrl] = useState(false);
    const [addBtnKey, setAddBtnKey] = useState('danger');
    const [upBtnKey, setUpBtnCtrl] = useState(true);
    const [btnKey, setBtnKey] = useState('danger');

    useEffect(() => {
        if (episodes.length > 0) {
            const newEpisode = episodes[episodes.length - 1];
            const allFieldsFilled = (newEpisode.name && newEpisode.duration && newEpisode.description && newEpisode.videoURL && newEpisode.posterURL) && btnCtrl;
        
            setAddBtnKey(allFieldsFilled ? 'success' : 'danger');
        }
    }, [episodes]);

    useEffect(() => {
        const episodesChanged = (episodes.some((episode, index) => {
            const originalEpisode = originalEpisodes[index];
            return JSON.stringify(episode) !== JSON.stringify(originalEpisode);
        }) && upBtnKey);

        setBtnKey(episodesChanged ? 'success' : 'danger');
    }, [episodes, originalEpisodes]);

    const onFileSelect = (e, index, fileType) => {
        const file = e.target.files[0];
        const content_type = file.type;
        let key = '';

        if (fileType === 'image') {
            key = `image/${file.name}`;
        } else {
            key = `video/${file.name}`;
        }

        getSignedUrl({ key, content_type }).then((response) => {
            uploadFileToSignedUrl(response.data.signedUrl, file, content_type, null, () => {
                const newEpisodes = episodes.map((episode, i) => {
                    if (i === index) {
                        if (fileType === 'image') {
                            return { ...episode, posterURL: response.data.fileLink };
                        } else {
                            return { ...episode, videoURL: response.data.fileLink };
                        }
                    }
                    return episode;
                });
                setEpisodes(newEpisodes);
            });
        });
    };

    const addEpisode = () => {
        const newEpisode = { name: '', duration: '', description: '', videoURL: '', posterURL: '' };
        setEpisodes([...episodes, newEpisode]);
        setBtnCtrl(true);
        setUpBtnCtrl(false);
    };

    const saveNewEpisode = () => {
        const newEpisode = episodes[episodes.length - 1];

        if (newEpisode.name && newEpisode.duration && newEpisode.description && newEpisode.videoURL && newEpisode.posterURL && btnCtrl) {
            MovieDataService.addEpisode(token, movieData._id, newEpisode)
                .then(response => {
                    setEpisodes(response.data.episodes);
                    setAddBtnKey('danger');
                    alert('Yeni bölüm başarıyla eklendi.');
                    navigate(`/admin/allmovies/${movieData._id}/detail`, { state: { movieData: movieData } } );
                })
                .catch(error => console.error("Error adding episode:", error));
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    };

    const updateEpisodeField = (index, field, value) => {
        const updatedEpisodes = episodes.map((episode, i) => {
            if (i === index) {
                return { ...episode, [field]: value };
            }
            return episode;
        });
        setEpisodes(updatedEpisodes);
    };

    const updateAllEpisodes = () => {
        const allEpisodesComplete = episodes.every(episode => episode.videoURL !== '' && episode.posterURL !== '');
        if (allEpisodesComplete && upBtnKey) {
            const promises = episodes.map(episode =>
                MovieDataService.updateEpisode(token, movieData._id, episode._id, episode)
            );
            Promise.all(promises)
                .then(() => {
                    alert('Bölümler başarıyla güncellendi.');
                    navigate(`/admin/allmovies/${movieData._id}/detail`, { state: { movieData: movieData } });
                })
                .catch(error => console.error("Error updating episodes:", error));
        } else {
            alert('İşleme devam etmek için lütfen tüm bölümler için video dosyası seçiniz.');
        }
    };

    const deleteEpisode = (index) => {
        const confirmDelete = window.confirm("Bu bölümü silmek istediğinizden emin misiniz?");
        
        if(movieData.episodes.length >= episodes.length){
            if (confirmDelete) {
                const episodeId = episodes[index]._id;
                MovieDataService.deleteEpisode(token, movieData._id, episodeId)
                    .then((response) => {
                        setEpisodes(response.data.episodes);
                        navigate(`/admin/allmovies/${movieData._id}/detail`, { state: { movieData: movieData } });
                    })
                    .catch(error => console.error("Error deleting episode:", error));
            }
        } else if(movieData.episodes.length < episodes.length){
            setBtnCtrl(false);
            setEpisodes(episodes.filter((_, i) => i !== index));
        }
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <AdminNavbar pageTitle={"Bölümler"} />

            <span className='add-new-episode'>
                <button className='btn btn-secondary btn-sm' onClick={addEpisode}>Bölüm Ekle</button>
            </span>

            <div className='d-flex gap-4 flex-column align-items-center justify-content-center update-or-delete-episode'>
                {episodes.map((episode, index) => (
                    <div key={index} id='episode-inf' className='episode-inf d-flex gap-1 align-items-center justify-content-center'>
                        <div className='d-flex flex-column gap-3'>
                            <img src={episode.posterURL} alt='Kapak Fotoğrafı'
                                className='episode-photo-set'
                                onContextMenu={(e) => e.preventDefault()} />
                            <input type='file' accept='image/*'
                                onChange={(e) => onFileSelect(e, index, 'image')} >
                            </input>
                        </div>

                        <div className='d-flex flex-column gap-3'>
                            <video src={episode.videoURL} className='episode-video-set'
                                controls onContextMenu={(e) => e.preventDefault()} />
                            <input type='file' accept='video/*'
                                onChange={(e) => onFileSelect(e, index, 'video')} />
                        </div>

                        <div className='d-flex flex-column gap-3 align-items-center justify-content-start episode-inf-set'>
                            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
                                <span className='adm-pnl-ip-title'>Bölüm İsmi</span>:
                                <input type='text' placeholder='Bölüm ismi?'
                                    className='det-inp input-special'
                                    value={episode.name}
                                    onChange={(e) => updateEpisodeField(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
                                <span className='adm-pnl-ip-title'>Süre</span>:
                                <input type='text' placeholder='Bölüm Süresi'
                                    className='det-inp input-special'
                                    value={episode.duration}
                                    onChange={(e) => updateEpisodeField(index, 'duration', e.target.value)}
                                />
                            </div>
                            <div className='d-flex gap-3 justify-content-center add-movie-details'>
                                <span className='adm-pnl-ip-title'>Özet</span>:
                                <textarea
                                    id='movie-review'
                                    placeholder='Bölüm hakkında...'
                                    rows='3'
                                    cols={50}
                                    className='textarea-special'
                                    value={episode.description}
                                    onChange={(e) => updateEpisodeField(index, 'description', e.target.value)}
                                />
                            </div>
                        </div>

                        <i className="fa-solid fa-trash" onClick={() => deleteEpisode(index)}></i>
                    </div>
                ))}

                <div className='d-flex justify-content-end full-w gap-3'>
                    <button className={`btn btn-secondary`} onClick={() => navigate(`/admin/allmovies/${movieData._id}/detail`, { state: { movieData: movieData } } )} >Geri</button>
                    <button className={`btn btn-${addBtnKey}`} onClick={saveNewEpisode}>Yeni Bölümü Kaydet</button>
                    <button className={`btn btn-${btnKey}`} onClick={updateAllEpisodes}>Güncellemleri Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AWSepisodeUpOrDel;