import React, { useState } from 'react'

const AddOrUpdateMovie = ({ pageTitle = "" }) => {

    const [movieName, setMovieName] = useState();
    const [genreValue, setGenreValue] = useState();
    const [directorValue, setDirectorValue] = useState();
    const [writerValue, setWriterValue] = useState();
    const [charactersValue, setCharactersValue] = useState([]);
    const [characterNameValue, setCharacterNameValue] = useState();
    const [characterActorValue, setCharacterActorValue] = useState();
    const [yearOfCons, setYearOfCons] = useState();
    const [ageLimitValue, setAgeLimitValue] = useState();
    const [IMDBvalue, setIMDBvalue] = useState();
    const [releaseDateValue, setReleaseDateValue] = useState();
    const [durationValue, setDurationValue] = useState();
    const [productionComp, setProductionComp] = useState();
    const [languageValue, setLanguageValue] = useState();
    const [productionCountry, setProductionCountry] = useState();
    const [movieReview, setMovieReview] = useState();

    const [] = useState();
    const [] = useState();


    const addCharacter = () => {
        setCharactersValue([
            ...charactersValue,
            {
                name: characterNameValue,
                actor: characterActorValue
            }
        ]);
        setCharacterNameValue("");
        setCharacterActorValue("");
    };

    const AddCharacter = () => {
        setCharactersValue(
            {
                name: characterNameValue,
                actor: characterActorValue
            }
        )
    }

    return (
        <div className='admin-panel-main d-flex justify-content-center align-items-center flex-column gap-5'>

            <h2 className='d-flex align-items-center justify-content-center '>{pageTitle}</h2>

            <div className='admin-inputs d-flex justify-content-center align-items-center float-left gap-5'>

                <div className='d-flex flex-column justify-content-center align-items-center gap-4 lr-panel lr-panel-b'>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Film/Dizi İsmi</span>:
                        <input
                            type='text'
                            placeholder='Lütfen film ismi giriniz'
                            value={movieName}
                            onChange={(e) => setMovieName(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Kategori</span>:
                        <input
                            type='text'
                            placeholder='Aksiyon, Komedi vs.'
                            value={genreValue}
                            onChange={(e) => setGenreValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yapım Yılı</span>:
                        <input
                            type='text'
                            placeholder='19... , 20...'
                            value={yearOfCons}
                            onChange={(e) => setYearOfCons(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yaş Sınırlaması</span>:
                        <input
                            type='text'
                            placeholder='13+ , 18+'
                            value={ageLimitValue}
                            onChange={(e) => setAgeLimitValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yönetmen</span>:
                        <input
                            type='text'
                            placeholder='Yönetmen İsmi'
                            value={directorValue}
                            onChange={(e) => setDirectorValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Senarist </span>:
                        <input
                            type='text'
                            placeholder='Senarist İsmi'
                            value={writerValue}
                            onChange={(e) => setWriterValue(e.target.value)}
                        />
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center gap-4 lr-panel lr-panel-b'>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>IMDB Puanı</span>:
                        <input
                            type='text'
                            placeholder='IMDB Puanı'
                            value={IMDBvalue}
                            onChange={(e) => setIMDBvalue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yayınlanma Tarihi</span>:
                        <input
                            type='text'
                            placeholder='Yayınlandığı tarih'
                            value={releaseDateValue}
                            onChange={(e) => setReleaseDateValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Film Süresi</span>:
                        <input
                            type='text'
                            placeholder='Ör: 2sa. 15dk.'
                            value={durationValue}
                            onChange={(e) => setDurationValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yapım Şirketi</span>:
                        <input
                            type='text'
                            placeholder='Yapım Şirketi İsmi'
                            value={productionComp}
                            onChange={(e) => setProductionComp(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yapım Dili</span>:
                        <input
                            type='text'
                            placeholder='Türkçe, İngilizce vs.'
                            value={languageValue}
                            onChange={(e) => setLanguageValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Yapımcı Ülke</span>:
                        <input
                            type='text'
                            placeholder='Türkiye, ABD vs.'
                            value={productionCountry}
                            onChange={(e) => setProductionCountry(e.target.value)}
                        />
                    </div>
                </div>

            </div>

            <div className='admin-inputs d-flex justify-content-center align-items-center float-left gap-5'>
                <div className='d-flex flex-column justify-content-center align-items-center gap-4 lr-panel characters-list'>
                    <div className='d-flex float-left gap-3 movie-review'>
                        <span className='adm-pnl-ip-title'>Film Özeti:</span>:
                        <textarea
                            id='movie-review'
                            placeholder='Filmin bilgilendirici kısa özeti...'
                            rows="7" cols={151}
                            value={movieReview}
                            onChange={(e) => setMovieReview(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='admin-inputs d-flex justify-content-center align-items-center float-left gap-5'>
                <div className='d-flex flex-column justify-content-center align-items-center gap-4 lr-panel characters-list'>
                    <div className='d-flex float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Karakterler</span>:
                        <div className='character-list-div'>
                            {charactersValue.map((character, index) => (
                                <div key={index}>
                                    "{character.name} - {character.actor}"
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center gap-4 lr-panel characters-list'>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Karakter Adı:</span>:
                        <input
                            type='text'
                            placeholder='Karakter'
                            value={characterNameValue}
                            onChange={(e) => setCharacterNameValue(e.target.value)} />
                    </div>
                    <div className='d-flex justify-content-center align-items-center float-left gap-3'>
                        <span className='adm-pnl-ip-title'>Aktör Adı:</span>:
                        <input
                            type='text'
                            placeholder='Canlandıran Aktör'
                            value={characterActorValue}
                            onChange={(e) => setCharacterActorValue(e.target.value)} />
                    </div>
                    <div className='d-flex justify-content-end add-character-btn-set'>
                        <button className='btn btn-primary' onClick={addCharacter}>Ekle</button>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-end full-w admin-btn-pd fs-5'>
                <button className='btn btn-danger fs-5' >Kaydet</button>
            </div>

        </div>
    )
}

export default AddOrUpdateMovie