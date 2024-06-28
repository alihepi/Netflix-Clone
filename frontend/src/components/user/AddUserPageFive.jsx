import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentCodes from "../../PaymentCodes.json";

import MovieDataService from "../../services/MovieDataService";

const AddUserPageFive = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const mail = location.state && location.state.mail;
    const password = location.state && location.state.password;
    const plan = location.state && location.state.plan;

    const [paymentCode, setPaymentCode] = useState("");
    const [isValidCode, setIsValidCode] = useState(null);

    const handlePaymentCodeChange = (e) => {
        setPaymentCode(e.target.value);
    };

    const handlePaymentCodeSubmit = async () => {
        if (PaymentCodes.includes(paymentCode)) {
            const data = {
                name: mail,
                email: mail,
                password: password
            };
            try {
                await MovieDataService.signUp(data);
                setIsValidCode(true);
                window.confirm("Kayıt Başarılı! \nAna sayfaya yönlendiriliyorsunuz. Giriş yapabilirsiniz.");
                navigate('/');
            } catch (error) {
                setIsValidCode(false);
                alert("Kayıt başarısız. Lütfen tekrar deneyin.");
            }
        } else {
            setIsValidCode(false);
        }
    };

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-column align-items-center justify-content-center signup signup-page gap-2'>
                <span>ADIM 3 / 3</span>
                <h2>Ödeme Kodunuzu Giriniz</h2>
                <input
                    type="text"
                    placeholder="Ödeme Kodu"
                    className='payment-input mt-4'
                    value={paymentCode}
                    onChange={handlePaymentCodeChange}
                />
                <button className='signup1-btn mt-4' onClick={handlePaymentCodeSubmit}>Ödeme Kodunu Kullan</button>
                <span className="signup-btn-inf-text" style={{ color: "red" }}>
                    { isValidCode === false && (
                        <>Geçersiz ödeme kodu. Lütfen tekrar deneyin</>
                    )}
                </span>
            </div>
        </div>
    );
};

export default AddUserPageFive;