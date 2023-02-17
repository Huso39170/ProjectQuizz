import React,{useRef,useEffect, useState} from 'react'
import "./Header.css"
import {useNavigate} from 'react-router-dom';
import api from '../../api/quizz'

const Navbar = ({isUserLoged,toggleModal}) => {
	const [scrollable,setScrollable]=useState(true);

	const uncheckInputRef = useRef();
	//Si l'utilisateur clique nimporte ou sur le menu en mode mobile on eneleve le menu
	const uncheckInput = () =>{	
		uncheckInputRef.current.checked=false;
		setScrollable(true);
	}

	const handleDisconnect = async(e)=>{
		e.preventDefault();
		try{
            //Requete post pour envoyer les données du nouvelle utilisateur dans la BD
            const response = await api.post(`/auth/logout`);
			if(response){
				window.location.href="/";
			}
        } catch (err){
            //Erreur affichée dans la console
            console.log(err.response.data);
        }
	}

	useEffect(() => {
		if(scrollable===false){
			document.getElementById("root").classList.add("disable-scroll")
		}else{
			document.getElementById("root").classList.remove("disable-scroll")
		}
	  }, [scrollable]);

	//Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
	const navigate = useNavigate();
	return (
			<div className="nav">
				<input type="checkbox" id="nav-check" ref={uncheckInputRef}/>
				<div className="nav-header">
				<div className="nav-title" onClick={()=>{navigate("/")}}>
					Quizzeo
				</div>
				</div>
				<div className="nav-btn" onClick={()=>{setScrollable(!scrollable)}}>
				<label htmlFor="nav-check">
					<span></span>
					<span></span>
					<span></span>
				</label>
				</div>

				<div className="nav-links" onClick={uncheckInput}>
					{isUserLoged?(<>
						<a href=" " onClick={e=> {e.preventDefault();navigate("/mesquizz") }} >Mes Quiz</a>
						<a href=" " onClick={e=> {e.preventDefault();navigate("/mesquizz/question") }} >Mes Questions</a>
						<a href=" " onClick={e=> {e.preventDefault();navigate("/moncompte ") }}>Mon Compte</a>
						<a href=" " onClick={handleDisconnect}>Déconnexion</a>

					</>):(
						<a href=" " onClick={e=> {e.preventDefault(); toggleModal(true)}}>Connexion</a>
					)}
				</div>
			</div>
	)
}

export default Navbar