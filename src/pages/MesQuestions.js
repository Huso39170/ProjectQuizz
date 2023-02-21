import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { VscInspect  } from 'react-icons/vsc';
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ModalPreview from '../component/Modal/ModalPreviewQuestion'
import { toast } from 'react-toastify';


function MesQuestions() {

    const [datas, setDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loader,setLoader]= useState(false)

    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
    const fetchQuestions = async () => {
        try {
        const response = await axiosPrivate.get('/question');

        if(response) {
            setDatas(response.data);
            setLoader(true);
        }

        } catch (err) {
            console.log(err.response.status);
            //Si l'id n'existe pas redirection vers la page Error 404
            if(err.response.status === 404){
            //navigate('/missing')
            console.log("ERROR 404");
            }
        }
    }
    fetchQuestions();
    }, [navigate,axiosPrivate]);

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    }

    /* Clique CREER QUESTION */
    const handleCreateQuestion = () => {
        navigate('creer');
    }

    /* Redirection vers la page de modification du quizz */
    const handleEditQuestion = (id) => {
       navigate(`/mesquizz/question/modifier/${id}`); 
    }


    /* Delete question */
    const handleDeleteQuestion = (qst_id) => {
        const fetchDeleteQuestion = async () => {
            try{

                //Requete poste pour edit les données dans la BD
                const response = await axiosPrivate.delete(`/question`,{data: {id: qst_id}});

                if(response) {
                    console.log(response.data)
                    const listDatas = datas.filter((item) => item._id !== qst_id);
                    setDatas(listDatas);

                    //Notification
                    toast.success('Suppression réussie');
                }

            } catch (err){
                //Notification
                toast.error('Suppression réussie');

                //Erreur affichée dans la console
                console.log(`Error: ${err.message}`);
            }
        }
        fetchDeleteQuestion();
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
        <>{loader===true?(
            <div className='content_main'>
                {datas.length ? (
                <>
                    <div className='add_quizz'>
                        <button onClick={handleCreateQuestion}>CRÉER UNE QUESTION</button>
                        <input 
                        type='text'
                        placeholder='Rechercher...' 
                        name='searchBar'
                        onChange={handleSearchTerm}
                        />
                    </div>
                    
                    
                        
                    
                    <div className='quizz_display'>
                        <ul>
                            {datas
                                .filter((val) => {
                                return val.libelle.includes(searchTerm);
                                })
                                .map((val,index) => {
                                return (
                                    <li className='quizz' key={index}>
                                        <p className='quizz_name'>{val.libelle}</p>
                                        <button className='play_button' title='Voir' onClick={()=>{handlePreviewQuestion(val)}}> <VscInspect className='Fa' alt='watch button' /> </button>
                                        <button className='edit_button' title='Modifier' onClick={()=>{handleEditQuestion(val._id)}}> <FaEdit className='Fa' alt='edit button'/> </button>
                                        <button className='del_button' title='Supprimer' onClick={()=>{handleDeleteQuestion(val._id)}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <button className='add_button_bis' onClick={handleCreateQuestion} >CRÉER UNE QUESTION</button>
                </>
                
            ) : (
                
                <>
                    <p className='empty_quizz'>VOUS N'AVEZ PAS ENCORE DE QUESTION</p>
                    <button  className='add_button_quizz' onClick={handleCreateQuestion}>CRÉER UNE QUESTION</button>
                </>
                
                
            )}
            {
                preview ? <ModalPreview 
                            Question = {question} 
                            HandlePreviewQuestion = {handlePreviewQuestion} 
                            />
                        : ''}
        
            </div>):(
                <div  className="dot-flashing"></div>
            )
    }
    
   

    
    
    </>
    )
    
}

export default MesQuestions
