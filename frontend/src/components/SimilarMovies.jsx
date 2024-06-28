import React, { useEffect, useState } from "react";
import MovieDataService from "../services/MovieDataService";
import { useNavigate } from "react-router-dom";

const SimilarMovies = ({ movieCategory = [], movId = "" }) => {
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await MovieDataService.listMoviesByCategory(
          movieCategory
        );
        const filteredMovies = response.data.filter(
          (movie) => movie._id !== movId
        );
        let limitedListData = [];

        if (filteredMovies.length <= 6) {
          limitedListData = filteredMovies;
        } else {
          limitedListData = [];
          const shuffledMovies = [...filteredMovies].sort(
            () => 0.5 - Math.random()
          );
          limitedListData = shuffledMovies.slice(0, 6);
        }

        setListData(limitedListData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [movieCategory, movId]);

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
  };

  return (
    <div className="d-flex similar-main">
      <div className="d-flex float-left gap-3 flex-wrap similar-movies justify-content-between">
        {loading ? (
          <div className="d-flex movies-list justify-content-center align-items-center">
            <h5>Filmler Yükleniyor</h5>
          </div>
        ) : listData.length > 0 ? (
          listData.map((movieData) => (
            <div
              className="similar-movie"
              key={movieData._id}
              onClick={() => playMovie(movieData)}
            >
              <img src={movieData.posterURL} alt="movie-image" />
              <span className="sm-play-btn">
                <i class="fa-regular fa-circle-play"></i>
              </span>
              <div className="d-flex flex-column gap-3">
                <span className="d-flex justify-content-between">
                  <span>
                    <span className="sm-ageLimit">{movieData.ageLimit}</span>{" "}
                    {movieData.productionYear}
                  </span>
                  <span>Al</span>
                </span>
                <span>{movieData.description}</span>
              </div>
            </div>
          ))
        ) : (
          <div>Film Bulunamadı</div>
        )}
      </div>
    </div>
  );
};

export default SimilarMovies;
