import React, {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import api from '../api/quizz' 
import ModalImportQuestion from '../component/Modal/ModalImportQuestion';
const QuizzEtQuestion = () => {
    //Initialisation 
    const [quizzNameValue, setQuizzNameValue] = useState('')
    const [quizzQuestions,setQuizzQuestions]=useState([])
    
    //Utilisation de la fonction useNavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();
    //Recuperation de l'id dans l'url
    const { id } = useParams();

    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuizz = async () => {
                try {
                    const response = await api.get(`/quizz/${id}`);
                    setQuizzData(response.data)
                } catch (err) {
                    console.log(err.response.status);
                    //Si l'id n'existe pas redirection vers la page Error 404
                    if(err.response.status===404){
                        navigate('/missing')
                    }
                }
            }
    
            fetchQuizz();
        }
    }, [id,navigate])


    const setQuizzData = (data) => {
        setQuizzNameValue(data.name)
    }


    //Gestion du modal
    const[modal,setModal]= useState(false);
    const toggleModal = () =>{
        //Inverse le bollean de modal
        setModal(!modal);
    }

    return (
        <div>
            <h2>{quizzNameValue}</h2>

            <ul className='questions_list'>
                {quizzQuestions.map((question,index) => 
                    <li key={index}>
                        {question.description}
                    </li>
                )}
            </ul>
            <ModalImportQuestion 
                modal={modal} 
                toggleModal={toggleModal}
                setQuestions={setQuizzQuestions}
                attachedQuestion={quizzQuestions}
            />

            <input type="button" onClick={toggleModal}/>

        </div>
    )
}

export default QuizzEtQuestion