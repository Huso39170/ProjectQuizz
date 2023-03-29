import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FaTrashAlt } from 'react-icons/fa';


const QuizzStat =() => {
    /* Création des états pour stocker les données, contrôler le chargement,
    gérer la recherche et l'option de tri sélectionnée */ 
    const [quizzData,setQuizzData]=useState([{}])
    const [loader,setLoader] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    // Initialiser la fonction de navigation
    const navigate = useNavigate();

    // Géstion de la mise à jour de la barre de recherche
    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    }

    //Recuperation de l'id dans l'url
    const { id } = useParams();

    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()


    useEffect(() => {
        const fetchQuizSession = async () => {
            try {
            const response = await axiosPrivate.get(`/session/quizz/${id}`);
            if(response) {
                console.log(response.data)

                const formattedDataArray = response.data.map(item => {
                    return {
                      ...item,
                      createdAt: formatDate(item.createdAt)
                    };
                });

                setQuizzData(formattedDataArray)  
                setLoader(true)
            }
            } catch (err) {
                console.log(err.response.status);
                
            }
        }
        fetchQuizSession();


    }, []);

    //Fonction pour convertir la date personnalisée en objet Date valide
    function parseCustomDate(dateString) {
        const [day, month, yearAndTime] = dateString.split('/');
        const [year, time] = yearAndTime.split(', ');
        return new Date(`${year}-${month}-${day}T${time}`);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }

    // Géstion du changement d'option de tri
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        if(event.target.value==="name"){
            let quizzes = quizzData;
            quizzes.sort((a, b) => a.session_name.localeCompare(b.session_name));
            console.log(quizzes)
            setQuizzData(quizzes)
        }else if(event.target.value==="date"){
            let quizzes = quizzData;
            quizzes.sort((a, b) => {
                const dateA = parseCustomDate(a.createdAt);
                const dateB = parseCustomDate(b.createdAt);
                return dateA - dateB;
            });
            console.log(quizzes)
            setQuizzData(quizzes)
        }
    };

    const handleDeleteQuiz =(id)=>{
        console.log(id)
    }

    return (
        <>
        {loader===true?(
            <div className='content_main'>

            <div className='search_session'>
                <input 
                type='text' 
                placeholder='Rechercher par nom ...' 
                name='searchBar'
                onChange={handleSearchTerm}
                />

            <select value={selectedOption} onChange={handleChange}>
                <option value="">Trier par :</option>
                <option value="name">Nom</option>
                <option value="date">Date</option>
            </select>
            </div>

            {quizzData.length>0&&(
                <div className='quizz_display'>
                    <ul>
                        {quizzData
                            .filter((val) => {
                                return val.session_name.includes(searchTerm);
                                })
                            .map((val,index) => {
                            return (
                                <li className='quizz quizz_stat' key={index} onClick={()=>{navigate(`/mesquizz/stat/details/${val._id}`)}}>
                                    <p className='quizz_name'>{`Session ${val.session_name} du ${val.createdAt}`}</p>
                                    <button className='del_button' title='Supprimer' onClick={()=>{ handleDeleteQuiz(val._id)}}> <FaTrashAlt className='FaTrash' alt='delete button' /> </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
            </div>
        ):
        (
            <div className="dot-flashing"></div>
        )
        }
        </>
    )
}

export default QuizzStat