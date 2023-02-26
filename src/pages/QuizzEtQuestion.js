import React, {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ModalImportQuestion from '../component/Modal/ModalImportQuestion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { VscInspect  } from 'react-icons/vsc';
import './QuizzEtQuestion.css'
import ModalPreview from '../component/Modal/ModalPreviewQuestion'


const QuizzEtQuestion = () => {
    
    //Initialisation 
    const [quizzNameValue, setQuizzNameValue] = useState('')
    const [quizzQuestions,setQuizzQuestions]=useState([])
    const [loader,setLoader]=useState(false)
    
    //Utilisation de la fonction useNavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();
    //Recuperation de l'id dans l'url
    const { id } = useParams();

    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuizz = async () => {
                try {
                    const response = await axiosPrivate.get(`/quizz/${id}`);
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
    }, [id,navigate,axiosPrivate])

    //Fonction qui initialise quizzNameValue
    const setQuizzData = (data) => {
        setQuizzNameValue(data.name)
        setLoader(true)
    }


    //Gestion du modal
    const[modal,setModal]= useState(false);
    const toggleModal = () =>{
        //Inverse le bollean de modal
        setModal(!modal);
    }

    /* Redirection vers la page de modification du quizz */
    const handleEditQuestion = (id) => {
        navigate(`/mesquizz/question/modifier/${id}`); 
    }

    /* preview question */
    const [preview, setPreview] = useState(false);
    const [question, setQuestion] = useState();

    const handleQuestion = (param) => {
        setQuestion(param);
    }

    const handlePreviewQuestion = (param) => {
        handleQuestion(param);
        setPreview(!preview);
    }
    

    return (
        <>
            {loader===true?(<div>
                <div className='title_attached_button'>
                    <h2>{quizzNameValue}</h2>
                    <input type="button"  value='AJOUTER UNE QUESTION' onClick={toggleModal}/>
                </div>
                
                <hr />

                <ul className='questions_list'>
                    {quizzQuestions.map((question,index) => 
                        <li className='question' key={index}>
                            <p className='question_name'>{question.libelle}</p>
                            <button className='play_button' title='Preview' onClick={()=>{handlePreviewQuestion(question)}}> <VscInspect className='Fa' alt='watch button' /> </button>
                            <button className='edit_button' title='Modifier'onClick={()=>{handleEditQuestion(question._id)}}> <FaEdit className='Fa' alt='edit button'/> </button>
                            <button className='del_button' title='Supprimer' onClick={()=>{}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                        </li>
                    )}
                </ul>
                <ModalImportQuestion 
                    modal={modal} 
                    toggleModal={toggleModal}
                    setQuestions={setQuizzQuestions}
                    attachedQuestion={quizzQuestions}
                    quizz_id={id}
                />
            </div>):(
                <div className="dot-flashing"></div>
            )}

            {
                preview ? <ModalPreview 
                            Question = {question} 
                            HandlePreviewQuestion = {handlePreviewQuestion} 
                          />
                        : ''
            }
        </>
    )
}

export default QuizzEtQuestion