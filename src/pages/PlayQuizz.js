import React,{ useEffect,useState,useMemo  } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams,useNavigate } from 'react-router-dom';
import PlayQuestion from "./PlayQuestion";
import './PlayQuizz.css'
const PlayQuizz = () => {

    const [quizzData,setQuizzData]=useState([]);
    const [index, setIndex] = useState(0);
    const [questionsReponses,setQuestionsReponses]=useState([])

    //mémorise le tableau de composants enfants
    //utilisé pour mémoriser une valeur de retour calculée à partir de props,
    //qui ne doit être recalculée que lorsque les props changent.
    const components = useMemo(
        () =>
          quizzData.questions?.map((element) => (
            <PlayQuestion
              key={element}
              question_id={element}
              questionsReponses={questionsReponses}
              setQuestionsReponses={setQuestionsReponses}
            />
          )),
        [quizzData.questions, questionsReponses, setQuestionsReponses]
    );

    const [loader,setLoader] = useState(false)

    //Utilisation de la fonction useNavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();
    //Recuperation de l'id dans l'url
    const { id } = useParams();

    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    //Permet de passer à la question suivante
    const handleNext = (e) => {
        e.preventDefault();
        if(index<components.length-1){
            setIndex((prevIndex) => (prevIndex + 1));
        }
    };

    //Permet de passer à la question précédente
    const handlePrev = (e) => {
        e.preventDefault();
        if(index!==0){
            setIndex((prevIndex) => (prevIndex - 1));
        }

    };
    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuizz = async () => {
                try {
                    const response = await axiosPrivate.get(`/quizz/${id}`);
                    setQuizzData(response.data)
                    setLoader(true);
                } catch (err) {
                    console.log(err.response.status);
                    //Si l'id n'existe pas redirection vers la page Error 404
                    if(err.response.status===404){
                        navigate('/missing')
                    }
                }
            }
    
            fetchQuizz();
        }
    }, [id,navigate,axiosPrivate])

    

    return (
        <>{loader===true?
            (<div className="play_quizz">
                <div className='play_quizz_title'>
                        <h2>{quizzData.name}</h2>
                    
                </div>

                <div>
                    {components[index]}
                </div>
                <input type="submit" value="Prev" onClick={handlePrev}  disabled={index === 0}/>
                <input type="submit" value="Next" onClick={handleNext}  disabled={index === components.length - 1}/>
            </div>):(
                <div  className="dot-flashing"></div>
            )
        }</>
        
    )
}

export default PlayQuizz