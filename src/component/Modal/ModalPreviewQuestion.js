import './ModalPreviewQuestion.css'
import { ImCross } from 'react-icons/im';


const ModalPreviewQuestion = (props) => {


    return (
    <div className='modal__preview'>
        <ImCross className='cross_modal_preview' role='button' onClick={()=>{props.HandlePreviewQuestion()}}/>
        <div className='circle_frame_preview'></div>
            <h2>{props.Question.libelle}</h2>
                
                {props.Question.type==="num"&&<div className='preview__answer'>
                        <div> 
                            <span>{'55'}</span> 
                            <input 
                                type="range" 
                                min="0" max="100" 
                                step='1'
                                disabled
                            />
                        </div>
                </div>
                }
                {props.Question.type==="qcm"&&<div className='preview__answer'>
                    <>{
                        props.Question.reponses.map((val,index) =>( 
                                <section key={index}> 
                                        
                                        <input 
                                            type="checkbox"  
                                            id={index}
                                            checked={val.isCorrect ? true : false}
                                            disabled
                                        />
                                    
                                        <label htmlFor={index}>{val.libelle}</label>
                                    
                                </section>
                            ) 
                        )
                    }</>
                </div>
                }
                {props.Question.type==="qcu"&&<div className='preview__answer'>
                    <>{ 
                        props.Question.reponses.map((val, index) => (
                            <section key={index}>
                                <input 
                                    type="radio" 
                                    id={index} 
                                    name="qcu"
                                    checked= {val.isCorrect === true} 
                                    disabled
                                />
                                <label htmlFor={index}>{val.libelle}</label>
                            </section>
                        ))

                    }</>
                </div>
                }

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
 
 */