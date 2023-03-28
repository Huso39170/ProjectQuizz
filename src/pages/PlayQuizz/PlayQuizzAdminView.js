import React,{ useEffect,useState,useMemo  } from "react"
import { useParams,useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import useSocket from '../../hooks/useSocket';
import useRefreshToken from '../../hooks/useRefreshToken';
import PlayQuestionAdmin from "./PlayQuestionAdmin";
import './PlayQuizzAdminView.css'
import { BsFillPersonFill, BsPersonCheckFill, BsStopwatchFill, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import ModalQrCode from "../../component/Modal/ModalQrCode";

const PlayQuizzAdminView = () => {
	const {auth} = useAuth();
    const {quizzCode} = useParams();
    const {socket} = useSocket();
    const [nbResp,setNbResp]= useState(0);
    const [nbRespCurr,setNbRespCurr]= useState(0);
    const [currResponse,setCurrResponse]=useState({});
    const [loader,setLoader]=useState(false)
    const [index, setIndex] = useState(0);
    const [quizzData,setQuizzData]=useState([]);
    const [quizzType,setQuizzType]=useState('');
    const [counter,setCounter]=useState('')
    const [timer,setTimer]=useState(0);
    const [nbUser,setNbUser]=useState(0);
    const [startCounter,setStartCounter]=useState(false);
    const [email] = useState(localStorage.getItem("user_email")||'')

    //Gestion du modal
    const[modal,setModal]= useState(false);
    const toggleModal = () =>{
        //Inverse le bollean de modal
        setModal(!modal);
    }


    //mémorise le tableau de composants enfants
    //utilisé pour mémoriser une valeur de retour calculée à partir de props,
    //qui ne doit être recalculée que lorsque les props changent.
    const components = useMemo(() =>
          quizzData.questions?.map((element) => (
            <PlayQuestionAdmin
              key={element._id}
              qstData={element}
              currResponse = {currResponse}
            />
          )),
        [quizzData.questions, currResponse]
    );

    
    const refresh = useRefreshToken();
    
    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    //Permet de passer à la question suivante
    const handleNext = (e) => {
        e.preventDefault();
        if(index<components.length-1){
            setIndex((prevIndex) => (prevIndex + 1));
            setNbRespCurr(0);
            setCounter(timer);
            setCurrResponse({})
            socket.emit("give_next_question",{quizz_link:quizzCode,index:index+1})
        }

    };

    //Permet de passer à la question précédente
    const handlePrev = (e) => {
        e.preventDefault();
        if(index!==0){
            setIndex((prevIndex) => (prevIndex - 1));
        }
    };

    //Permet de mettre en ordre le nombre de reponse
    const countResponse =(data)=>{
        const nouveauCompteur = currResponse;
        data.forEach(reponse  => {
            if (!nouveauCompteur.hasOwnProperty(reponse)) {
                nouveauCompteur[reponse] = 1;
            } else {
                nouveauCompteur[reponse]++;
            }
        });

        setCurrResponse(nouveauCompteur)
    }
    
        

    //Mettre fin au quizz
    const  endQuizz = async () =>{
        await refresh();
        socket.emit("end_quizz",{quizz_link:quizzCode,accessToken:auth.accessToken})
    }


    useEffect(()=>{
        if(!loader){
            // Géstion de l'événement de connexion d'un administrateur à un quizz
            socket.emit("admin_joined",{quizz_link:quizzCode,email:email});
        }

        //Reception des données du quizz
        socket.off("send_quizz_data");
        socket.on("send_quizz_data",(data)=>{
            setQuizzData(data.quizz_data);
            setQuizzType(data.quizz_type);
            setNbResp(data.nb_response)
            setNbUser(data.nb_user)
            if(data.quizz_type==="profBtn" || data.quizz_type==="timer"){
                setIndex(data.index)
                countResponse(data.currResponse)
                setNbRespCurr(data.nbCurrResponse)

            }
            console.log(data)
            setLoader(true)
            

        });
        socket.off("quizz_not_exist_or_not_admin");
        socket.on("quizz_not_exist_or_not_admin",() => {
            navigate("/missing")
        });


        // Géstion de l'événement de fin d'un quizz
        socket.off("quizz_ended");
        socket.on("quizz_ended", () => {
            navigate('/play/end')
        
        });

        //Gestion de l'evenement de reception des nombres de reponses
        socket.off("nb_user_responses");
        socket.on("nb_user_responses",(data)=>{
            if(data.quizz_link===quizzCode){
                setNbResp(data.nb_response)
                console.log(data.nb_response)
            }
        })

        //Gestion de l'evenement de reception des nombres de reponses
        socket.off("user_responded");
        socket.on("user_responded",(data)=>{
            countResponse(data.response)
            setNbRespCurr((prev) => (prev + 1))
        })

        //Gestion de l'evenement de reception des nombres d'utilisateur dans la salle
        socket.off("user_join_or_left");
        socket.on("user_join_or_left",(data)=>{
            setNbUser(data.nb_user)
        })

        socket.off("give_timer");
        socket.on("give_timer",(data)=>{
            setCounter(parseInt(data.timer));
            setTimer(parseInt(data.timer));
        })

    },[socket,loader,navigate,quizzCode,currResponse])


    /*useEffect(()=>{
        return () => {
            socket.emit("end_quizz",{quizz_link:quizzCode,accessToken:auth.accessToken})
        }
    },[socket])*/

    useEffect(() => {
        if(startCounter){
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            socket.emit("set_timer",{quizz_link:quizzCode,timer:counter});
            return () => clearInterval(timer);
        }
    }, [counter,startCounter]);


    const listeProprietes = Object.keys(currResponse).map((key) =>
        <li key={key}>{key}: {currResponse[key]}</li>
    );


    return (
        <>{loader===true?
            (<div>
                <div className="adm__head">
                    <p className="adm__viewers" title="Participants"><BsFillPersonFill/>{nbUser}</p>
                    <button className="adm__codes" onClick={()=>{toggleModal()}}>Montrer le code</button>
                    <button className="adm__exit" onClick={endQuizz}>Arrêter</button>
                </div>
                
                {quizzType!=="participant"&&
                    <ul>{listeProprietes}</ul>
                }
                
                <div className="adm__control_section">
                    {quizzType==="participant"&&<p className="adm__users_question_finish" title="Participants ayant fini"><BsPersonCheckFill/>{nbResp}/{nbUser}</p>}
                    {quizzType!=="participant"&&(<p className="adm__users_question_finish" title="Participants ayant répondu"><BsPersonCheckFill/>{nbRespCurr}/{nbUser}</p>)}
                    { quizzType==="timer"&&
                        <>
                            <p className="adm__timer"><BsStopwatchFill/>{counter}</p>
                            {startCounter?
                                (
                                    <button className="adm__pause_play" onClick={()=>{setStartCounter((prev) => (!prev));}} ><BsFillPauseFill/></button>
                                )
                                :
                                (
                                    <button className="adm__pause_play" onClick={()=>{setStartCounter((prev) => (!prev));}} ><BsFillPlayFill/></button>
                                )
                            }
                        </>
                    }
                </div>
                
                <div>
                    {components[index]}
                </div>
                <p className="question__number">Question {index+1}/{components.length} </p>
                <div className="set_question__manage">
                    <input className="question__manage" type="submit" value="Prev" onClick={handlePrev}  disabled={index === 0 || quizzType!=="participant"}/>
                    <input className="question__manage" type="submit" value="Next" onClick={handleNext}  disabled={index === components.length - 1}/>
                </div>
                <ModalQrCode
                    modal={modal} 
                    toggleModal={toggleModal}  
                    qrCodeValue={"https://www.example.com"}
                    code={quizzCode}
                />
                
                
            </div>)
            :
            (
                <div  className="dot-flashing"></div>
            )
        }</>
    )
}

export default PlayQuizzAdminView