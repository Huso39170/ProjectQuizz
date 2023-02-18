import React,{useState} from 'react'
import './ModalSessionParameter.css'
import InputRadioComp from '../Input/InputRadioComp'
import InputComp
 from '../Input/InputComp'
const ModalSessionParameter = ({modal,toggleModal}) => {
    const [quizzDeroulementValue, setquizzDeroulementValue] = useState('')
    const [quizzTimerValue, setquizzTimerValue] = useState('')
    
    //Initialisation des differents elements des boutons "radio"
    const values =[
        {
            divClassName:"radio",
            value :"timer",
            libelle: "Timer"

        },
        {
            divClassName:"radio",
            value :"button",
            libelle: "Boutton"
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
        console.log(quizzDeroulementValue)
        console.log(quizzTimerValue)
    }
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