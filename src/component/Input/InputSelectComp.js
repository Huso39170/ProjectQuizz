import React,{useEffect} from 'react'

const InputSelectComp = ({options,className,legend,setValue,value,selectName,erreur,selectId}) => {

    //UseEffect qui entre en jeu lorsque le tableau des options et changer
    //Change la valeur selon l'options selectionnée a l'écran
    useEffect(() => {
        var e = document.getElementById(selectId);
        setValue(e.options[e.selectedIndex].value)
        if(options.length===0){
            setValue('')
        }
    }, [options,setValue,selectId])

    return (
        <div className={className} >
            <legend>{legend}</legend>
            {erreur.length >0 && <p className='input_erreur'>{erreur}</p>}
            <select
                name={selectName}
                id= {selectId}
                onChange={e => setValue(e.target.value)}
                defaultValue={value}    
            >
                {
                    options && options.map((option) => (
                            <option                                
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                    ))
                }
            </select>
        </div>
    )
}

export default InputSelectComp