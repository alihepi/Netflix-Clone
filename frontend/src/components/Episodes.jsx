import React from "react";
import { useNavigate } from "react-router-dom";

const Episodes = ({ episodesList }) => {
  const navigate = useNavigate();

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
    navigate(`/watch/${link}`, { state: { movieName: movieDet.name, movieURL: movieDet.videoURL, movieEpisodes: episodesList } });
  };

  return (
    <div className="d-flex similar-main">
      <div className="d-flex float-left flex-wrap similar-movies justify-content-between">
        {episodesList.length > 0 ? (
          episodesList.map((movieData, index) => (
            <div
              className="similar-movie similar-movie-episode gap-3 d-flex float-left align-items-center full-w"
              key={movieData._id}
              onClick={() => playMovie(movieData)}
            >
              <span>{index + 2}</span>
              <img src={movieData.posterURL} alt="movie-image" />
              <span className="sm-play-btn">
                <i class="fa-regular fa-circle-play"></i>
              </span>
              <div className="d-flex flex-column gap-2">
                <span>
                  {movieData.name}
                </span>
                {movieData.description}
              </div>
            </div>
          ))
        ) : (
          <div>Bölüm Bulunamadı</div>
        )}
      </div>
    </div>
  );
};

export default Episodes;
