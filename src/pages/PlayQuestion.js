import React,{useEffect,useState,memo} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import QuizzInputRadio from '../component/quizzInput/QuizzInputRadio';
import QuizzInputCheckbox from '../component/quizzInput/QuizzInputCheckbox';
import { useParams } from 'react-router-dom';
const PlayQuestion = memo(({question_id,questionsReponses,setQuestionsReponses}) => {
    //Stockage des données de la question récupere via la BD
    const [qstData,setQstData]=useState({});
    //Loader
    const [loader,setLoader]=useState(false);

    //Stockage du reponse du participant
    const[reponse,setReponse]=useState([])

    //Recuperation de l'id dans l'url
    const { id } = useParams();



    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(question_id!==undefined){
            const fetchQuizz = async () => {
                try {
                    const response = await axiosPrivate.get(`/question/${question_id}`);
                    setQstData(response.data)
                    setLoader(true)
                    

                } catch (err) {
                    console.log(err.response.status)
                }
            }
            fetchQuizz();
        }
    }, [question_id,axiosPrivate])
    
    //Au moment du render recupere les données et met a jour la reponse choisi
    useEffect(()=>{
        const currentQst = questionsReponses.find(question => question.id === question_id);
        if(currentQst){
            setReponse(currentQst.reponse)
        }
    },[])

    //Met dans les reponses des question du quizz les propositions que l'utilisateur a choisi
    useEffect(()=>{
        setQuestionsReponses(currentQuestionsReponses => {
            let qst =currentQuestionsReponses.filter(question => question.id!==question_id);
            qst.push({id:question_id, reponse : reponse});
            //Stoque dans le local storage la reponse du candidat pour le quizz;
            localStorage.setItem(`quizzReponse${id}`,JSON.stringify({quizz_id:id,reponse:qst}))
            return qst;
            
        });
    },[reponse,setQuestionsReponses,question_id,id]);

  
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
                    />
                }
                {
                    qstData.type==="qcm"&&
                    <QuizzInputCheckbox
                        questions={qstData.reponses}
                        setReponse={setReponse}
                        reponse={reponse}
                    />
                }

            </div>):(
                <div  className="dot-flashing"></div>
            )
        }</>
    )
});

export default PlayQuestion