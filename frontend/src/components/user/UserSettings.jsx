import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import SearchMov from "../SearchMov";
import MovieDataService from "../../services/MovieDataService";

const UserSettings = ({ handleLogout }) => {

    const navigate = useNavigate();

    const location = useLocation();
    const userData = location.state && location.state.userData;

    const [searchMov, setSearchMov] = useState('');

    const [btnCtrl, setBtnCtrl] = useState('danger');
    const [currentUser, setCurrentUser] = useState(userData);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (currentUser.name !== userData.name || currentUser.email !== userData.email || (newPassword !== "" && newPassword.length >= 8 && /[A-Z]/.test(newPassword))) {
            setBtnCtrl('success');
        } else {
            setBtnCtrl('danger');
        }
    }, [currentUser, newPassword]);

    const updateUser = async () => {
        if (btnCtrl === "success") {
            try {
                const updatedData = {};
                if (currentUser.name !== userData.name) {
                    updatedData.name = currentUser.name;
                }
                if (currentUser.email !== userData.email) {
                    updatedData.email = currentUser.email;
                }
                if (newPassword !== "") {
                    updatedData.password = newPassword;
                }
                await setCurrentUser(updatedData);
                await MovieDataService.updateUser(userData.token, updatedData, userData._id);
                alert("Güncelleme başarılı. \nLütfen tekrar giriş yapınız!");
                setBtnCtrl('danger');
                handleLogout();
                navigate('/');
            } catch (error) {
                alert(error.response.data.status + " Aynı e-postaya sahip birden fazla hesap olamaz.");
            }
        } else {
            alert("Lütfen tüm alanları doldurunuz.");
        }
    };


    const deleteUser = async () => {
        const result = window.confirm("Hesabınızı silmek istediğinize emin misiniz?");
        if (result) {
            try {
                await MovieDataService.deleteUser(userData.token, userData._id);
                alert("Hesabınız başarıyla silindi.");
                handleLogout();
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-start justify-content-center gap-3 page">
            <Navbar userPage={true} setSearchMov={setSearchMov} handleLogout={handleLogout} />
            {console.log(userData)}
            {searchMov !== "" ? (
                <SearchMov searchMov={searchMov} />
            ) : (
                <div className='user-settings-main d-flex flex-column gap-2 align-items-center justify-content-center full-w'>
                    {/*Update*/}
                    <h4>Hesap Bilgilerini Güncelle</h4>
                    <span className="d-flex flex-column gap-4 update-user-sp">
                        <span className="d-flex float-left gap-3 align-items-center">
                            <span>Kullanıcı Adı</span>:
                            <input
                                type="text"
                                value={currentUser.name}
                                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                placeholder="Kullanıcı adınızı giriniz"
                            />
                        </span>
                        <span className="d-flex float-left gap-3 align-items-center">
                            <span>E-Posta</span>:
                            <input
                                type="text"
                                value={currentUser.email}
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                placeholder="Kullanıcı adınızı giriniz"
                            />
                        </span>
                        <span className="d-flex float-left gap-3 align-items-center">
                            <span>Şifre</span>:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Yeni şifrenizi giriniz"
                            />
                        </span>
                        {newPassword ? (
                            <span style={{color: "gray"}}>En az 8 karakter ve bir büyük harf</span>
                        ) : null}
                        <span className="d-flex float-left gap-3 justify-content-end mt-3">
                            <button className={`btn btn-danger btn-sm`} onClick={() => deleteUser()}>Hesabı Sil</button>
                            <button className={`btn btn-${btnCtrl} btn-sm`} onClick={() => updateUser()}>Değişiklikleri Kaydet</button>
                        </span>
                    </span>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default UserSettings;