import React,{useState,useEffect} from 'react'
import './ModalSessionParameter.css'
import InputRadioComp from '../Input/InputRadioComp'
import InputComp from '../Input/InputComp'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
const ModalSessionParameter = ({modal,toggleModal,socket,quizz_id}) => {
    const [quizzDeroulementValue, setquizzDeroulementValue] = useState('')
    const [quizzTimerValue, setquizzTimerValue] = useState('')
    
    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();


	const {auth} = useAuth();

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


    const resetModal =  () =>{
        setquizzDeroulementValue('')
        setquizzTimerValue('')
    }

    const handleLancement =()=>{
        socket.emit("start_quizz",{accessToken:auth.accessToken,quizz_id:quizz_id})
    }

    useEffect(() => {
        socket.on("quizz_started", (data) => {
            toggleModal();
            resetModal();
            navigate(`/play/admin/${data.quizz_link}`)
        });
      }, [socket]);

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
                        <form className='Session_param-form' onSubmit={(e) => e.preventDefault()}>
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
                        
                            <div className="Session_param-field">
                                <input type="submit" value="Lancer" onClick={handleLancement}/>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalSessionParameter