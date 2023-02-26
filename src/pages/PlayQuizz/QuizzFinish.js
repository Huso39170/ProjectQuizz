import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom'

const QuizzFinish = () => {

    const [counter, setCounter] = useState(5);

    //Utilisation de la fonction useNavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if(counter===0){
            navigate("/");
        }
        return () => clearInterval(timer);
    }, [counter,navigate]);



    return (
        <div>
            Merci d'avoir complété le quizz <br></br>
            Redirection vers la <a href=' ' onClick={(e)=>{e.preventDefault();navigate("/")}}>page d'acceuil</a> dans : {counter}
        </div>
    )
}

export default QuizzFinish