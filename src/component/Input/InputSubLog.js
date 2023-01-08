import React from 'react'

const InputSubLog = ({modalValue,setValue,placeholder,required,erreur,inputType}) => {


    return (

        <div className='LogSub-field'>
           {erreur.length >0 && <p className='inputLogSub_erreur'>{erreur}</p>}
            <input
                type={inputType}
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

export default InputSubLog