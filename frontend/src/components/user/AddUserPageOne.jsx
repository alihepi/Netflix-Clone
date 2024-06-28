import React from "react";

import signUpImg1 from "../../images/signup1.png";
import { useLocation, useNavigate } from "react-router-dom";

const AddUserPageOne = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const mail = location.state && location.state.mail;

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-column align-items-center justify-content-center signup signup-page'>
                <img src={signUpImg1} alt='signup' />
                <span>ADIM 1 / 3</span>
                <h2>Hesabınızı oluşturalım</h2>
                <span className="signup-inf-text text-center">
                    Netflix sizin için kişiselleştirilir.
                    İstediğiniz zaman, istediğiniz cihazda
                    izlemek için bir parola oluşturun.
                </span>
                <button className='signup1-btn mt-4' onClick={() => navigate('/signup/regform', { state: { mail: mail } } )}>Devam Et</button>
            </div>
        </div>
    );
};

export default AddUserPageOne;