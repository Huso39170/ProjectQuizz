import React, {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import api from '../api/quizz' 
import ModalImportQuestion from '../component/Modal/ModalImportQuestion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { VscInspect  } from 'react-icons/vsc';
import './QuizzEtQuestion.css'

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

    //Fonction qui initialise quizzNameValue
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
            <div className='title_attached_button'>
                <h2>{quizzNameValue}</h2>
                <input type="button"  value='AJOUTER UNE QUESTION' onClick={toggleModal}/>
            </div>
            
            <hr />

            <ul className='questions_list'>
                {quizzQuestions.map((question,index) => 
                    <li className='question' key={index}>
                        <p className='question_name'>{question.libelle}</p>
                        <button className='play_button' title='Voir'> <VscInspect className='Fa' alt='watch button' /> </button>
                        <button className='edit_button' title='Modifier' onClick={()=>{}}> <FaEdit className='Fa' alt='edit button'/> </button>
                        <button className='del_button' title='Supprimer' onClick={()=>{}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                    </li>
                )}
            </ul>
            <ModalImportQuestion 
                modal={modal} 
                toggleModal={toggleModal}
                setQuestions={setQuizzQuestions}
                attachedQuestion={quizzQuestions}
            />

            

        </div>
    )
}

export default QuizzEtQuestion