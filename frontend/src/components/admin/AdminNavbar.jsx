import React from 'react'

const AdminNavbar = ({ pageTitle }) => {
  return (
    <div id='navbar' className='d-flex col-12 float-left align-items-center justify-content-center admin-navbar'>
        <h4 className='box-underline'>{pageTitle}</h4>
    </div>
  )
}

export default AdminNavbar
