import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieDataServices from '../../services/MovieDataService';

const AddMoviePageTwo = () => {
  const location = useLocation();
  const movieData = location.state && location.state.movieData;
  const token = location.state && location.state.token;
  const episodes = (location.state && location.state.episodes) || [];

  const [movieMainData, setMovieMainData] = useState({
    ...movieData,
    characters: [],
    description: "",
    isSeries: episodes.length > 0 ? true : false,
    episodes: episodes
  });

  const navigate = useNavigate();

  const [charactersValue, setCharactersValue] = useState([]);
  const [characterNameValue, setCharacterNameValue] = useState("");
  const [characterActorValue, setCharacterActorValue] = useState("");

  const [movieDetails, setMovieDetails] = useState("");

  const addCharacter = () => {
    const newCharacter = {
      name: characterNameValue,
      actor: characterActorValue
    };

    setCharactersValue(prevCharacters => [...prevCharacters, newCharacter]);
    setCharacterNameValue("");
    setCharacterActorValue("");

    setMovieMainData(prevData => ({
      ...prevData,
      characters: [...prevData.characters, newCharacter]
    }));
  };

  const [btnKey, setBtnKey] = useState("danger");

  useEffect(() => {
    if (charactersValue.length > 0 && movieDetails !== "") {
      setBtnKey("success");
    }
  }, [charactersValue, movieDetails]);

  const setMovieDetail = (e) => {
    setMovieDetails(e.target.value);
    setMovieMainData({ ...movieMainData, description: e.target.value });
  };

  const toDetTwoPage = () => {
    if (btnKey === "success") {
      MovieDataServices.addMovie(token, movieMainData)
        .then(response => {
          console.log("Film başarıyla eklendi");
          navigate("/admin/add-movie", { state: { movieData: movieMainData } })
        })
        .catch(error => {
          console.error("Film eklenirken bir hata oluştu:", error);
        });
    } else {
      alert("Tüm alanların doldurulması zorunludur!");
    }
  };

  return (
    <div className='d-flex flex-column upload-video-panel movie-det-page'>
      <AdminNavbar pageTitle={"Yeni Film Ekle"} />

      {console.log(episodes)}

      <div className='d-flex gap-1 flex-column align-items-center justify-content-center add-movie-det'>

        <div className='d-flex float-left gap-5 align-items-center justify-content-center mt-4'>

          <div className='d-flex flex-column gap-3 align-items-center add-movie-det-div char-det-div'>
            <div className='d-flex flex-column gap-2 align-items-center justify-content-center add-movie-details'>
              <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
                <span className='adm-pnl-ip-title'>Karakter</span>:
                <input type='text' placeholder='Karakter Adı'
                  className='det-inp input-special'
                  value={characterNameValue}
                  onChange={(e) => setCharacterNameValue(e.target.value)} />
              </div>
              <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
                <span className='adm-pnl-ip-title'>Aktör</span>:
                <input type='text' placeholder='Karakteri Canlandıran Aktör'
                  className='det-inp input-special'
                  value={characterActorValue}
                  onChange={(e) => setCharacterActorValue(e.target.value)} />
              </div>
              <div className='d-flex justify-content-end det-next-btn'>
                <button className={`btn btn-primary`} onClick={addCharacter}>Ekle</button>
              </div>
            </div>
          </div>

          <div className='d-flex flex-column gap-3 align-items-center add-movie-det-div char-det-div'>
            <div className='d-flex gap-3 justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Karakterler</span>:
              <div className='char-det'>
                {charactersValue.map((character, index) => (
                  <div key={index}>
                    "{character.name} - {character.actor}"
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className='d-flex flex-column justify-content-center align-items-center char-det-div-border'>
          <div className='d-flex float-left gap-3 movie-review mt-3'>
            <span className='adm-pnl-ip-title'>Film Özeti:</span>:
            <textarea
              id='movie-review'
              placeholder='Filmin bilgilendirici kısa özeti...'
              rows="7" cols={129}
              value={movieDetails}
              className='textarea-special'
              onChange={setMovieDetail}
            />
          </div>
        </div>

        <div className='d-flex justify-content-end det-next-btn mt-4'>
          <button className={`btn btn-${btnKey}`} onClick={toDetTwoPage}>Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default AddMoviePageTwo;
