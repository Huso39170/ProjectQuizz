import React, {useState,useEffect} from 'react'
import InputComp from '../component/Input/InputComp'
import TextAreaComp from '../component/Input/TextAreaComp'
import api from '../api/quizz' 
import { useParams,useNavigate} from 'react-router-dom';
import './CreateUpdateQuizzForm.css'
import ItemsForm from '../component/Items/ItemsForm'
import '../component/Loader/Loader.css'

const CreateUpdateQuizz = () => {
    //Initialisation des champs de saisie nom , description le dérouelemnt du quizz ainsi que les tags
    const [quizzNameValue, setQuizzNameValue] = useState('')
    const [quizzDescriptionValue, setQuizzDescriptionValue] = useState('')
    const [tags,setTags] = useState([]);
    //Loader pour afficher un chargement si false
    const [loader,setLoader]=useState(false);

    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    //Recuperation de l'id dans l'url
    const { id } = useParams();



    //Fonction qui s'execute lorsque l'utilisateur soumet le formulaire de création
    const handleCreate = async (e)=>{
        //Empeche la page de rafraichir
        e.preventDefault();
        //Creation d'une variable dans laquel est stocké les différentes informations à propos du quizz
        let newQuizz={}
        newQuizz = {name: quizzNameValue , 
                    description : quizzDescriptionValue , 
                    tags:tags
                    };
        
        try{
            //Requete poste pour injecter de nouvelle données dans la BD
            const response = await api.post('/quizz', newQuizz);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(`Error: ${err.message}`);
        }
    }

    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données du quizz de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuizz = async () => {
                try {
                    const response = await api.get(`/quizz/${id}`);
                    console.log(response.data);
                    //Appelle a la fonction setQuizzForm
                    setQuizzForm(response.data)
                } catch (err) {
                    console.log(err.response.status);
                    //Si l'id n'existe pas redirection vers la page Error 404
                    if(err.response.status===404){
                        //navigate('/missing')
                    }
                }
            }
    
            fetchQuizz();
        }else{
            setLoader(true);
        }
    }, [id,navigate])

    //Fonction qui complete les champs du formulaire selon les données importées
    const setQuizzForm = (data) => {
        setQuizzNameValue(data.name)
        setQuizzDescriptionValue(data.description)
        setTags(data.tags)
        setLoader(true);
    }

    //Fonction qui s'execute lorsque l'utilisateur soumet le formulaire de modofication
    const handleUpdate= async (e) =>{
        e.preventDefault();
        //Création d'un objet newQuizz dans lequel va être inserer toute les données correspondant au differant champs
        let newQuizz={}

        newQuizz = {name: quizzNameValue ,
                    description : quizzDescriptionValue ,
                    tags:tags,
                    id:id};

        try{
            //Requete patch pour mettre a jour des données existante de la BD
            const response = await api.patch(`/quizz`, newQuizz);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(`Error: ${err.message}`);
        }
    }
    

    return (
            <div className='create_update_quizz_form'>
                    {id === undefined  && <h2>Creation du quizz</h2>}
                    {id !== undefined && <h2>Modification du quizz</h2>}
                
                   {loader===true? (<form onSubmit={(e) => e.preventDefault()}>
                    <InputComp 
                        placeholder={"Nom du quizz"}
                        setValue={setQuizzNameValue}
                        modalValue={quizzNameValue}
                        inputType={"text"}
                        required={true}
                        erreur={""}
                        className={'input_field'}
                        label={"Nom du quizz"}
                    />
                    <TextAreaComp 
                        placeholder={"Description du quizz"}
                        setValue={setQuizzDescriptionValue}
                        modalValue={quizzDescriptionValue}
                        required={true}
                        erreur={""}
                        className={"input_field"}
                        label={"Description du quizz"}
                    />
                    <ItemsForm
                        GlobalDivClassName={'tags_field'}    
                        aBtnClassName={'tags_plus'}
                        btnClassName={'tags_button_plus'}
                        itemsClassName={'tags_name'}
                        items={tags}
                        setItems={setTags}
                        itemNames={"Tags"}
                    />
                    
                    </form>):
                    (
                        <div className="dot-flashing"></div>
                    )}
                    
                    {id === undefined  && loader===true &&<input type="submit" value="Créer" onClick={handleCreate}/>}
                    {id !== undefined && loader===true && <input type="submit" value="Modifier" onClick={handleUpdate}/>}
                    
            </div>
    )
}

export default CreateUpdateQuizz