import React,{useEffect} from 'react'

const InputSelectComp = ({options,className,legend,setValue,value,selectName,erreur,selectId,question_type}) => {

    //UseEffect qui entre en jeu lorsque le tableau des options ou le type de question est changer
    //Change la valeur selon l'options selectionnée a l'écran
    useEffect(() => {
        var e = document.getElementById(selectId);
        let selectedOptions=[];
        for(let i=0;i<e.options.length;i++){
            if(e.options[i].selected===true){
                selectedOptions.push(e.options[i].value);
            }
        }
        setValue(selectedOptions);
        if(options.length===0){
            setValue('')
        }
    }, [options,question_type,setValue,selectId])

    const handleChangeNormalSelect = e => {
        const updatedOptions = [...e.target.options]
          .filter(option => option.selected)
          .map(x => x.value);
        console.log("updatedOptions", updatedOptions);
        setValue(updatedOptions);
    };
    

    return (
        <div className={className} >
            <legend>{legend}</legend>
            {erreur.length >0 && <p className='input_erreur'>{erreur}</p>}
            {(options.length>1&&question_type==="qcm")?(<select
                name={selectName}
                id= {selectId}
                onChange={handleChangeNormalSelect}
                defaultValue={value}
                multiple    
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
            </select>)
            :
            (<select
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
            )}
        </div>
    )
}

export default InputSelectComp