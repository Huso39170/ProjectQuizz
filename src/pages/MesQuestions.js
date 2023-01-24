import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { VscInspect  } from 'react-icons/vsc';
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../api/quizz';


function MesQuestions() {

const [datas, setDatas] = useState([]);
const [searchTerm, setSearchTerm] = useState('');


//Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
const navigate = useNavigate();


useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await api.get('/question');
      setDatas(response.data);
      console.log(response.data)
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
}, [navigate]);

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
    const handleDeleteQuestion = (id) => {
        const fetchDeleteQuestion = async () => {
            try{
                const listDatas = datas.filter((item) => item.id !== id);
                setDatas(listDatas);
                //Requete poste pour edit les données dans la BD
                const response = await api.delete(`/question/${id}`);
                console.log(response.data)

            } catch (err){
                //Erreur affichée dans la console
                console.log(`Error: ${err.message}`);
            }
        }
        fetchDeleteQuestion();
    }


    return (
        <div className='content_main'>
            {datas.length ? (
            <>
                <div className='add_quizz'>
                <button className='add_button_quizz' onClick={handleCreateQuestion}>CRÉER UNE QUESTION</button>
                </div>
                
                <input 
                type='text' 
                className='search__input' 
                placeholder='Rechercher...' 
                name='searchBar'
                onChange={handleSearchTerm}
                />
                    
                
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
                                    <button className='play_button' title='Voir'> <VscInspect className='Fa' alt='watch button' /> </button>
                                    <button className='edit_button' title='Modifier' onClick={()=>{handleEditQuestion(val.id)}}> <FaEdit className='Fa' alt='edit button'/> </button>
                                    <button className='del_button' title='Supprimer' onClick={()=>{handleDeleteQuestion(val.id)}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button className='add_button_bis'>CRÉER UNE QUESTION</button>
            </>
            
        ) : (
            
            <>
                <p className='empty_quizz'>VOUS N'AVEZ PAS ENCORE DE QUESTION</p>
                <button  className='add_button_quizz' onClick={handleCreateQuestion}>CRÉER UNE QUESTION</button>
            </>
            
            
        )}
    
        </div>
    )
}

export default MesQuestions
