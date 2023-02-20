import React from 'react'

const QuizzInputCheckbox = ({questions,setReponse,reponse}) => {


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

    return (
        <div>
        <>{
            questions.map((question,index) =>( 
                    <section key={index}>
                        <input 
                            type="checkbox"
                            name={question.libelle}  
                            checked={reponse.includes(question.libelle)}
                            onChange={handleCheckboxChange}
                        />
                        <label>{question.libelle}</label>
                    </section>
                ) 
            )
        }</>
        </div>)
    
}

export default QuizzInputCheckbox