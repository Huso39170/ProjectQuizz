import React,{useState,useEffect} from 'react'
import './ModalSessionParameter.css'
import InputRadioComp from '../Input/InputRadioComp'
import InputComp from '../Input/InputComp'
import { useNavigate } from 'react-router-dom'
import useSocket from '../../hooks/useSocket'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ModalSessionParameter = ({modal,toggleModal,quizz_id}) => {
    const [quizzDeroulementValue, setquizzDeroulementValue] = useState('');
    const [quizzTimerValue, setquizzTimerValue] = useState('');
    const [loader,setLoader]=useState(false)
    
    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    const {socket} = useSocket();

    //Initialisation des differents elements des boutons "radio"
    const values =[
        {
            divClassName:"radio",
            value :"timer",
            libelle: "Timer"

        },
        {
            divClassName:"radio",
            value :"profBtn",
            libelle: "Proffeseur qui passe"
        },
        {
            divClassName:"radio",
            value :"participant",
            libelle: "Participant qui passe"
        }
    ]

    //Mise à 0 du modal 
    const resetModal =  () =>{
        setquizzDeroulementValue('')
        setquizzTimerValue('')
    }

    //Gestion du lancement du quizz
    const  handleLancement = async ()=>{
        setLoader(true);
        const quizz_data=await fetchQuizz();
        if(quizzDeroulementValue==="timer"){
            socket.emit("start_quizz",{
                                        quizz_data:quizz_data,
                                        quizz_type:quizzDeroulementValue,
                                        timer:quizzTimerValue})
        }else{
            socket.emit("start_quizz",{
                                        quizz_data:quizz_data,
                                        quizz_type:quizzDeroulementValue})
        }
        
    }


    // La fonction asynchrone fetchQuizz récupère les données d'un quizz avec l'id spécifié et les questions associées
    const fetchQuizz = async () => {
        try {
            const response = await axiosPrivate.get(`/quizz/${quizz_id}`);
            const quizz = response.data; // Récupère les données du quizz depuis la réponse
            // Appelle la fonction asynchrone getQuestions pour récupérer les questions liées à ce quizz
            const questions = await getQuestions(quizz.questions);
            quizz.questions = questions; // Ajoute les questions récupérées à l'objet quizz
            return quizz; // Renvoie l'objet quizz complet
        } catch (error) {
            console.error(error);
        }
    }

    // La fonction asynchrone getQuestions récupère les données de plusieurs questions avec les IDs spécifiés
    const getQuestions = async (questions) => {
        let promises = questions.map(question_id => {
        return axiosPrivate.get(`/question/${question_id}`)
        .then(response => response.data)
        .catch(error => console.error(error));
        });
        return Promise.all(promises);
    }

    //Si le quizz est lancer avec succes on redirige l'utilisateur 
    //vers la page de gestion du quizz
    useEffect(() => {
        socket.on("quizz_started", (data) => {
            toggleModal();
            resetModal();
            navigate(`/play/admin/${data.quizz_link}`)
        });
      }, [socket,navigate,toggleModal]);

    return (
        <>
            {modal  &&(
                <div className="modal">
                    <div onClick={()=> {toggleModal();resetModal();}} className="overlay"></div>
                    <div className="modal-content">
                        <h2 className='modal-title'>Parametre de session</h2>
                        <button className="close-modal" onClick={()=> {toggleModal();resetModal();}}>
                            X
                        </button>
                        {loader===false?(<form className='Session_param-form' onSubmit={(e) => e.preventDefault()}>
                            <InputRadioComp
                                values={values}
                                className="radio_field"
                                legend={"Comment se déroule le quizz :"}
                                name={"radio_deroulement"}
                                modalValue={quizzDeroulementValue}
                                setValue={setquizzDeroulementValue}
                                erreur={""}
                            />
                            {quizzDeroulementValue==="timer" &&
                                <InputComp 
                                    placeholder={"Nombre de seconde"}
                                    setValue={setquizzTimerValue}
                                    modalValue={quizzTimerValue}
                                    inputType={"number"}
                                    required={true}
                                    erreur={""}
                                    className={'Session_param-field'}
                                />
                            } 
                            
                            {(quizzDeroulementValue==="timer"&& quizzTimerValue!=='')&&(
                                <div className="Session_param-field">
                                    <input type="submit" value="Lancer" onClick={handleLancement}/>
                                </div>)
                            }

                            {(quizzDeroulementValue!=="timer"&& quizzDeroulementValue!=='')&&(
                                <div className="Session_param-field">
                                    <input type="submit" value="Lancer" onClick={handleLancement}/>
                                </div>)
                            }

                        </form>):(
                            <>
                                <div>Initialisation du quizz veuillez patienter ...</div>
                                <div  className="dot-flashing"></div>
                            </>

                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalSessionParameter