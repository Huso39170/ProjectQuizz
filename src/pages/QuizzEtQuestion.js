import React, {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ModalImportQuestion from '../component/Modal/ModalImportQuestion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { VscInspect  } from 'react-icons/vsc';
import './QuizzEtQuestion.css'
import ModalPreview from '../component/Modal/ModalPreviewQuestion'


const QuizzEtQuestion = () => {
    
    //Initialisation des états
    const [quizzNameValue, setQuizzNameValue] = useState('')
    const [quizzQuestionsIds,setQuizzQuestionsIds]=useState([])
    const [quizzQuestionsData,setQuizzQuestionsData] = useState([{}])
    const [loader,setLoader]=useState(false)
    
    // Initialisation la fonction de navigation
    const navigate = useNavigate();

    //Recuperation de l'ID dans l'URL
    const { id } = useParams();

    //Utilisation du hook pour gérer les requêtes Axios
    const axiosPrivate=useAxiosPrivate()

    // Chargement des données du quiz lors du montage du composant
    useEffect(() => {
        if(id!==undefined&& loader==false){
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
    }, [id,navigate,axiosPrivate,loader])

    // Fonction pour initialiser quizzNameValue
    const setQuizzData = async (data) => {
        setQuizzNameValue(data.name)
        //Data.questions renvoie seulement l'id de la question donc on ne peut pas afficher les infos de la question
        setQuizzQuestionsIds(data.questions)    
        await getQuestions(data.questions);
        setLoader(true)
    }

    // La fonction asynchrone getQuestions récupère les données de plusieurs questions avec les IDs spécifiés
    const getQuestions = async (questions) => {
        let questionsData = []
        let promises = questions.map(question_id => {
        return axiosPrivate.get(`/question/${question_id}`)
        .then(response => {
            questionsData.push(response.data);
        })
        .catch(error => console.error(error));
        });
        setQuizzQuestionsData(questionsData)
        return Promise.all(promises);
    }


    //Gestion du modal
    const[modal,setModal]= useState(false);
    const toggleModal = () =>{
        //Inverser la valeur de modal
        setModal(!modal);
    }

    /* Redirection vers la page de modification de la question */
    const handleEditQuestion = (id) => {
        navigate(`/mesquizz/question/modifier/${id}`); 
    }

    // Gestion de l'aperçu de la question
    const [preview, setPreview] = useState(false);
    const [question, setQuestion] = useState();

    const handleQuestion = (param) => {
        setQuestion(param);
    }

    const handlePreviewQuestion = (param) => {
        handleQuestion(param);
        setPreview(!preview);
    }

    const handleDeleteQuestion =(questionId) =>{
        const fetchDeleteQuiz = async () => {
            try{
                 // Requête POST pour éditer les données dans la BD
                const response = await axiosPrivate.delete(`/quizz/question`,{data: {quizzId: id , questionId : questionId}});
                if(response.status === 200) {
                    console.log(response.data)
                    const listDatas = quizzQuestionsData.filter((item) => item._id !== questionId);
                    setQuizzQuestionsData(listDatas);

                    // Notification de suppression réussie
                    toast.success('Suppression réussie');
                }
            } catch (err){
                // Notification de suppression échouée
                toast.error('La suppression du quiz a échouée');

                // Erreur affichée dans la console
                console.log(err.response.data.message)
            }
        }
        fetchDeleteQuiz();
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
                    {quizzQuestionsData.map((question,index) => 
                        <li className='question' key={index}>
                            <p className='question_name'>{question.libelle}</p>
                            <button className='play_button' title='Preview' onClick={()=>{handlePreviewQuestion(question._id)}}> <VscInspect className='Fa' alt='watch button' /> </button>
                            <button className='edit_button' title='Modifier'onClick={()=>{handleEditQuestion(question._id)}}> <FaEdit className='Fa' alt='edit button'/> </button>
                            <button className='del_button' title='Supprimer' onClick={()=>{handleDeleteQuestion(question._id)}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                        </li>
                    )}
                </ul>
                <ModalImportQuestion 
                    modal={modal} 
                    toggleModal={toggleModal}
                    setLoaderParent={setLoader}
                    attachedQuestion={quizzQuestionsIds}
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