import React from 'react'
import AWSepisodeUpload from '../../AWS/AWSepisodeUpload'
import AdminNavbar from './AdminNavbar'

const AddSeriesEpisode = () => {
    return (
        <div className='d-flex flex-column upload-video-panel movie-det-page'>
            

            <div className='mt-5 d-flex gap-5 flex-column align-items-center justify-content-center add-movie-det'>
                
                <AWSepisodeUpload />

            </div>
        </div>
    )
}

export default AddSeriesEpisode
