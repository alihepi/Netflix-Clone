import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSettings from './AdminSettings';

const AdminPanel = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [adminSet, setAdminSet] = useState(false);
  const [updatedData, setUpdatedData] = useState(false);

  const [adminData, setAdminData] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setAdminData(userData.data);
      }
    }
    fetchUser();
  }, []);

  const toPage = (e) => {
    if (e === 'add-movie') {
      navigate('/admin/add-movie/upload-video');
    } else if (e === 'allmovies') {
      navigate('/admin/allmovies');
    } else if (e === 'user-list') {
      navigate('/admin/user-list');
    } else if (e === 'add-admin') {
      navigate('/admin/add-admin');
    }
  };

  const UserOut = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div className='d-flex gap-2 admin-panel-container admin-panel'>

      <div className='d-flex flex-column gap-2 admin-left-panel justify-content-between'>

        <div className='d-flex flex-column gap-2'>
          <h5 className='box-underline'>Admin Panel</h5>
          <div className='d-flex flex-column gap-2'>
            <span className='panel-options' onClick={() => toPage('add-movie')}>Yeni İçerik Ekle</span>
            <span className='panel-options' onClick={() => toPage('allmovies')}>İçerik Düzenle / Sil</span>

            <span className='panel-options' onClick={() => setAdminSet(prevState => !prevState)}>Admin Yönetim</span>
          </div>
        </div>

        <div className='d-flex float-left justify-content-end'> <i className="fa-solid fa-right-from-bracket fs-4" onClick={UserOut}></i> </div>
      </div>

      <div className='d-flex flex-column gap-2 admin-right-panel align-items-center'>
        <span><h4>Netflix Yönetim Sistemi</h4></span>

        <div className='d-flex align-items-center justify-content-center right-panel-other'>
          { adminSet ? ( <AdminSettings adminData={adminData} handleLogout={handleLogout}/> ) : null }
        </div>

      </div>

    </div>
  );
}

export default AdminPanel;
