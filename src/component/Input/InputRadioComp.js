import React from 'react'

const InputRadioComp = ({values,className,legend,modalValue,setValue,name,erreur}) => {
    return (
        <div className={className} >
            <legend>{legend}</legend>
            {erreur.length >0 && <p className='input_erreur'>{erreur}</p>}
            {
                values.map((item, index) => (
                    <div className={item.divClassName} key={index}>
                        <input 
                            type="radio" 
                            id={item.value} 
                            name={name} 
                            checked= {modalValue === item.value} 
                            onChange={()=>setValue(item.value)}
                        />
                        <label>{item.libelle}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default InputRadioComp