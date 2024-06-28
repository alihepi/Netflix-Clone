import React, { useEffect, useState } from 'react';

import logo from '../images/netflix-logo.png';
import avatar from '../images/avatar.png';

import search from "../images/search.png";
import { useNavigate } from 'react-router-dom';


const Navbar = ({ userPage = false, setSearchMov, handleLogout = () => { } }) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                setUserData(userData.data);
            }
        }
        fetchUser();
    }, []);

    const [searchMovName, setSearchMovName] = useState("");
    const [searchInput, setSearchInput] = useState({
        display: 'none', width: '0', position: '',
        background: 'none'
    });

    const [userInfo, setUserInfo] = useState(false);

    const handleSetSearchInput = () => {
        setSearchInput({
            display: searchInput.display === 'none' ? 'block' : 'none',
            width: '13rem', position: searchInput.position === '' ? 'absolute' : '',
            background: searchInput.background === 'none' ? '#6363637e' : 'none'
        });
    }

    const catagoryPage = async (category) => {
        async function randChar() {
            const arr = ("ac97de13hi").split("");
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr.join("");
        }

        var link = await randChar();
        navigate(`/browse/genre/${link}`, { state: { filterCategory: category } });
    }


    const handleSearchMov = (e) => {
        setSearchMovName(e);
        setSearchMov(e);
    }

    const UserOut = () => {
        handleLogout();
        navigate('/');
    };

    const userInfS = () => {
        setUserInfo(prevState => !prevState);
    }

    return (
        <div id='navbar' className='d-flex col-12 float-left align-items-center justify-content-between'>
            <div className='d-flex float-left gap-5 justify-content-center align-items-center'>
                <img className='nav-logo' alt='netflix.com' type='png' src={logo} style={{ cursor: 'pointer' }} onClick={() => navigate('/browse')} />
                {userPage ? (
                    <div className='d-flex float-left gap-4 justify-content-center align-items-center cursor-pointer'>
                        <div onClick={() => {
                            navigate('/browse')
                            setSearchMovName("");
                            setSearchMov("");
                        }}>Ana Sayfa</div>
                        <div className="dropdown my-drdw-set">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Türler
                            </button>
                            <ul className="dropdown-menu">
                                <li onClick={() => catagoryPage("Aksiyon")}>Aksiyon</li>
                                <li onClick={() => catagoryPage("Bilim Kurgu")}>Bilim Kurgu</li>
                                <li onClick={() => catagoryPage("Komedi")}>Komedi</li>
                                <li onClick={() => catagoryPage("Animasyon")}>Animasyon</li>
                                <li onClick={() => catagoryPage("Romantizm")}>Romantizm</li>
                                <li onClick={() => catagoryPage("Korku")}>Korku</li>
                                <li onClick={() => catagoryPage("Gerilim")}>Gerilim</li>
                                <li onClick={() => catagoryPage("Belgesel")}>Belgesel</li>
                                <li onClick={() => catagoryPage("Çocuk")}>Çocuk</li>
                            </ul>
                        </div>
                        <div onClick={() => {
                            navigate(`/browse/favorite-movies`);
                            setSearchMovName("");
                            setSearchMov("");
                        }}>Listem</div>
                    </div>
                ) : (<div></div>)}
            </div>
            <div className='d-flex float-left gap-2'>
                {userPage ? (
                    <div className='d-flex float-left gap-4 justify-content-center align-items-center nav-icons cursor-pointer'>
                        <div className='d-flex gap-1 search-inp-div' style={{ background: searchInput.background }}>
                            <img src={search} alt='search' onClick={() => handleSetSearchInput(1)} style={{ position: searchInput.position, color: 'black' }} />
                            <input
                                style={{ display: searchInput.display, width: searchInput.width }}
                                placeholder='Film/Dizi ismi'
                                className='search-inp'
                                value={searchMovName}
                                onChange={(e) => handleSearchMov(e.target.value)}
                            />
                        </div>
                        {/*<div><img src={notificaiton} alt='notificaiton' /></div>*/}
                        <div>
                            <img src={avatar} alt='userPhoto' className='user-photo' onClick={() => userInfS()} />
                            {userInfo ? (
                                <span className='userInfo d-flex flex-column gap-2 text-end'>
                                    <span onClick={() => navigate('/account', { state : { userData: userData } })}>Hesap Yönetimi</span>
                                    <div onClick={UserOut}><i className="fa-solid fa-right-from-bracket"></i> Çıkış Yap</div>
                                </span>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <button type="button" className="btn-login" onClick={() => navigate('/login')}>Oturum Aç</button>
                )}
            </div>
        </div>
    )
}

export default Navbar
