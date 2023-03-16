import React from 'react'

const QuizzInputRadio = ({questions,name,setReponse,reponse,disabled}) => {

    const onChangeRadio = (value)=>{
        let reponse = [];
        reponse.push(value);
        setReponse(reponse);
    }

    const lettersProposition = ['A', 'B', 'C', 'D'];


    return (
        
        <>{ 
            questions.map((question, index) => (
                <section key={index} className="question__section">
                    <div className='letter_answers'>{lettersProposition[index]}</div>
                    <input 
                        type="radio" 
                        id={question._id} 
                        name={name}
                        checked={reponse.includes(question.libelle)}
                        onChange={()=>onChangeRadio(question.libelle)}
                        disabled={disabled}
                    />
                    <label>{question.libelle}</label>
                </section>
            ))

        }</>
        
    )
}

export default QuizzInputRadio