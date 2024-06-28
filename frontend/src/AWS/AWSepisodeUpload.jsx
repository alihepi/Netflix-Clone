import React, { useEffect, useState } from 'react';
import { getSignedUrl, uploadFileToSignedUrl } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';

const AWSepisodeUpload = () => {

    const location = useLocation();
    const movieData = location.state && location.state.movieData;

    const [token, setToken] = useState(null);
    const [episodes, setEpisodes] = useState([{ id: 1, name: '', duration: '', description: '', videoURL: '', posterURL: '' }]);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setToken(userData.token);
        }
    }, []);

    const navigate = useNavigate();
    const [fileLinkImage, setFileLinkImage] = useState('');
    const [fileLinkVideo, setFileLinkVideo] = useState("");
    const [vidKey, setVidKey] = useState("");
    const [btnKey, setBtnKey] = useState('danger');

    const onFileSelect = (e, index, fileType) => {
        const file = e.target.files[0];
        const content_type = file.type;
        let key = "";

        if (fileType === 'image') {
            key = `image/${file.name}`;
        } else {
            key = `video/${file.name}`;
            setVidKey(file.name);
        }

        getSignedUrl({ key, content_type }).then((response) => {
            uploadFileToSignedUrl(response.data.signedUrl, file, content_type, null, () => {
                const newEpisodes = episodes.map((episode, i) => {
                    if (i === index) {
                        if (fileType === 'image') {
                            setFileLinkImage(response.data.fileLink);
                            return { ...episode, posterURL: response.data.fileLink };
                        } else {
                            setFileLinkVideo(response.data.fileLink);
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
        setEpisodes([...episodes, { id: episodes.length + 1, name: '', duration: '', description: '', videoURL: '', posterURL: '' }]);
    };

    const updateEpisode = (index, field, value) => {
        const newEpisodes = episodes.map((episode, i) => {
            if (i === index) {
                return { ...episode, [field]: value };
            }
            return episode;
        });
        setEpisodes(newEpisodes);
    };

    const saveEpisodes = () => {
        const allEpisodesComplete = episodes.every(episode => episode.videoURL !== '');
        if (allEpisodesComplete) {
            navigate('/admin/add-movie/detail/1', {
                state: { movieData: movieData, episodes: episodes, token: token }
            });
        } else {
            alert('İşleme devam etmek için lütfen tüm bölümler için video dosyası seçiniz.');
        }
    };


    useEffect(() => {
        if (episodes.every(episode => episode.videoURL !== '')) {
            setBtnKey('success');
        } else {
            setBtnKey('danger');
        }
    }, [episodes]);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <AdminNavbar pageTitle={"Bölümler"} />

            <span className='add-new-episode'>
                <button className='btn btn-secondary btn-sm' onClick={addEpisode}>Bölüm Ekle</button>
            </span>

            <div className='d-flex gap-4 flex-column align-items-center justify-content-center'>
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
                                    onChange={(e) => updateEpisode(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
                                <span className='adm-pnl-ip-title'>Süre</span>:
                                <input type='text' placeholder='Bölüm Süresi'
                                    className='det-inp input-special'
                                    value={episode.duration}
                                    onChange={(e) => updateEpisode(index, 'duration', e.target.value)}
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
                                    onChange={(e) => updateEpisode(index, 'description', e.target.value)}
                                />
                            </div>
                        </div>

                        <i className="fa-solid fa-trash" onClick={() => setEpisodes(episodes.filter((_, i) => i !== index))}></i>
                    </div>
                ))}

                <div className='d-flex justify-content-end full-w'>
                    <button className={`btn btn-${btnKey}`} onClick={saveEpisodes}>İlerle</button>
                </div>
            </div>
        </div>
    );
};

export default AWSepisodeUpload;
