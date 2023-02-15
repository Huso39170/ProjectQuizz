import React from 'react'
import './ModalPreviewQuestion.css'
import { ImCross } from 'react-icons/im';
import { useState } from 'react'


const ModalPreviewQuestion = (props) => {

    const [rangeValue, setRangeValue] = useState(props.Question.reponses);

    return (
    <div className='modal__preview'>
        <ImCross className='cross_creation_quizz' role='button' onClick={()=>{props.HandlePreviewQuestion()}}/>
        <div className='preview__frame__answer'>
            <h2>{props.Question.libelle}</h2>
            <div className='preview__image'>insérer ici si image</div>
            <div className='preview__answer'>
                {props.Question.question_type === 'scale' ? (
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
                       props.Question.reponses.map((val) =>  {
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
        </div>
    </div>
  )
}

export default ModalPreviewQuestion
