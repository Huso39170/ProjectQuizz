import React, {useEffect, useState} from 'react'
import './ModalSubLog.css'
import InputComp from '../Input/InputComp'
import api from '../../api/quizz' 
import useAuth from '../../hooks/useAuth'

const ModalSubLog = ({modal,toggleModal,isLoginClicked}) => {
   // const [erreurs, setErreurs] = useState([])

   //Initialisation du context auth pour l'authentification
    const { setAuth,persist,setPersist } = useAuth();

    //Initialisation des champs
    const [userEmailValue, setUserEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordAgainValue, setPasswordAgainValue] = useState('')
    const [SubCode, setSubCode] = useState('')
    const [isLogin,setIsLogin]=useState('');


    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    useEffect(() => {
        setIsLogin(isLoginClicked)
    }, [isLoginClicked]);

    //Permet de switcher entre la connexion et l'inscription et empeche la page de rafraichir
    const switchLog = (e,log)=>{
        e.preventDefault();
        setIsLogin(log);
    }   

    //Met à 0 tout les champs 
    const resetModal =  () =>{
        setUserEmailValue('')
        setPasswordValue('')
        setPasswordAgainValue('')
        setSubCode('')
    }

    //Fonction pour l'inscription
    const handleSub = async (e) =>{
        e.preventDefault();
        //Création d'un objet newIser dans lequel va être inserer toute les données correspondant au differant champs
        let newUser={}

        newUser = {email: userEmailValue ,
                    password : passwordValue };

        try{
            //Requete post pour envoyer les données du nouvelle utilisateur dans la BD
            const response = await api.post(`/auth/register`, newUser);
            setIsLogin(true);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(err.response.data);
        }
    }

    //Fonction pour l'inscription
    const handleLog = async (e) =>{
        e.preventDefault();
        //Création d'un objet newIser dans lequel va être inserer toute les données correspondant au differant champs
        let userInfo={}

        userInfo = {email: userEmailValue ,
                    password : passwordValue };

        try{
            //Requete post pour envoyer les données du nouvelle utilisateur dans la BD
            const response = await api.post(`/auth`, 
                userInfo,
                {
                    withCredentials: true 
                }
            );
            StockToken(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(err.response.data);
        }
    }

    const StockToken = (data)=>{
        const accessToken = data.accessToken;
        const user = data.user;
        setAuth({user,accessToken})
        resetModal();
        toggleModal();

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
                        <label htmlFor='persist' >Rester connecté?</label>

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
