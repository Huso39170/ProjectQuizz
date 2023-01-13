import React from 'react'

const TextAreaComp = ({modalValue,setValue,placeholder,required,erreur,className,label}) => {
  return (
    <div className={className} >
        {label!==undefined && <label>{label} </label>}
        {erreur.length >0 && <p className='input_erreur'>{erreur}</p>}
        <textarea
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

export default TextAreaComp