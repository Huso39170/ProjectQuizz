import React from 'react'

const InputRadioComp = ({values,className,legend,modalValue,setValue,name}) => {
    return (
        <div className={className} >
            <legend>{legend}</legend>
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
                        <label>{item.label}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default InputRadioComp