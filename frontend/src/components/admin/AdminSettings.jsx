import React, { useEffect, useState } from "react";
import MovieDataService from "../../services/MovieDataService";
import { useNavigate } from "react-router-dom";

const AdminSettings = ({ adminData, handleLogout }) => {

  const navigate = useNavigate();

  const [addAdmin, setAddAdmin] = useState(false);
  const [adminSet, setAdminSet] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    nickname: "",
    password: ""
  });
  const [btnCtrl, setBtnCtrl] = useState('danger');
  const [currentAdminData, setCurrentAdminData] = useState(adminData);

  useEffect(() => {
    if (newAdminData.name && newAdminData.nickname && newAdminData.password) {
      setBtnCtrl('success');
    } else {
      setBtnCtrl('danger');
    }
  }, [newAdminData]);

  useEffect(() => {
    if ((currentAdminData.name !== adminData.name) ||
      (currentAdminData.nickname !== adminData.nickname) || (newPassword !== "")) {
      setBtnCtrl('success');
    } else {
      setBtnCtrl('danger');
    }
  }, [currentAdminData, newPassword]);

  const addAdminDB = async () => {
    if (btnCtrl === "success") {
      try {
        await MovieDataService.signUpAdmin(newAdminData);
        alert(newAdminData.nickname + " isimli admin eklendi.");
        setBtnCtrl('danger');
        setNewAdminData({ name: "", nickname: "", password: "" });
        setAddAdmin(false);
        setAdminSet(false);
      } catch (error) {
        alert(error.response.data.status);
      }
    } else {
      alert("Lütfen tüm alanları doldurunuz.");
    }
  };


  const updateAdmin = async () => {
    if (btnCtrl === "success") {
      try {
        const updatedData = {};
        if (currentAdminData.name !== adminData.name) {
          updatedData.name = currentAdminData.name
        }
        if(currentAdminData.nickname !== adminData.nickname) {
          updatedData.nickname = currentAdminData.nickname;
        }
        if (newPassword !== "") {
          updatedData.password = newPassword;
        }
        await setCurrentAdminData(updatedData);
        await MovieDataService.updateAdmin(adminData.token, updatedData, adminData.id);
        alert("Güncelleme başarılı. \nLütfen tekrar giriş yapınız!");
        setBtnCtrl('danger');
        handleLogout();
        navigate('/login');
      } catch (error) {
        alert(error.response.data.status + " Aynı nickname'e sahip birden fazla hesap olamaz.");
      }
    } else {
      alert("Lütfen tüm alanları doldurunuz.");
    }
  };


  const deleteAdmin = async () => {
    if (adminData.nickname == "admin") {
      alert("Ana admin hesabınızı silemezsiniz.");
    } else {
      const result = window.confirm("Hesabınızı silmek istediğinize emin misiniz?");
      if (result) {
        try {
          await MovieDataService.deleteAdmin(adminData.token, adminData.id);
          alert("Hesabınız başarıyla silindi.");
          handleLogout();
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="admin-set-page-set d-flex flex-column gap-5">
      <span>
        <h3 className="box-underline">Admin Ayarları</h3>
        <div className="d-flex float-left align-items-center gap-4">
          <span className="admin-set-btn" onClick={() => {
            setAddAdmin(prevState => !prevState);
            setAdminSet(false);
          }}>Yeni Admin Ekle</span>
          <span className="admin-set-btn" onClick={() => {
            setAdminSet(prevState => !prevState);
            setAddAdmin(false);
          }}>Hesap Ayarları</span>
        </div>
      </span>

      {adminSet ? (
        <span className="btn-sc-set d-flex flex-column gap-3 align-items-center justify-content-center">
          <span className="add-admin-inputs-set d-flex flex-column gap-3">
            <span className="add-admin-inputs d-flex float-left gap-1 align-items-center">
              <span>Kullanıcı Adı</span>:
              <input
                type="text"
                value={currentAdminData.nickname}
                onChange={(e) =>
                  setCurrentAdminData({ ...currentAdminData, nickname: e.target.value })
                }
                placeholder="Kullanıcı adınızı giriniz"
              />
            </span>
            <span className="add-admin-inputs d-flex float-left gap-1 align-items-center">
              <span>Ad Soyad</span>:
              <input
                type="text"
                value={currentAdminData.name}
                onChange={(e) =>
                  setCurrentAdminData({ ...currentAdminData, name: e.target.value })
                }
                placeholder="Adınızı ve soyadınızı giriniz"
              />
            </span>
            <span className="add-admin-inputs d-flex float-left gap-1 align-items-center">
              <span>Şifre</span>:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yeni şifrenizi giriniz"
              />
            </span>
          </span>
          <span className={`add-save-btn d-flex justify-content-${adminData.nickname == "admin" ? "end" : "between"} gap-3`}>
            {adminData.nickname !== "admin" ? (
              <button className="btn btn-danger" onClick={deleteAdmin}>Hesabı Sil</button>
            ) : null}
            <button className={`btn btn-${btnCtrl}`} onClick={updateAdmin}>Kaydet</button>
          </span>
        </span>
      ) : null}

      {addAdmin ? (
        <span className="btn-sc-set d-flex flex-column gap-3 align-items-center justify-content-center">
          <span className="add-admin-inputs-set d-flex flex-column gap-3">
            <span className="add-admin-inputs d-flex float-left gap-1 align-items-center">
              <span>Kullanıcı Adı</span>:
              <input
                type="text"
                value={newAdminData.nickname}
                onChange={(e) =>
                  setNewAdminData({ ...newAdminData, nickname: e.target.value })
                }
                placeholder="Kullanıcı adınızı giriniz"
              />
            </span>
            <span className="add-admin-inputs d-flex float-left gap-1 align-items-center">
              <span>Ad Soyad</span>:
              <input
                type="text"
                value={newAdminData.name}
                onChange={(e) =>
                  setNewAdminData({ ...newAdminData, name: e.target.value })
                }
                placeholder="Adınızı ve soyadınızı giriniz"
              />
            </span>
            <span className="add-admin-inputs d-flex float-left gap-1 align-items-center">
              <span>Şifre</span>:
              <input
                type="password"
                value={newAdminData.password}
                onChange={(e) =>
                  setNewAdminData({ ...newAdminData, password: e.target.value })
                }
                placeholder="Şifrenizi giriniz"
              />
            </span>
          </span>
          <span className="add-save-btn d-flex justify-content-end">
            <button className={`btn btn-${btnCtrl}`} onClick={addAdminDB}>Kaydet</button>
          </span>
        </span>
      ) : null}
    </div>
  );
};

export default AdminSettings;