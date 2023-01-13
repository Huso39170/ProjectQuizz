import React from 'react'

const InputComp = ({modalValue,setValue,placeholder,required,erreur,inputType,className,label}) => {
    return (
        <div className={className} >
            {label!==undefined && <label> {label} </label>}
           {erreur.length >0 && <p className='input_erreur'>{erreur}</p>}
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

export default InputComp