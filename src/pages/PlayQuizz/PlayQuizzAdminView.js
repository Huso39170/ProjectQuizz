import React,{useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

const PlayQuizzAdminView = ({socket}) => {
	const {auth} = useAuth();
    const {quizzCode} = useParams();
    
    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    const endQuizz = () =>{
        socket.emit("end_quizz",{quizz_link:quizzCode})
    }

    useEffect(()=>{
        socket.emit("admin_joined",{accessToken:auth.accessToken,quizz_link:quizzCode})
        socket.on("check_admin_room", (data) => {
            if(!data.result){
                navigate("/missing")
            }
        });
        socket.on("quizz_ended", () => {
            navigate('/play/end')
        });
    },[socket])



    return (
        <div>
            <p>Code : {quizzCode}</p>
            <p>Nombre de reponse :</p>
            <button onClick={endQuizz}>Arreter le quizz</button>
        </div>
    )
}

export default PlayQuizzAdminView