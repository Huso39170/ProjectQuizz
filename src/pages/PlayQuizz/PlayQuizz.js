import React,{ useEffect,useState,useMemo  } from "react"
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
              key={element._id}
              qstData={element}
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

    
    //Permet de finir le quizz
    const handleFinsih = (e) => {
        const getLocal = JSON.parse(localStorage.getItem(`quizzReponse${id}`))
        if(getLocal!==null){
            localStorage.removeItem(`quizzReponse${id}`)
        }
        console.log(questionsReponses);
        navigate('/play/end')
    };

    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuizz = async () => {

                setQuizzData({_id: '63f0db555782f0bbf9675f2a', name: 'test', description: 'dsds', questions: [{_id: '63f0db605782f0bbf9675f2f',                                                                 
                                                                                                                    type: 'qcm',
                                                                                                                    tags:[],
                                                                                                                    libelle: 'Question 1',
                                                                                                                    reponses:[
                                                                                                                        {libelle: '1', isCorrect: true, _id: '63f0db6b5782f0bbf9675f4c'},
                                                                                                                        {libelle: '2', isCorrect: false, _id: '63f0db6b5782f0bbf9675f4d'},
                                                                                                                        {libelle: '3', isCorrect: true, _id: '63f0db6b5782f0bbf9675f4e'}
                                                                                                                    ],
                                                                                                                    __v:0
                                                                                                                },
                                                                                                                {
                                                                                                                    _id:'63f0e5480e25fe2fbd610b2f',                                                                 
                                                                                                                    type: 'qcu',
                                                                                                                    tags:[],
                                                                                                                    libelle: 'Question 2',
                                                                                                                    reponses:[
                                                                                                                        {libelle: '1', isCorrect: false, _id: '63f0e5480e25fe2fbd610b30'},
                                                                                                                        {libelle: '2', isCorrect: true, _id: '63f0e5480e25fe2fbd610b31'},
                                                                                                                        {libelle: '3', isCorrect: false, _id: '63f0e5480e25fe2fbd610b32'}
                                                                                                                    ],
                                                                                                                    __v:0
                                                                                                                }], __v: 0})
                const getLocal = JSON.parse(localStorage.getItem(`quizzReponse${id}`))
                if(getLocal!==null){
                    setQuestionsReponses(getLocal.reponse)
                }
                setLoader(true);
            }
    
            fetchQuizz();
        }
    }, [id])



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
                {
                    index < components.length - 1?(
                        <input type="submit" value="Next" onClick={handleNext} />
                    ):(
                        <input type="submit" value="Finish" onClick={handleFinsih} />
                    )
                }
                
            </div>):(
                <div  className="dot-flashing"></div>
            )
        }</>
        
    )
}

export default PlayQuizz