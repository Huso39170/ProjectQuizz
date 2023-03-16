import React, {useEffect, useState} from 'react'
import './ModalSubLog.css'
import InputComp from '../Input/InputComp'
import useAuth from '../../hooks/useAuth'
import useLogin from '../../hooks/useLogin'
import useSignIn from '../../hooks/useSignIn'

const ModalSubLog = ({modal,toggleModal,isLoginClicked}) => {


        //Initialisation du context auth pour l'authentification
    const {persist,setPersist } = useAuth();

    //Initialisation des champs
    const [userEmailValue, setUserEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordAgainValue, setPasswordAgainValue] = useState('')
    const [SubCode, setSubCode] = useState('')
    const [isLogin,setIsLogin]=useState('');

    const [errors,setErrors]=useState('');

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    
    //Met à 0 tout les champs 
    const resetModal =  () =>{
        setUserEmailValue('')
        setPasswordValue('')
        setPasswordAgainValue('')
        setSubCode('')
        setErrors('')
    }


    //Initialisation du hook pour la connexion
    const login = useLogin(resetModal,toggleModal,setErrors);

    //Initalisation du hook pour l'inscription
    const signin = useSignIn(setIsLogin,setErrors);



    useEffect(() => {
        setIsLogin(isLoginClicked)
    }, [isLoginClicked]);

    useEffect(() => {
        setErrors('')
    }, [userEmailValue,passwordValue,passwordAgainValue,SubCode]);

    //Permet de switcher entre la connexion et l'inscription et empeche la page de rafraichir
    const switchLog = (e,log)=>{
        e.preventDefault();
        setIsLogin(log);
    }   


    //Fonction pour l'inscription
    const handleSub = async (e) =>{
        e.preventDefault();

        if(passwordValue!==passwordAgainValue){
            setErrors("Mots de passes differents")
            return;
        }
        //Création d'un objet newIser dans lequel va être inserer toute les données correspondant au differant champs
        let newUser={}

        newUser = {email: userEmailValue ,
                    password : passwordValue };

        signin(newUser)

    }

    //Fonction pour l'inscription
    const handleLog = async (e) =>{
        e.preventDefault();
        //Création d'un objet newIser dans lequel va être inserer toute les données correspondant au differant champs
        let userInfo={}
        
        userInfo = {email: userEmailValue ,
                    password : passwordValue };

        login(userInfo);

    }


    //Stock dans le local storage si l'utilisateur veux rester connecté ou non
    useEffect(()=>{
        localStorage.setItem("persist",persist)
    },[persist])

    const togglePersist = () => {
        setPersist(prev => !prev);
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
                    <div className='form_error'>
                        {errors}
                    </div>
                    <form className='LogSub-form' onSubmit={(e) => e.preventDefault()}>
                        <InputComp 
                            placeholder={"Nom d'utilisateur"}
                            setValue={setUserEmailValue}
                            modalValue={userEmailValue}
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
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor='persist'>Rester connecté?</label>

                        <div className="content">
                            <div className="pass-link"><a href=" ">Mot de passe oublié ?</a></div>
                        </div>
                        <div className="LogSub-field">
                            <input type="submit" value="Connexion" onClick={handleLog}/>
                        </div>
                        <div className="signup-link">
                            Toujours pas inscrit ? <a href=" " onClick={(e)=>{switchLog(e,false)}}>S'inscrire </a>
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
                    <div className='form_error'>
                        {errors}
                    </div>

                    <form className='LogSub-form' onSubmit={(e) => e.preventDefault()}>
                        <InputComp 
                            placeholder={"Email "}
                            setValue={setUserEmailValue}
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
                            <input type="submit" value="Inscription" onClick={handleSub}/>
                        </div>
                        <div className="signup-link">
                            Vous possédez déja un compte ? <a href=" " onClick={(e)=>{switchLog(e,true)}}>Connexion </a>
                        </div>
                    </form>
                </div>
            </div>
        )}

        </>
    )
}

export default ModalSubLog
