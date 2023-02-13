import './MesQuizz.css';
import { FaPlay, FaEdit, FaEye, FaTrashAlt,FaLink } from 'react-icons/fa';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { BsFillFileEarmarkArrowUpFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../api/quizz';
import ModalSessionParameter from '../component/Modal/ModalSessionParameter';
import '../component/Loader/Loader.css'

function MesQuizz() {


const [datas, setDatas] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [loader,setLoader] = useState(false);


//Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
const navigate = useNavigate();


useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const response = await api.get('/quizz');
      setDatas(response.data);
      setLoader(true)
      console.log(response.data)
    } catch (err) {
        console.log(err.response.status);
        console.log("toto")
        //Si l'id n'existe pas redirection vers la page Error 404
        if(err.response.status === 404){
          navigate('./missing');
        }
    }
  }
  fetchQuiz();
}, [navigate]);

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    }

    /* Clique CREER QUIZZ */
    const [createQuizz, setCreateQuizz] = useState(false);

    const handleCreateQuizz = () => {
        setCreateQuizz(!createQuizz);
    }


    /* Delete question */
    const handleDeleteQuiz = (quizz_id) => {
        const fetchDeleteQuiz = async () => {
            try{
                //Requete poste pour edit les données dans la BD
                const response = await api.delete(`/quizz`,{data: {id: quizz_id}});
                console.log(response.data)
                const listDatas = datas.filter((item) => item._id !== quizz_id);
                setDatas(listDatas);
        
            } catch (err){
                //Erreur affichée dans la console
                console.log(err.response.data.message)
            }
        }
        fetchDeleteQuiz();
    }

    
    //Gestion du modal
    const[modal,setModal]= useState(false);
    const toggleModal = () =>{
        //Inverse le bollean de modal
        setModal(!modal);
    }


    return (
        <>
        
            {loader===true?(<div className='content_main'>
                {datas.length ? (
                <>
                    <div className='add_quizz'>
                        <button onClick={handleCreateQuizz}>CRÉER UN QUIZ</button>
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
                                return val.name.includes(searchTerm);
                                })
                                .map((val,index) => {
                                return (
                                    <li className='quizz' key={index}>
                                        <p className='quizz_name'>{val.name}</p>
                                        <button className='play_button' title='Démarrer' onClick={toggleModal}> <FaPlay className='FaPlay' alt='play button' /> </button>
                                        <button className='edit_button' title='Modifier' onClick={()=>{ navigate(`/mesquizz/modifier/${val._id}`)}}> <FaEdit className='FaEdit' alt='edit button'/> </button>
                                        <button className='stats_button' title='Statistiques'> <FaEye className='FaStats' alt='statistical button' /> </button>
                                        <button className='link_button' title='Attacher' onClick={()=>{navigate(`/mesquizz/quizz/${val._id}`)}}> <FaLink className='FaLink' alt='attach button' /> </button>

                                        <button className='del_button' title='Supprimer' onClick={()=>{ handleDeleteQuiz(val._id)}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <button className='add_button_bis' onClick={handleCreateQuizz}>CRÉER UN QUIZ</button>
                </>
                
            ) : (
                
                <>
                    <p className='empty_quizz'>VOUS N'AVEZ PAS ENCORE DE QUIZ</p>
                    <button  className='add_button_quizz' onClick={handleCreateQuizz}>CRÉER UN QUIZ</button>
                </>
                
                
            )}

            <div className={createQuizz ? 'creation' : 'creation_hidden'}>
                <ImCross className='cross_creation_quizz' role='button' onClick={handleCreateQuizz}/>
                <div className='creation_quizz'>
                    <h2>Créer ou importer un quiz</h2>
                    <section className='new_import'>
                    <button><AiOutlineFileAdd className='icons' onClick={()=>{navigate("/mesquizz/creer")}}/></button>
                    <p>Nouveau Quiz</p>
                    </section>
                    <section className='new_import'>
                    <button><BsFillFileEarmarkArrowUpFill className='icons'/></button>
                    <p>Importer un Quiz</p>
                    </section>
                </div>
            </div>
            
            <ModalSessionParameter
                modal={modal} 
                toggleModal={toggleModal}    
            />

            </div>):(
                <div  className="dot-flashing"></div>
            )
        }
        </>
            
    )
}

export default MesQuizz
