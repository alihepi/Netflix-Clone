import React, { useEffect, useState } from 'react'
import { getSignedUrl, uploadFileToSignedUrl } from '../api';
import { useNavigate } from 'react-router-dom';

const AWSuploadUpdate = ( { setVideoAndPosterLink, videoAndPosterLink } ) => {

    const navigate = useNavigate();

    const [fileLinkImage, setFileLinkImage] = useState(videoAndPosterLink.posterURL);
    const [fileLinkVideo, setFileLinkVideo] = useState(videoAndPosterLink.videoURL);
    const [vidKey, setVidKey] = useState("");

    const onFileSelect = (e, fileSelect) => {
        const file = e.target.files[0];

        const content_type = file.type;
        let key = "";
        if (fileSelect === 'image') {
            key = `image/${file.name}`;
        } else {
            key = `video/${file.name}`;
            setVidKey(file.name);
        }

        getSignedUrl({ key, content_type }).then((response) => {
            uploadFileToSignedUrl(
                response.data.signedUrl,
                file,
                content_type,
                null,
                () => {
                    if (fileSelect === 'image') {
                        setFileLinkImage(response.data.fileLink);
                    } else {
                        setFileLinkVideo(response.data.fileLink);
                    }
                }
            );
        });
    };

    const toDetPage = () => {
        if (fileLinkImage != "" && fileLinkVideo != "") {
            navigate('/admin/add-movie/detail', { state: { linkData: { posterLink: fileLinkImage, videoLink: fileLinkVideo } } });
        } else if (fileLinkImage == "" && fileLinkVideo == "") {
            alert("İşleme devam etmemk için lütfen poster ve film dosyasını seçiniz.");
        } else if (fileLinkImage == "") {
            alert("İşleme devam etmemk için lütfen poster seçiniz.");
        } else if (fileLinkVideo == "") {
            if (vidKey != "") {
                alert("Lütfen film dosyasının karşıya yüklenmesini bekleyiniz!")
            } else {
                alert("İşleme devam etmemk için lütfen film dosyası seçiniz.");
            }
        }
    }

    useEffect(() => {
        if (fileLinkImage != videoAndPosterLink.posterURL || fileLinkVideo != videoAndPosterLink.videoURL) {
            setVideoAndPosterLink({ videoURL: fileLinkVideo, posterURL: fileLinkImage })
        }
    },[fileLinkImage, fileLinkVideo]);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center upload-video-panel'>
            <div className='d-flex gap-5 flex-column align-items-center justify-content-center'>
                <div className='d-flex flex-column gap-4 align-items-center justify-content-center'>
                    <div className='d-flex flex-column gap-2'>
                        <img src={fileLinkImage} alt='Kapak Fotoğrafı'
                            className='movie-cover-photo'
                            onContextMenu={(e) => e.preventDefault()} />
                        <input type='file' accept='image/*'
                            onChange={(e) => onFileSelect(e, 'image')} >
                        </input>
                    </div>

                    <div className='d-flex flex-column gap-2'>
                        <video src={fileLinkVideo} className='movie-video'
                            controls onContextMenu={(e) => e.preventDefault()} />
                        <input type='file' accept='video/*'
                            onChange={(e) => onFileSelect(e, 'video')} >
                        </input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AWSuploadUpdate
