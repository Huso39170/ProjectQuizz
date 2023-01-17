import React from 'react'

const InputComp = ({modalValue,setValue,placeholder,required,erreur,setErreur,inputType,className,label}) => {

    const resetErreur =()=>{
        //setErreur("")
    }

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
                    resetErreur();
                }}
            />

        </div>
    )
}

export default InputComp