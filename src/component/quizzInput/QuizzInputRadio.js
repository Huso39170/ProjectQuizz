import React from 'react'

const QuizzInputRadio = ({questions,name,setReponse,reponse}) => {

    const onChangeRadio = (value)=>{
        let reponse = [];
        reponse.push(value);
        setReponse(reponse);
    }


    return (
        <div>
        <>{ 
            questions.map((question, index) => (
                <section key={index}>
                    <input 
                        type="radio" 
                        id={question._id} 
                        name={name}
                        checked={reponse.includes(question.libelle)}
                        onChange={()=>onChangeRadio(question.libelle)}
                    />
                    <label>{question.libelle}</label>
                </section>
            ))

        }</>
        </div>
    )
}

export default QuizzInputRadio