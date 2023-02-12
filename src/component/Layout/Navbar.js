import React,{useRef,useEffect, useState} from 'react'
import "./Header.css"
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
	const [scrollable,setScrollable]=useState(true);

	const uncheckInputRef = useRef();
	//Si l'utilisateur clique nimporte ou sur le menu en mode mobile on eneleve le menu
	const uncheckInput = () =>{	
		uncheckInputRef.current.checked=false;
		setScrollable(true);
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
					<a href=" " onClick={e=> {e.preventDefault();navigate("/mesquizz") }} className="MesQuizz_button">Mes Quizzs</a>
					<a href=" " onClick={e=> {e.preventDefault();navigate("/mesquizz/question") }} className="MesQuizz_button">Mes Questions</a>
				</div>
			</div>
	)
}

export default Navbar