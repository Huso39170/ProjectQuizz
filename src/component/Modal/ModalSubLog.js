import React, {useState} from 'react'
import './ModalSubLog.css'
import InputComp from '../Input/InputComp'



const ModalSubLog = ({modal,toggleModal,isLoginClicked}) => {
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
        {modal && isLoginClicked &&(
            <div className="modal">
                <div onClick={()=> {toggleModal();resetModal();}} className="overlay"></div>
                <div className="modal-content">
                    <h2 className='modal-title'>Connexion</h2>
                    <button className="close-modal" onClick={()=> {toggleModal();resetModal();}}>
                        X
                    </button>
                    <form className='LogSub-form' onSubmit={(e) => e.preventDefault()}>
                        <InputComp 
                            placeholder={"Nom d'utilisateur"}
                            setValue={setUserNameValue}
                            modalValue={userNameValue}
                            inputType={"text"}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
                        />
                        <InputComp
                            placeholder={"Mot de passe"}
                            setValue={setPasswordValue}
                            modalValue={passwordValue}
                            inputType={"password"}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
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
        {modal && !isLoginClicked &&(
            <div className="modal">
                <div onClick={()=> {toggleModal();resetModal();}} className="overlay"></div>
                <div className="modal-content">
                    <h2 className='modal-title'>Inscription</h2>
                    <button className="close-modal" onClick={()=> {toggleModal();resetModal();}}>
                        X
                    </button>
                    <form className='LogSub-form' onSubmit={(e) => e.preventDefault()}>
                        <InputComp 
                            placeholder={"Nom d'utilisateur "}
                            setValue={setUserNameValue}
                            inputType={"text"}
                            modalValue={userNameValue}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
                        />
                        <InputComp 
                            placeholder={"Email "}
                            setValue={setuserEmailValue}
                            inputType={"email"}
                            modalValue={userEmailValue}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
                        />
                        <InputComp
                            placeholder={"Mot de passe"}
                            setValue={setPasswordValue}
                            modalValue={passwordValue}
                            inputType={"password"}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
                        />
                        <InputComp
                            placeholder={"Confirmer le mot de passe"}
                            setValue={setPasswordAgainValue}
                            modalValue={passwordAgainValue}
                            inputType={"password"}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
                        />

                        <InputComp 
                            placeholder={"Code d'inscritpion"}
                            setValue={setSubCode}
                            modalValue={SubCode}
                            required={true}
                            erreur={""}
                            className={'LogSub-field'}
                        />

                        <div className="LogSub-field">
                            <input type="submit" value="Inscription"/>
                        </div>
                        <div className="signup-link">
                            Vous possédez déja un compte ? <a href=" ">Connexion </a>
                        </div>
                    </form>
                </div>
            </div>
        )}

        </>
    )
}

export default ModalSubLog
