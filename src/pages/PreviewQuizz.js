import React,{ useEffect,useState } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams,useNavigate } from 'react-router-dom';
import PreviewQuestion from "./PreviewQuestion";

const PreviewQuizz = () => {

    const [quizzData,setQuizzData]=useState([]);
    const [index, setIndex] = useState(0);
    const [components,setComponents]= useState([])

    //Utilisation de la fonction useNavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();
    //Recuperation de l'id dans l'url
    const { id } = useParams();

    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    const handleNext = (e) => {
        e.preventDefault();
        if(index!==components.length){
            setIndex((prevIndex) => (prevIndex + 1));
        }
    };

    const handlePrev = (e) => {
        e.preventDefault();
        if(index!==0){
            setIndex((prevIndex) => (prevIndex - 1));
        }

    };

    const pushComponent = (data) =>{
        let componentsToPush=[];
        data.questions.forEach(question_id => {
            componentsToPush.push(<PreviewQuestion question_id={question_id}/>)
        });
        setComponents(componentsToPush);
    }


    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuizz = async () => {
                try {
                    const response = await axiosPrivate.get(`/quizz/${id}`);
                    setQuizzData(response.data)
                    pushComponent(response.data)

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


    return (
        <>
            <div>PreviewQuizz</div>
            {components.map((component, i) => (
                <div key={i} style={{ display: i === index ? "block" : "none" }}>
                    {component}
                </div>
            ))}
            <input type="submit" value="Prev" onClick={handlePrev}/>
            <input type="submit" value="Next" onClick={handleNext}/>
        </>
        
    )
}

export default PreviewQuizz