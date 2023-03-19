import React,{useState} from 'react'
import {FaPlus } from 'react-icons/fa'


const ItemsFilter = ({GlobalDivClassName,aBtnClassName,btnClassName,itemsClassName,items,setItems,itemNames,itemsOption}) => {

    //Initialisation de champs de saisie de item ainsi que des erreurs 
    //qui peuvent survenir lors de l'insertion de items
    const [itemInput,setItemInput] = useState("");


    //Fonction qui ajoute un item dans le tableau des items
    const addItem = (e) =>{
        e.preventDefault();
        if(itemInput.length>0){
            if(items.indexOf(itemInput) === -1){
                if(itemInput!=="default")
                setItems([...items,itemInput])
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
        <select
                name={"selectName"}
                id= {"selectId"}
                onChange={(e) => {setItemInput(e.target.value)}}
                defaultValue={"default"}
            >
            <option                                
                key={"default"}
                value={"default"}
            >
                {"Filtrer par tag"}
            </option>
            {
                itemsOption && itemsOption.map((option) => (
                        <option                                
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                ))
            }
            </select>
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

export default ItemsFilter