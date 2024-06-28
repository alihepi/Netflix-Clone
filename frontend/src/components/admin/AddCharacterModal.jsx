import React, { useState } from 'react'

const AddCharacterModal = ({ addCharacterModal, setAddCharacterModal, addCharacter }) => {

    const [character, setCharacter] = useState({
        name: "",
        actor: ""
    });

    const handleCharInf = (e, field) => {
        setCharacter({ ...character, [field]: e.target.value });
    }

    const closeModal = () => {
        setCharacter({
            name: "",
            actor: ""
        });
        setAddCharacterModal("none");
    }

    const addChar = () => {
        addCharacter(character);
        setCharacter({
            name: "",
            actor: ""
        });
        setAddCharacterModal("none");
    }

    return (
        <div style={{ display: `${addCharacterModal}` }}>
            <div className='add-character-modal d-flex align-items-center justify-content-center'>
                <div className='character-inputs'>
                    <div className='d-flex flex-column gap-3 align-items-center justify-content-center'>
                        <div className='d-flex gap-2 add-character-set align-items-center justify-content-center'>
                            <div>Karakter</div>:
                            <input type="text" value={character.name} onChange={(e) => handleCharInf(e, 'name')}/>
                        </div>
                        <div className='d-flex gap-2 add-character-set align-items-center justify-content-center'>
                            <div>Aktör</div>:
                            <input type="text" value={character.actor} onChange={(e) => handleCharInf(e, 'actor')}/>
                        </div>
                        <div className='characters-buttons d-flex gap-2 align-items-center justify-content-end'>
                            <button className='btn btn-success' onClick={() => addChar()}>Ekle</button>
                            <button className='btn btn-danger' onClick={(e) => closeModal()}>İptal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCharacterModal
