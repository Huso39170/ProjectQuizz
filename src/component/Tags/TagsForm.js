import React,{useState} from 'react'
import InputComp from '../Input/InputComp'
import {FaPlus } from 'react-icons/fa'


const TagsForm = ({GlobalDivClassName,aBtnClassName,btnClassName,tagsClassName,tags,setTags}) => {

    //Initialisation de champs de saisie de tag ainsi que des erreurs 
    //qui peuvent survenir lors de l'insertion de tags
    const [tagInput,setTagInput] = useState("");
    const [erreur,setErreur]=useState("");

    //Fonction qui ajoute un tag dans le tableau des tags
    //Si déja existant affiche une erreru
    const addTag = (e) =>{
        e.preventDefault();
        if(tags.indexOf(tagInput) === -1){
            setTags([...tags,tagInput])
            setTagInput("")
        }else{
            setErreur("Tag déja présent")
        }

        
    }

    //Supprime un tag du tableau
    const handleDeleteTag = (e,tag) =>{
        e.preventDefault();
        const listTags = tags.filter((item) => item !== tag);
        setTags(listTags);
    }

    return (
        <div className={GlobalDivClassName}>
            <InputComp 
                placeholder={"Préciser les tags du quizz"}
                setValue={setTagInput}
                modalValue={tagInput}
                inputType={"text"}
                erreur={erreur}
                setErreur={setErreur}
                className={'input_field'}
                label={"Tags"}
            />
            <a href=" " className={aBtnClassName} title='Démarrer' onClick={addTag}><FaPlus className={btnClassName} alt='add button'/></a>
            <div className={tagsClassName}>
                <ul>
                    {tags &&tags.map((tag) => (
                        <li key={tag}>{tag}
                            <a href=" " onClick={(e) => {handleDeleteTag(e,tag)}}>x</a>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default TagsForm