import React,{useState,memo} from 'react'
import { useParams } from 'react-router-dom';
import './PlayQuestion.css'

const PlayQuestion = memo(({qstData, currResponse}) => {
    //Stockage des données de la question récupere via la BD
   // const [qstData,setQstData]=useState({});
    //Loader
    const [loader]=useState(true);


    //Recuperation de l'id dans l'url
    const { id } = useParams();

    const lettersProposition = ['A', 'B', 'C', 'D'];
  
    return (
        <>{loader===true?
            (<>
                <h2 className='question__libelle'>{qstData.libelle}</h2>
                
                <div className='question__answers'>
                    {
                        qstData.type==="qcu"&&
                        <>{ 
                            qstData.reponses.map((val, index) => (
                                <section className='question__section' key={index}>
                                <div className='letter_answers'>{lettersProposition[index]}</div>
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
                    }
                    {
                        qstData.type==="qcm"&&
                        <>{
                            qstData.reponses.map((val,index) =>( 
                                <section className='question__section' key={index}> 
                                <div className='letter_answers'>{lettersProposition[index]}</div>
                                    <input 
                                        type="checkbox"  
                                        id={index}
                                        checked={val.isCorrect ? true : false}
                                        disabled
                                    />
                                    <label htmlFor={index}>{val.libelle}</label>
                                </section>
                            ))
                        }</>

                    }
                </div>

            </>):(
                <div  className="dot-flashing"></div>
            )
        }</>
    )
});

export default PlayQuestion