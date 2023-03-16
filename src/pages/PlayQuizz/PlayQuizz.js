import React,{ useEffect,useState,useMemo  } from "react"
import { useParams,useNavigate } from 'react-router-dom';
import PlayQuestion from "./PlayQuestion";
import useSocket from '../../hooks/useSocket'
import './PlayQuizz.css'
import { BsStopwatchFill } from 'react-icons/bs'

const PlayQuizz = () => {

    const [quizzData,setQuizzData]=useState([]);
    const [quizzType,setQuizzType]=useState('');
    const [index, setIndex] = useState(0);
    const [currIndex, setCurrIndex] = useState(0);
    const [nbQuestions,setNbQuestions]=useState(0);
    const [questionsReponses,setQuestionsReponses]=useState([])
    const [timer,setTimer]=useState('')
    const {socket} = useSocket();
    const [activateValidBtn,setActivateValidBtn]=useState(true)

    //mémorise le tableau de composants enfants
    //utilisé pour mémoriser une valeur de retour calculée à partir de props,
    //qui ne doit être recalculée que lorsque les props changent.
    const components = useMemo(() =>
          quizzData.questions?.map((element) => (
            <PlayQuestion
              key={element._id}
              qstData={element}
              questionsReponses={questionsReponses}
              setQuestionsReponses={setQuestionsReponses}
              quizz_id={quizzData._id}
              disabled={!activateValidBtn}
            />
          )),
        [quizzData, questionsReponses, setQuestionsReponses,activateValidBtn]
    );

    const [loader,setLoader] = useState(false)

    //Utilisation de la fonction useNavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();
    //Recuperation de l'id dans l'url
    const {quizzCode} = useParams();

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

    //Permet de transmettre à l'admin que l'on à repondu à la question
    const handleValid = () => {
        setActivateValidBtn(false)
        const currQst_response = questionsReponses.find(element => element.id === quizzData.questions[0]._id);
        socket.emit("responded",{quizz_link:quizzCode,response:currQst_response.reponse,question_with_response:currQst_response})
        
    };

    
    //Permet de finir le quizz
    const handleFinsih = () => {
        console.log(questionsReponses)
        if(quizzType==="participant"){
            socket.emit("send_response_finish",{questions_response:questionsReponses,quizz_link:quizzCode})
            socket.on("reponse_recieved",()=>{
                const getLocal = JSON.parse(localStorage.getItem(`quizzReponse${quizzCode}`))
                if(getLocal!==null){
                    localStorage.removeItem(`quizzReponse${quizzCode}`)
                }
                navigate('/play/end')
            })
        }else{
            const getLocal = JSON.parse(localStorage.getItem(`quizzReponse${quizzCode}`))
            if(getLocal!==null){
                localStorage.removeItem(`quizzReponse${quizzCode}`)
            }
            navigate('/play/end')
        }
    };

    //Get data from local storage
    const getDataLocal=(data)=>{
        const getLocal = JSON.parse(localStorage.getItem(`quizzReponse${quizzCode}`))
        if(getLocal!==null){
            setQuestionsReponses(getLocal.reponse)
            const currentQst = getLocal.reponse.find(question => question.id === data.questions[0]._id);
            if(currentQst){
                setActivateValidBtn(!currentQst.disabled)
            }
        }
        setLoader(true);
    }

    //Fonction qui s'execute au moment du rendue de la page permet de recuperer
    // les données du quizz via la socket
    useEffect(() => {
        // Géstion de l'événement de fin d'un quizz
        socket.off("quizz_ended");
        socket.on("quizz_ended", () => {;
            socket.emit("send_response_ended",{questions_response:questionsReponses,quizz_link:quizzCode})
            navigate('/play/end')
        });

        if(loader===false){
            socket.emit("join_quizz",{quizz_link:quizzCode})
        }

        socket.off("quizz_not_exist");
        socket.on("quizz_not_exist",() => {
            navigate("/missing")
        });

        
        socket.off("send_quizz_data");
        socket.on("send_quizz_data",(data)=>{
            console.log(data)
            setQuizzData(data.quizz_data);
            if(!loader){
                setQuizzType(data.quizz_type);
                getDataLocal(data.quizz_data);
            }

        });
        //This code first removes any existing "send_curr_question_and_data" event listeners using socket.off
        //and then defines a new event listener using socket.on. This ensures that there is only one event 
        //listener for "send_curr_question_and_data" defined at any given time.
        socket.off("send_curr_question_and_data");
        socket.on("send_curr_question_and_data",(data)=>{
            console.log(data)
            setQuizzData(data.quizz_data);
            setNbQuestions(data.nb_questions);
            setCurrIndex(data.index);
            if(!loader){
                setQuizzType(data.quizz_type);
                getDataLocal(data.quizz_data);
            }

        });

        socket.off("next_question");
        socket.on("next_question",(data)=>{
            console.log(data)
            setQuizzData(data.quizz_data);
            setActivateValidBtn(true)
            setCurrIndex(data.index)
            
        });

        socket.off("give_counter");
        socket.on("give_counter",(data)=>{
            setTimer(parseInt(data.timer));
        })

    
    }, [socket,loader,navigate,quizzCode])


    useEffect(()=>{
        return () => {
            socket.emit("leave_quizz",{quizz_link:quizzCode})
        }
    },[socket])

    useEffect(() => {
        if(timer===0){
            setActivateValidBtn(false)
        }
    }, [timer]);




    return (
        <>{loader===true?
            (<div className="play_quizz">
                <div className='play_quizz_title'>
                        <h2>{quizzData.name}</h2>
                    
                </div>

                    
                <div>
                    {components[index]}
                </div>
                    {
                    quizzType==="participant"&&
                        (<>
                            <p className="question__number">Question {index+1}/{components.length} </p>
                            
                            <div className="set_question__manage">
                                <input className="question__manage" type="submit" value="Précédent" onClick={handlePrev}  disabled={index === 0}/>
                                {
                                    index < components.length - 1?(
                                        <input className="question__manage" type="submit" value="Suivant" onClick={handleNext} />
                                    ):(
                                        <input className="question__manage" type="submit" value="Finir" onClick={handleFinsih} />
                                    )
                                }
                            </div>
                        </>)
                    }
                    {
                        quizzType==="profBtn"&&
                        (
                            <>  
                                <p className="question__number">Question {currIndex+1}/{nbQuestions} </p>
                                <div>
                                    {
                                        (currIndex+1)!==nbQuestions?
                                        (
                                            <input className="question__validate" type="submit" value="Valider" onClick={handleValid} disabled={!activateValidBtn}/>
                                        )
                                        :
                                        (
                                            <input className="question__validate" type="submit" value="Terminer" onClick={()=>{handleValid();handleFinsih();}} disabled={!activateValidBtn}/>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }

                    {
                        quizzType==="timer"&&
                        (
                            <>  
                                <p className="question__number">Question {currIndex+1}/{nbQuestions} </p>
                                { quizzType==="timer"&&<p className="question__timer"><BsStopwatchFill/>{timer}</p>}
                                
                                {
                                    (currIndex+1)!==nbQuestions?
                                    (
                                        <input className="question__validate" type="submit" value="Valider" onClick={handleValid} disabled={!activateValidBtn}/>
                                    )
                                    :
                                    (
                                        <>
                                        <input  className="question__validate" type="submit" value="Valider" onClick={()=>{handleValid()}} disabled={!activateValidBtn}/>
                                        <input  className="question__validate" type="submit" value="Terminer" onClick={()=>{handleFinsih();}} disabled={activateValidBtn}/>
                                        </>
                                    )
                                        
                                }
                            </>
                        )
                    }   
                    
            </div>)     
            :
            (
                <div  className="dot-flashing"></div>
            )
            }</>
        
    )
}

export default PlayQuizz