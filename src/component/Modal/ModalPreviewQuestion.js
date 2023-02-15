import React from 'react'
import './ModalPreviewQuestion.css'
import { ImCross } from 'react-icons/im';



const ModalPreviewQuestion = ({Question, HandlePreviewQuestion}) => {
    return (
    <div className='modal__preview'>
        <ImCross className='cross_creation_quizz' role='button' onClick={()=>{HandlePreviewQuestion()}}/>
        <div className='preview__frame__answer'>
            <h2>{Question.libelle}</h2>
                <div className='preview__image'>insérer ici si image</div>
                {Question.type==="num"&&<div className='preview__answer'>
                        <>
                            <span>{"55"}</span>
                            <input 
                                type="range" 
                                min="0" max="100" 
                                step='1'
                                disabled
                            />
                        </> 
                </div>}
                {Question.type==="qcm"&&<div className='preview__answer'>
                    <>{
                        Question.reponses.map((val,index) =>( 
                                <section key={index}>
                                    <input 
                                        type="checkbox"  
                                        checked={val.isCorrect ? true : false}
                                        disabled
                                    />
                                    <label>{val.libelle}</label>
                                </section>
                            ) 
                        )
                    }</>
                </div>}
                {Question.type==="qcu"&&<div className='preview__answer'>
                    <>{ 
                        Question.reponses.map((question, index) => (
                            <section key={index}>
                                <input 
                                    type="radio" 
                                    id={question._id} 
                                    name="qcu"
                                    checked= {question.isCorrect === true} 
                                    disabled
                                />
                                <label>{question.libelle}</label>
                            </section>
                        ))

                    }</>
                </div>}

        </div>
    </div>
  )
}

export default ModalPreviewQuestion
/*

            <div className='preview__answer'>
                {Question.question_type === 'num' ? (
                    <>
                        <span>{rangeValue}</span>
                        <input 
                            type="range" 
                            value={rangeValue} 
                            min="0" max="100" 
                            step='1'
                            onChange={e=>setRangeValue(e.target.value)} 
                        />
                    </> 
                )
                : (
                       Question.reponses.map((val) =>  {
                            return ( 
                        
                                    <section>
                                        <input type="checkbox" key={val.libelle} checked={val.isCorrect ? true : false}></input>
                                        <label>{val.libelle}</label>
                                    </section>

                            ) 
                        })
                )
                }
            </div>
 
 */