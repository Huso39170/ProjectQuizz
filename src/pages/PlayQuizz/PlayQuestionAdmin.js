import React,{useState,memo} from 'react'
import { useParams } from 'react-router-dom';
const PlayQuestion = memo(({qstData}) => {
    //Stockage des données de la question récupere via la BD
   // const [qstData,setQstData]=useState({});
    //Loader
    const [loader]=useState(true);


    //Recuperation de l'id dans l'url
    const { id } = useParams();



  
    return (
        <>{loader===true?
            (<div>
                {qstData.libelle}
                {
                    qstData.type==="qcu"&&
                    <>{ 
                        qstData.reponses.map((val, index) => (
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
                }
                {
                    qstData.type==="qcm"&&
                    <>{
                        qstData.reponses.map((val,index) =>( 
                            <section key={index}> 
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

            </div>):(
                <div  className="dot-flashing"></div>
            )
        }</>
    )
});

export default PlayQuestion