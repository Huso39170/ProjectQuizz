import React from 'react'
import './ModalPreviewQuestion.css'
import { ImCross } from 'react-icons/im';
import { useState } from 'react'

const ModalPreviewQuestion = ({Question, HandlePreviewQuestion}) => {

    

    return (
    <div className='modal__preview'>
        <ImCross className='cross_creation_quizz' role='button' onClick={()=>{HandlePreviewQuestion()}}/>
        <div className='preview__frame__answer'>
            <h2>{Question.libelle}</h2>
            <div className='preview__image'>insérer ici si image</div>
            <div className='preview__answer'>
                {Question.question_type === 'scale' ? (
                    <>
                        
                        <input
                            
                            type="range" 
                            
                            min="0" 
                            max="1000" 
                           
                            
                        />
                    </> 
                )
                : (
                       Question.reponses.map((val) => 
                            <button key={val.libelle}>{val.libelle}</button>
                       )
                )
                }
            </div>
        </div>
    </div>
  )
}

export default ModalPreviewQuestion
