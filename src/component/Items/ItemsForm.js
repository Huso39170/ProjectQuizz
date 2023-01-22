import React,{useState} from 'react'
import InputComp from '../Input/InputComp'
import {FaPlus } from 'react-icons/fa'


const ItemsForm = ({GlobalDivClassName,aBtnClassName,btnClassName,itemsClassName,items,setItems,itemNames}) => {

    //Initialisation de champs de saisie de item ainsi que des erreurs 
    //qui peuvent survenir lors de l'insertion de items
    const [itemInput,setItemInput] = useState("");
    const [erreur,setErreur]=useState("");


    //Fonction qui ajoute un item dans le tableau des items
    //Si déja existant affiche une erreru
    const addItem = (e) =>{
        e.preventDefault();
        if(itemInput.length>0){
            if(items.indexOf(itemInput) === -1){
                setItems([...items,itemInput])
                setItemInput("")
            }else{
                setErreur( `${itemNames.substring(0, itemNames.length-1)} déja présent`)
            }
        }
    }

    //Supprime un item du tableau
    const handleDeleteItem = (e,item) =>{
        e.preventDefault();
        const listItems = items.filter((e) => e !== item);
        setItems(listItems);
    }

    return (
        <div className={GlobalDivClassName}>
            <InputComp 
                placeholder={`Préciser les ${itemNames} du quizz`}
                setValue={setItemInput}
                modalValue={itemInput}
                inputType={"text"}
                erreur={erreur}
                setErreur={setErreur}
                className={'input_field'}
                label={itemNames}
            />
            <a href=" " className={aBtnClassName} title='Démarrer' onClick={addItem}><FaPlus className={btnClassName} alt='add button'/></a>
            <div className={itemsClassName}>
                <ul>
                    {items &&items.map((item) => (
                        <li key={item}>{item}
                            <a href=" " onClick={(e) => {handleDeleteItem(e,item)}}>x</a>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default ItemsForm