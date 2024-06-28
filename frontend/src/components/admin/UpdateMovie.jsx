import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AWSuploadUpdate from "../../AWS/AWSuploadUpdate";

import MovieDataService from "../../services/MovieDataService";

import AddCharacterModal from "./AddCharacterModal";

const UpdateMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [movieData, setMovieData] = useState(location.state && location.state.movieData);

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setToken(userData.token);
    }
  }, []);

  const [videoAndPosterLink, setVideoAndPosterLink] = useState({
    videoURL: movieData.videoURL,
    posterURL: movieData.posterURL,
  });
  const [updatedMovieData, setUpdatedMovieData] = useState(movieData);

  const [addCharacterModal, setAddCharacterModal] = useState("none");

  const [saveBtn, setSaveBtn] = useState("danger");

  const handleInputChange = (e, field) => {
    setUpdatedMovieData({ ...updatedMovieData, [field]: e.target.value });
    setSaveBtn("success");
  };

  useEffect(() => {
    // Bu useEffect, movieData._id değiştiğinde veya sayfa ilk yüklendiğinde çalışacak
    const fetchMovieData = async () => {
      try {
        const response = await MovieDataService.getMovie(movieData._id);
        setMovieData(response.data);
        setUpdatedMovieData(response.data);
      } catch (error) {
        console.error(
          "Film verileri alınırken bir hata oluştu:",
          error.message
        );
      }
    };

    if (movieData._id) {
      fetchMovieData();
    }
  }, [movieData._id]);

  useEffect(() => {
    setUpdatedMovieData({
      ...updatedMovieData,
      videoURL: videoAndPosterLink.videoURL,
      posterURL: videoAndPosterLink.posterURL,
    });
  }, [videoAndPosterLink]);

  useEffect(() => {
    if (
      updatedMovieData.videoURL !== movieData.videoURL ||
      updatedMovieData.posterURL !== movieData.posterURL
    ) {
      setSaveBtn("success");
    }
  }, [updatedMovieData]);

  const deleteMovie = async () => {
    const confirmDelete = window.confirm(
      "Filmi Silmek istediğinize emin misiniz?"
    );
    if (confirmDelete) {
      const movieId = movieData._id;
      await MovieDataService.deleteMovie(token, movieId);
      navigate("/admin/allmovies");
    }
  };

  const openModal = () => {
    setAddCharacterModal("block");
  };

  const addCharacter = async (data) => {
    try {
      var newCharacter = {
        name: data.name,
        actor: data.actor,
      };

      await MovieDataService.addCharacter(token, movieData._id, newCharacter);
      await MovieDataService.getMovie(movieData._id).then((response) => {
        setUpdatedMovieData(response.data);
      });
    } catch (error) {
      console.error("Karakter eklenirken hata oluştu:", error.message);
    }
  };

  const deleteCharacter = async (characterName) => {
    if (updatedMovieData.characters.length === 1) {
      const confirmKeepCharacter = window.confirm(
        "Sadece bir karakter kaldı. Bu karakteri silmek istiyor musunuz? Eğer silmek istemiyorsanız, önce yeni bir karakter ekleyin."
      );
      if (!confirmKeepCharacter) {
        return;
      }
    } else {
      const confirmDelete = window.confirm(
        `Karakteri silmek istediğinize emin misiniz: ${characterName}?`
      );
      if (confirmDelete) {
        try {
          await MovieDataService.deleteCharacter(
            token,
            movieData._id,
            characterName
          );
          await MovieDataService.getMovie(movieData._id).then((response) => {
            setUpdatedMovieData(response.data);
          });
        } catch (error) {
          console.error("Karakter silinirken hata oluştu:", error.message);
        }
      }
    }
  };

  const updateMovie = async () => {
    if (saveBtn == "success") {
      await MovieDataService.updateMovie(
        token,
        movieData._id,
        updatedMovieData
      );
      setSaveBtn("danger");
      await MovieDataService.getMovie(movieData._id).then((response) => {
        setUpdatedMovieData(response.data);
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center upload-video-panel movie-update-page">
      <AddCharacterModal
        addCharacterModal={addCharacterModal}
        setAddCharacterModal={setAddCharacterModal}
        addCharacter={addCharacter}
      />

      <div className="d-flex float-left gap-1 align-items-center justify-content-center ">
        <AWSuploadUpdate
          setVideoAndPosterLink={setVideoAndPosterLink}
          videoAndPosterLink={videoAndPosterLink}
        />

        <div className="d-flex flex-column align-items-center justify-content-center gap-5 add-mov-inf upp-mov-inf-right">
          <div className="d-flex float-left align-items-center justify-content-center gap-4 upp-mov-inf-det">
            <div className="d-flex flex-column align-items-start justify-content-center gap-4 update-detail">
              <div className="d-flex gap-2">
                <span>Film İsmi</span>:{" "}
                <input
                  value={updatedMovieData.name}
                  type="text"
                  onChange={(e) => handleInputChange(e, "name")}
                ></input>
              </div>
              <div className="d-flex gap-2">
                <span>Kategory</span>:
                <select
                  className="det-inp dropdown-special"
                  onChange={(e) => handleInputChange(e, "category")}
                  value={updatedMovieData.category}
                >
                  <option value="Aksiyon">Aksiyon</option>
                  <option value="Animasyon">Animasyon</option>
                  <option value="Komedi">Komedi</option>
                  <option value="Romantizm">Romantizm</option>
                  <option value="Korku">Korku</option>
                  <option value="Bilim Kurgu">Bilim Kurgu</option>
                  <option value="Belgesel">Belgesel</option>
                  <option value="Çoçuk">Çoçuk</option>
                  <option value="Gerilim">Gerilim</option>
                </select>
              </div>
              <div className="d-flex gap-2">
                <span>Yapım Yılı</span>:{" "}
                <input
                  value={updatedMovieData.productionYear}
                  type="number"
                  min={1900}
                  max={2024}
                  onChange={(e) => handleInputChange(e, "productionYear")}
                ></input>
              </div>
              <div className="d-flex gap-2">
                <span>IMDB Puanı</span>:{" "}
                <input
                  value={updatedMovieData.imdbScore}
                  type="number"
                  min={0}
                  max={10}
                  onChange={(e) => handleInputChange(e, "imdbScore")}
                ></input>{" "}
              </div>
              <div className="d-flex gap-2">
                <span>Duration</span>:{" "}
                <input
                  value={updatedMovieData.duration}
                  type="text"
                  onChange={(e) => handleInputChange(e, "duration")}
                ></input>{" "}
              </div>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center gap-4 update-detail">
              <div className="d-flex gap-2">
                <span>Senarist</span>:{" "}
                <input
                  value={updatedMovieData.screenwriter}
                  type="text"
                  onChange={(e) => handleInputChange(e, "screenwriter")}
                ></input>{" "}
              </div>
              <div className="d-flex gap-2">
                <span>Yönetmen</span>:{" "}
                <input
                  value={updatedMovieData.director}
                  type="text"
                  onChange={(e) => handleInputChange(e, "director")}
                ></input>{" "}
              </div>
              <div className="d-flex gap-2">
                <span>Yapımcı</span>:{" "}
                <input
                  value={updatedMovieData.producer}
                  type="text"
                  onChange={(e) => handleInputChange(e, "producer")}
                ></input>{" "}
              </div>
              <div className="d-flex gap-2">
                <span>Dil</span>:{" "}
                <input
                  value={updatedMovieData.language}
                  type="text"
                  onChange={(e) => handleInputChange(e, "language")}
                ></input>{" "}
              </div>
              <div className="d-flex gap-2">
                <span>Yaş Sınırlaması</span>:
                <select
                  className="det-inp dropdown-special"
                  onChange={(e) => handleInputChange(e, "ageLimit")}
                  value={updatedMovieData.ageLimit}
                >
                  <option value="18+">18+</option>
                  <option value="16+">16+</option>
                  <option value="13+">13+</option>
                  <option value="Aile">Aile</option>
                </select>
              </div>
            </div>
          </div>
          <div className="add-mov-inf-characters">
            <div className="d-flex gap-2">
              <span className="font-bold">
                Karakterler{" "}
                <i
                  className="fa-solid fa-circle-plus"
                  onClick={() => openModal()}
                ></i>
              </span>
              :
              <span className="d-flex float-left gap-2 flex-wrap">
                {updatedMovieData.characters.map((character, index) => (
                  <span key={index} className="upp-character">
                    {character.name} - {character.actor}{" "}
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteCharacter(character.name)}
                    ></i>{" "}
                    {index >= 0 && <span>,</span>}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className="add-mov-inf-desc">
            <div className="d-flex gap-2">
              <span className="font-bold">Özet</span>:
              <span className="text-justify">
                <textarea
                  value={updatedMovieData.description}
                  cols={96}
                  rows={4}
                  onChange={(e) => handleInputChange(e, "description")}
                ></textarea>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end add-mov-det-btn gap-3">
        {movieData.isSeries ? (
          <>
            <button
              className={`btn btn-info btn-sm`}
              onClick={() =>
                navigate(`/admin/allmovies/${movieData._id}/detail/episodes`, {
                  state: { movieData: movieData },
                })
              }
            >
              Bölümler
            </button>
          </>
        ) : null}
        <button
          className={`btn btn-secondary`}
          onClick={() => navigate("/admin/allmovies")}
        >
          Geri
        </button>
        <button className={`btn btn-danger`} onClick={deleteMovie}>
          Sil
        </button>
        <button className={`btn btn-${saveBtn}`} onClick={() => updateMovie()}>
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default UpdateMovie;
