import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddUserPageTwo = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const mail = location.state && location.state.mail;

    const [email, setEmail] = useState(mail ? mail : '');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const validatePassword = (pwd) => {
        const isValid = pwd.length >= 8 && /[A-Z]/.test(pwd);
        setIsPasswordValid(isValid);
        return isValid;
    }

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        validatePassword(pwd);
    }

    const toPlanForm = async () => {
        if (email === '' || password === '') {
            alert('Lütfen tüm alanları doldurunuz.');
        } else if (!validatePassword(password)) {
            alert('Parolanız en az 8 haneli olmalı ve en az bir büyük harf içermelidir.');
        } else {
            navigate('/signup/planform', { state: { mail: email, password: password } });
        }
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-column gap-2 justify-content-center signup signup-page'>
                <span>ADIM 1 / 3</span>
                <h2 className="regform-inf-text">Üyeliğinizi başlatmak için bir parola oluşturun</h2>
                <span className="regform-inf-text rg-inf-t">
                    Sadece birkaç adım daha kaldı, sonra bitiyor! <br />
                    Biz de formaliteyi hiç sevmiyoruz.
                </span>
                <span className="regform-inputs d-flex flex-column gap-2">
                    <span className="rf-input-name d-flex flex-column">
                        <span>E-Posta</span>
                        <input type="text" placeholder="E-Posta Adresiniz"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </span>
                    <span className="rf-input-name d-flex flex-column">
                        <span>Parola {" (En az 8 karakter ve bir büyük harf)"}</span>
                        <input type="password" placeholder="Bir parola belirleyin"
                            style={{ border: `1px solid ${isPasswordValid ? 'green' : 'red'}` }}
                            value={password} onChange={handlePasswordChange}
                        />
                    </span>
                </span>
                <button className='signup1-btn mt-4' onClick={() => toPlanForm()}>Devam Et</button>
            </div>
        </div>
    );
};

export default AddUserPageTwo;
