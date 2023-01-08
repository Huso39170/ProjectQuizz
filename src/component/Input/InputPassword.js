import React from 'react'

const InputPassword = ({modalValue,setValue,placeholder,required,erreur}) => {
    return (
        <div className='LogSub-field'>
            {erreur.length>0 && <p className='inputLogSub_erreur'>{erreur}</p>}
            <input
                autoFocus
                type="password"
                required={required}
                placeholder={placeholder}
                value={modalValue}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    )
}

export default InputPassword