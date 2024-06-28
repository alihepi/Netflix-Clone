import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';

import MovieDataService from '../../services/MovieDataService'

const Login = ({ setLogin }) => {
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const loginBtn = () => {
        if (!isValidEmail(emailValue)) {
            MovieDataService.loginAdmin({
                nickname: emailValue,
                password: passwordValue
            }).then((response) => {
                console.log("Giriş Başarılı");
                const userData = {
                    data: response.data,
                    isAdmin: true,
                    connected: true,
                    token: response.data.token
                };
                setLogin(userData);
                localStorage.setItem("adminData", JSON.stringify(userData));
                setTimeout(() => {
                    navigate('/admin', { state: { adminData: response.data } });
                }, 500);
            }).catch((error) => {
                console.error("Başarısız ", error);
            });
        } else {
            MovieDataService.login({
                email: emailValue,
                password: passwordValue
            }).then((response) => {
                console.log("Giriş Başarılı");
                const userData = {
                    data: response.data,
                    isAdmin: false,
                    connected: true
                };
                setLogin(userData);
                localStorage.setItem("userData", JSON.stringify(userData));
                setTimeout(() => {
                    navigate('/browse', { state: { userData: response.data } });
                }, 500);
            }).catch((error) => {
                console.error("Başarısız ", error);
            });
        }
    };

    useEffect(() => {
        const allAdmin = async () => {
            try {
                const responde = await MovieDataService.adminList(token);
                console.log(responde.data)
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        allAdmin();
    }, []);

    const resetPassword = () => {
        alert("Lütfen 'alihappyprojects@gmail.com' mail adresi üzerinden Admin ile iletişime geçiniz!");
    }

    return (
        <div className='d-flex flex-column align-items-center page login-register'>
            <div className='d-flex flex-column justify-content-start align-items-center login-set'>
                <Navbar />
                <div className='d-flex align-items-center justify-content-center login-set1'>
                    <div className='login-det d-flex flex-column align-items-center gap-3'>
                        <div><h3>Oturum Aç</h3></div>
                        <div className='d-flex flex-column align-items-center gap-3'>
                            <div>
                                <input type='text' placeholder='E-posta adresi'
                                    value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                            </div>
                            <div>
                                <input type='password' placeholder='Şifre'
                                    value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
                            </div>
                            <div><button onClick={loginBtn}>Oturum Aç</button></div>
                            <div className='f-p' onClick={() => resetPassword()}>Parolanızı mı unuttunuz?</div>
                            <div className='register'>
                                Henüz üye değil misiniz?
                                <span onClick={() => navigate('/')}> Şimdi Kaydolun!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
