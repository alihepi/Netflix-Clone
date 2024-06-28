import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddUserPageThree = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const mail = location.state && location.state.mail;
    const password = location.state && location.state.password;

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-column align-items-center justify-content-center signup signup-page gap-2'>
                <span className="toapp-icon2 d-flex">🗸</span>
                <span>ADIM 2 / 3</span>
                <h2>Planınızı seçin.</h2>
                <span className="signup-inf-text d-flex gap-2">
                    <span className="toapp-icon">🗸</span>
                    Taahhüt yok, istediğiniz zaman iptal edin.
                </span>
                <span className="signup-inf-text d-flex gap-2">
                    <span className="toapp-icon">🗸</span>
                    Tek ve düşük bir ücretle, Netflix'teki her şey önünüzde.
                </span>
                <span className="signup-inf-text d-flex gap-2">
                    <span className="toapp-icon">🗸</span>
                    Tüm cihazlarınızda sınırsız izleme imkânı.
                </span>
                <button className='signup1-btn mt-4' onClick={() => navigate('/signup/planform', { state: { mail: mail, password: password } })}>Devam Et</button>
            </div>
        </div>
    );
};

export default AddUserPageThree;