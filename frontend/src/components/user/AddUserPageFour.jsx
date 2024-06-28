import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddUserPageFour = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const mail = location.state && location.state.mail;
    const password = location.state && location.state.password;

    const [plan, setPlan] = useState('');

    const toPaymentPicker = async (e) => {
        await setPlan(e);
        navigate('/signup/paymentPicker', { state: { mail: mail, password: password, plan: plan } });
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-column align-items-center justify-content-center signup signup-page gap-4'>
                <span className="d-flex flex-column align-items-start justify-content-start full-w">
                    <span>ADIM 2 / 3</span>
                    <h2>Kendinize uygun bir plan seçin</h2>
                </span>
                <span className="d-flex float-left gap-3">
                    {/*Plan1*/}
                    <span className="d-flex flex-column gap-3 plan" onClick={() => toPaymentPicker(1)}>
                        <h5 className="plan-header">Özel</h5>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Aylık Ücret</span>
                            <span>229,99 ₺</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Görüntü ve Ses Kalitesi</span>
                            <span>En Yüksek</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Çözünürlük</span>
                            <span>4K (Ultra HD) + HDR</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Konumsal ses (3 boyutlu ses)</span>
                            <span>Dahil</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Desteklenen cihazlar</span>
                            <span>Televizyon, bilgisayar, cep telefonu, tablet</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Evinizde aynı anda izleyebileceğiniz cihazlar</span>
                            <span>4</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Video indirilebilir cihazlar</span>
                            <span>6</span>
                        </div>
                    </span>
                    {/*Plan2*/}
                    <span className="d-flex flex-column gap-3 plan" onClick={() => toPaymentPicker(2)}>
                        <h5 className="plan-header">Standart</h5>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Aylık Ücret</span>
                            <span>176,99 ₺</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Görüntü ve Ses Kalitesi</span>
                            <span>Yüksek</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Çözünürlük</span>
                            <span>1080p (Tam HD)</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Desteklenen cihazlar</span>
                            <span>Televizyon, bilgisayar, cep telefonu, tablet</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Evinizde aynı anda izleyebileceğiniz cihazlar</span>
                            <span>2</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Video indirilebilir cihazlar</span>
                            <span>2</span>
                        </div>
                    </span>
                    {/*Plan3*/}
                    <span className="d-flex flex-column gap-3 plan" onClick={() => toPaymentPicker(3)}>
                        <h5 className="plan-header">Temel</h5>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Aylık Ücret</span>
                            <span>119,99 ₺</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Görüntü ve Ses Kalitesi</span>
                            <span>İyi</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Çözünürlük</span>
                            <span>720p (HD)</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Desteklenen cihazlar</span>
                            <span>Televizyon, bilgisayar, cep telefonu, tablet</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Evinizde aynı anda izleyebileceğiniz cihazlar</span>
                            <span>1</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="plan-text">Video indirilebilir cihazlar</span>
                            <span>1</span>
                        </div>
                    </span>
                </span>
                <span className="planform-inf-text text-start full-w">
                    HD (720p), Tam HD (1080p), Ultra HD (4K) ve HDR kullanılabilirliği internet hizmetinize ve cihazınızın özelliklerine bağlıdır. Tüm içerikler bütün çözünürlüklerde mevcut olmayabilir. Ayrıntılar için Kullanım Koşulları sözleşmemize bakın.
                    Bu hesabı sadece sizinle birlikte yaşayanlar kullanabilir.
                </span>
                <span className="planform-inf-text text-start full-w">
                    Özel planda aynı anda 4 farklı cihazda içerik izleyin. Standart planda bu sayı 2, Temel planda ise 1'dir.
                </span>
            </div>
        </div>
    );
};

export default AddUserPageFour;