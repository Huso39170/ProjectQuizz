import React from 'react'
import '../../pages/PlayQuizz/PlayQuestion.css'

const QuizzInputCheckbox = ({questions,setReponse,reponse,disabled}) => {


    const handleCheckboxChange = (event) => {
        // On récupère le nom de la case à cocher qui a déclenché l'événement
        const { name } = event.target; 
        setReponse((prevCheckedItems) =>
            // On vérifie si le nom de la case à cocher est déjà présent dans le tableau des éléments cochés
            prevCheckedItems.includes(name) 
                // Si oui, on retire le nom de la case à cocher du tableau en utilisant la méthode filter
                ? prevCheckedItems.filter((item) => item !== name) 
                // Si non, on ajoute le nom de la case à cocher dans le tableau en utilisant l'opérateur spread
                : [...prevCheckedItems, name] 
        );
      };

    const lettersProposition = ['A', 'B', 'C', 'D'];

    return (
        <>{
            questions.map((question,index) =>( 
                    <section key={index} className="question__section">
                        <div className='letter_answers'>{lettersProposition[index]}</div>
                        <input 
                            type="checkbox"
                            name={question.libelle}  
                            checked={reponse.includes(question.libelle)}
                            onChange={handleCheckboxChange}
                            disabled={disabled}
                        />
                        <label>{question.libelle}</label>
                    </section>
                ) 
            )
        }</>
        )
    
}

export default QuizzInputCheckbox