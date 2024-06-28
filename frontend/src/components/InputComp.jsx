import React, { useState } from 'react'

const InputComp = ( { setMailHome, setMailCtrl, isValidEmail, setIsValidEmail } ) => {

    const [mail, setMail] = useState("");

    const mailCtrl = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(email));
        setMailCtrl(emailRegex.test(email));
    };

    const handleMailInput = (event) => {
        const value = event.target.value;
        setMail(value);
        mailCtrl(value);
        setMailHome(value);
    };

    const inputStyle = {
        outline: 'none',
        border: `1px solid ${isValidEmail ? 'grey' : 'red'}`,
    };

    return (
        <div>
            <input
                className='inp-start'
                type='text'
                placeholder='E-posta adresi'
                style={inputStyle}
                onChange={handleMailInput}
                value={mail}
            />
        </div>
    )
}

export default InputComp
