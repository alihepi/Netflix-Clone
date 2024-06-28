import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { useLocation, useNavigate } from 'react-router-dom';

const AddMoviePageOne = () => {

  const location = useLocation();
  const linkData = location.state && location.state.linkData;
  const token = location.state && location.state.token;

  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    posterURL: linkData.posterLink,
    videoURL: linkData.videoLink,

    name: "",
    category: "Aksiyon",
    productionYear: "",
    imdbScore: "",
    duration: "",

    screenwriter: "",
    director: "",
    producer: "",
    language: "",
    ageLimit: "18+",

    isSeries: false,
  });

  const handleInputChange = (e, field) => {
    setMovie({
      ...movie,
      [field]: e.target.value
    });
  };

  const [btnKey, setBtnKey] = useState("danger");

  useEffect(() => {
    if (movie.posterURL != "" && movie.videoURL != "" && movie.name != "" && movie.imdbScore != "" && movie.ageLimit != "" &&
      movie.language != "" && movie.category != "" && movie.director != "" && movie.duration != "" && movie.producer != "" &&
      movie.screenwriter != "" && movie.productionYear != "") {
      setBtnKey("success");
    }
  }, [movie]);

  const toDetTwoPage = () => {
    if (btnKey == "success") {
      if(movie.isSeries){
        navigate('/admin/add-movie/detail/2', { state: { movieData: movie, token: token } });
      } else {
        navigate('/admin/add-movie/detail/1', { state: { movieData: movie, token: token } });
      }
    } else {
      alert("Tüm alanların doldurulması zorunludur!");
    }
  }

  return (
    <div className='d-flex flex-column upload-video-panel movie-det-page'>

      <AdminNavbar pageTitle={"Yeni Film Ekle"} />

      <div className='d-flex gap-5 flex-column align-items-center justify-content-center add-movie-det'>
        <div className='d-flex float-left gap-5 align-items-center justify-content-center'>
          <div className='d-flex flex-column gap-3 align-items-center add-movie-det-div'>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Film İsmi</span>:
              <input type='text' placeholder='Film İsmi'
                className='det-inp input-special'
                value={movie.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </div>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Kategori</span>:
              <select className='det-inp dropdown-special' onChange={(e) => handleInputChange(e, 'category')}>
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

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Yapım Yılı</span>:
              <input type='number' placeholder='19.. - 20..'
                min={1900} max={2024}
                className='det-inp input-special'
                value={movie.productionYear}
                onChange={(e) => handleInputChange(e, 'productionYear')}
              />
            </div>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>IMDB Puanı</span>:
              <input type='number' placeholder='0-10'
                min={0} max={10}
                className='det-inp input-special'
                value={movie.imdbScore}
                onChange={(e) => handleInputChange(e, 'imdbScore')}
              />
            </div>


            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Film Süresi</span>:
              <input type='text' placeholder='Ör: 2sa 15dk'
                className='det-inp input-special'
                value={movie.duration}
                onChange={(e) => handleInputChange(e, 'duration')}
              />
            </div>

          </div>

          <div className='d-flex flex-column gap-3 align-items-center add-movie-det-div'>
            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Senarist</span>:
              <input type='text' placeholder='Ad Soyad'
                className='det-inp input-special'
                value={movie.screenwriter}
                onChange={(e) => handleInputChange(e, 'screenwriter')}
              />
            </div>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Yönetmen</span>:
              <input type='text' placeholder='Ad Soyad'
                className='det-inp input-special'
                value={movie.director}
                onChange={(e) => handleInputChange(e, 'director')}
              />
            </div>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Yapımcı</span>:
              <input type='text' placeholder='Şirket İsmi'
                className='det-inp input-special'
                value={movie.producer}
                onChange={(e) => handleInputChange(e, 'producer')}
              />
            </div>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Yapım Dili</span>:
              <input type='text' placeholder='Ör: İngilizce'
                className='det-inp input-special'
                value={movie.language}
                onChange={(e) => handleInputChange(e, 'language')}
              />
            </div>

            <div className='d-flex gap-3 align-items-center justify-content-center add-movie-details'>
              <span className='adm-pnl-ip-title'>Yaş Sınırlaması</span>:
              <select className='det-inp dropdown-special' onChange={(e) => handleInputChange(e, 'ageLimit')}>
                <option value="18+">18+</option>
                <option value="16+">16+</option>
                <option value="13+">13+</option>
                <option value="Aile">Aile</option>
              </select>
            </div>
          </div>

        </div>



        <div className='d-flex align-items-center gap-5 justify-content-between det-next-btn'>
          <span>
            <input type='checkbox' onChange={(e) => setMovie({ ...movie, isSeries: e.target.checked })} />
            Dizi
          </span>
          <button className={`btn btn-${btnKey}`} onClick={toDetTwoPage}>İlerle</button>
        </div>
      </div>

    </div>
  )
}

export default AddMoviePageOne
