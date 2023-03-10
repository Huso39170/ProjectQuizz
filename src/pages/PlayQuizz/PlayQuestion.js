import React,{useEffect,useState,memo} from 'react'
import QuizzInputRadio from '../../component/quizzInput/QuizzInputRadio';
import QuizzInputCheckbox from '../../component/quizzInput/QuizzInputCheckbox';
import { useParams } from 'react-router-dom';
const PlayQuestion = memo(({qstData,questionsReponses,setQuestionsReponses,quizz_id,disabled}) => {
    //Stockage des données de la question récupere via la BD
   // const [qstData,setQstData]=useState({});
    //Loader
    const [loader]=useState(true);

    //Stockage du reponse du participant
    const[reponse,setReponse]=useState([])

    //Recuperation de l'id dans l'url
    const { quizzCode } = useParams();


    useEffect(()=>{
        const currentQst = questionsReponses.find(question => question.id === qstData._id);
        if(currentQst){
            setReponse(currentQst.reponse)
        }
    },[])

    //Met dans les reponses des question du quizz les propositions que l'utilisateur a choisi
    useEffect(()=>{
        setQuestionsReponses(currentQuestionsReponses => {
            let qst =currentQuestionsReponses.filter(question => question.id!==qstData._id);
            qst.push({id:qstData._id, reponse : reponse, disabled:disabled});
            //Stoque dans le local storage la reponse du candidat pour le quizz;
            localStorage.setItem(`quizzReponse${quizzCode}`,JSON.stringify({quizz_id:quizz_id,reponse:qst}))
            return qst;
            
        });
    },[reponse,setQuestionsReponses,quizzCode,disabled]);

  
    return (
        <>{loader===true?
            (<div>
                {qstData.libelle}
                {
                    qstData.type==="qcu"&&
                    <QuizzInputRadio
                        questions={qstData.reponses}
                        name="qcu"
                        setReponse={setReponse}
                        reponse={reponse}
                        disabled={disabled}
                    />
                }
                {
                    qstData.type==="qcm"&&
                    <QuizzInputCheckbox
                        questions={qstData.reponses}
                        setReponse={setReponse}
                        reponse={reponse}
                        disabled={disabled}

                    />
                }

            </div>):(
                <div  className="dot-flashing"></div>
            )
        }</>
    )
});

export default PlayQuestion