import React, {useState} from 'react'
import './ModalSubLog.css'
import InputSubLog from '../Input/InputSubLog'



const ModalSubLog = ({modal,toggleModal,isLogin}) => {
   // const [erreurs, setErreurs] = useState([])
    
    const [userNameValue, setUserNameValue] = useState('')
    const [userEmailValue, setuserEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordAgainValue, setPasswordAgainValue] = useState('')
    const [SubCode, setSubCode] = useState('')


    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const resetModal =  () =>{
        setUserNameValue('')
        setuserEmailValue('')
        setPasswordValue('')
        setPasswordAgainValue('')
        setSubCode('')
    }

    return (
        <>
        {modal && isLogin &&(
            <div className="modal">
                <div onClick={()=> {toggleModal();resetModal();}} className="overlay"></div>
                <div className="modal-content">
                    <h2 className='modal-title'>Connexion</h2>
                    <button className="close-modal" onClick={()=> {toggleModal();resetModal();}}>
                        X
                    </button>
                    <form className='LogSub-form' onSubmit={(e) => e.preventDefault()}>
                        <InputSubLog 
                            placeholder={"Nom d'utilisateur "}
                            setValue={setUserNameValue}
                            modalValue={userNameValue}
                            inputType={"text"}
                            required={true}
                            erreur={""}
                        />
                        <InputSubLog
                            placeholder={"Mot de passe"}
                            setValue={setPasswordValue}
                            modalValue={passwordValue}
                            inputType={"password"}
                            required={true}
                            erreur={""}
                        />

                        <div className="content">
                            <div className="pass-link"><a href=" ">Mot de passe oublié ?</a></div>
                        </div>
                        <div className="LogSub-field">
                            <input type="submit" value="Connexion"/>
                        </div>
                        <div className="signup-link">
                            Toujours pas inscrit ? <a href=" ">S'inscrire </a>
                        </div>
                    </form>
                </div>
            </div>
        )}
        {modal && !isLogin &&(
            <div className="modal">
                <div onClick={()=> {toggleModal();resetModal();}} className="overlay"></div>
                <div className="modal-content">
                    <h2 className='modal-title'>Inscription</h2>
                    <button className="close-modal" onClick={()=> {toggleModal();resetModal();}}>
                        X
                    </button>
                    <form className='LogSub-form' onSubmit={(e) => e.preventDefault()}>
                        <InputSubLog 
                            placeholder={"Nom d'utilisateur "}
                            setValue={setUserNameValue}
                            inputType={"text"}
                            modalValue={userNameValue}
                            required={true}
                            erreur={""}
                        />
                        <InputSubLog 
                            placeholder={"Email "}
                            setValue={setuserEmailValue}
                            inputType={"email"}
                            modalValue={userEmailValue}
                            required={true}
                            erreur={""}
                        />
                        <InputSubLog
                            placeholder={"Mot de passe"}
                            setValue={setPasswordValue}
                            modalValue={passwordValue}
                            inputType={"password"}
                            required={true}
                            erreur={""}
                        />
                        <InputSubLog
                            placeholder={"Confirmer le mot de passe"}
                            setValue={setPasswordAgainValue}
                            modalValue={passwordAgainValue}
                            inputType={"password"}
                            required={true}
                            erreur={""}
                        />

                        <InputSubLog 
                            placeholder={"Code d'inscritpion"}
                            setValue={setSubCode}
                            modalValue={SubCode}
                            required={true}
                            erreur={""}
                        />

                        <div className="LogSub-field">
                            <input type="submit" value="Inscription"/>
                        </div>
                        <div className="signup-link">
                            Vous possedez déja un compte ? <a href=" ">Connexion </a>
                        </div>
                    </form>
                </div>
            </div>
        )}

        </>
    )
}

export default ModalSubLog

/*

*/