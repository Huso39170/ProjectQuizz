import React,{useState,useEffect} from 'react'
import InputRadioComp from '../component/Input/InputRadioComp'
import TextAreaComp from '../component/Input/TextAreaComp'
import { useNavigate,useParams } from 'react-router-dom';
import api from '../api/quizz' 
import ItemsForm from '../component/Items/ItemsForm';
import InputSelectComp from '../component/Input/InputSelectComp';
import '../component/Loader/Loader.css'

const CreateUpdateQuestion = () => {
    //Initialisation des champs de saisie description, reponse, proposition,
    //tags ainsi que le type de reponse de la question
    const [questionDescriptionValue, setQuestionDescriptionValue] = useState('')
    const [questionReponseValue, setQuestionReponseValue] = useState('')
    const [questionTypeValue, setQuestionTypeValue] = useState('')
    const [tags,setTags] = useState([]);
    const [questionPropositionValues, setQuestionPropositionValues] = useState([])
    const [questionPropositionTab, setQuestionPropositionTab] = useState([])
    //Loader pour afficher un chargement si false
    const [loader,setLoader]=useState(false);

    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    //Recuperation de l'id de la question dans l'url
    const { id } = useParams();


    //Initialisation des differents elements des boutons "radio"
    const values =[
        {
            divClassName:"radio",
            value :"qcm",
            label: "Choix multiple"

        },
        {
            divClassName:"radio",
            value :"echelle",
            label: "Echelle"
        }
    ]

    const handleCreate = async (e)=>{
        //Empeche la page de rafraichir
        e.preventDefault();
        //Creation d'une variable dans laquel est stocké les différentes informations à propos de la question
        let newQuestion={}
        newQuestion = { libelle : questionDescriptionValue ,
                        question_type : questionTypeValue, 
                        reponses: questionPropositionTab,
                        tags:tags
        };

        try{
            //Requete poste pour injecter de nouvelle données dans la BD
            const response = await api.post('/question', newQuestion);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(`Error: ${err.message}`);
        }
    }


    //Fonction qui s'execute au moment du rendue de la page permet de recuperer les données de la question de l'id correspondant
    useEffect(() => {
        if(id!==undefined){
            const fetchQuestion = async () => {
                try {
                    const response = await api.get(`/question/${id}`);
                    console.log(response.data);
                    //Appelle a la fonction setQuestionForm
                    setQuestionForm(response.data)
                } catch (err) {
                    console.log(err.response.status);
                    //Si l'id n'existe pas redirection vers la page Error 404
                    if(err.response.status===404){
                        navigate('/missing')
                    }
                }
            }
    
            fetchQuestion();
        }else{
            setLoader(true);
        }
    }, [id,navigate])

    //Fonction qui complete les champs du formulaire selon les données importées
    const setQuestionForm = (data) => {
        setQuestionDescriptionValue(data.description)
        setQuestionTypeValue(data.type)
        let propositions=[]
        data.reponses.forEach(element => {
            propositions.push(element.libelle)
            if(element.isCorrect===true){
                setQuestionReponseValue(element.libelle)
            }
        });
        setQuestionPropositionValues(propositions)
        setTags(data.tags)
        setLoader(true);

    }


    //Fonction qui s'execute lorsque l'utilisateur soumet le formulaire de modofication
    const handleUpdate= async (e) =>{
        e.preventDefault();
        //Création d'un objet newQuestion dans lequel va être inserer toute les données correspondant au differant champs
        let newQuestion={}
        newQuestion = { 
            libelle : questionDescriptionValue ,
            question_type : questionTypeValue, 
            reponses: questionPropositionTab,
            tags:tags
        };

        try{
            //Requete patch pour mettre a jour des données existante de la BD
            const response = await api.patch(`/question/${id}`, newQuestion);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(`Error: ${err.message}`);
        }
    }

    //UseEffect qui entre en jeux lorsque le tableau des proposition ou la reponse est changé
    //Si le tableau des proposition est vide alors il n'y a pas de reponse possible
    //Créé un objet proposition avec un boolean mis a true si la proposition correspond à la reponse
    useEffect(() => {
        if(questionPropositionValues.length===0){
            setQuestionReponseValue('')
        }
        let propositionsTab=[]
        questionPropositionValues.forEach(element => {
            let proposition={libelle : element , isCorrect : false}
            if(element.toString() === questionReponseValue){
                proposition.isCorrect = true
            }
            propositionsTab.push(proposition);
        });
        setQuestionPropositionTab(propositionsTab)


    }, [questionPropositionValues,setQuestionReponseValue,questionReponseValue])

    return (
        <div className='create_update_quizz_form'>
            {id === undefined  && <h2>Creation de la question</h2>}
            {id !== undefined && <h2>Modification de la question</h2>}
        
            {
            loader===true?(<form onSubmit={(e) => e.preventDefault()}>

                <TextAreaComp 
                    placeholder={"Description de la question..."}
                    setValue={setQuestionDescriptionValue}
                    modalValue={questionDescriptionValue}
                    required={true}
                    erreur={""}
                    className={"input_field"}
                    label={"Description de la question"}
                />
                <InputRadioComp
                    values={values}
                    className="radio_field"
                    legend={"type de question :"}
                    name={"radio_type"}
                    modalValue={questionTypeValue}
                    setValue={setQuestionTypeValue}
                    erreur={""}
                /> 


                <ItemsForm
                    GlobalDivClassName={'tags_field'}    
                    aBtnClassName={'tags_plus'}
                    btnClassName={'tags_button_plus'}
                    itemsClassName={'tags_name'}
                    items={questionPropositionValues}
                    setItems={setQuestionPropositionValues}
                    itemNames={"Propositions"}
                />

                {questionPropositionValues.length>0&&<InputSelectComp
                    options={questionPropositionValues}
                    className={'input_field'}
                    legend={"Reponse(s) à la question"}
                    setValue={setQuestionReponseValue}
                    selectName={"reponse_select"}
                    erreur={""}
                    value={questionReponseValue}
                    selectId={"reponse_select_id"}
                />}


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
                <div className="dot-flashing"></div>
            }
            
            {id === undefined && loader===true  && <input type="submit" value="Créer" onClick={handleCreate}/>}
            {id !== undefined && loader===true  && <input type="submit" value="Modifier" onClick={handleUpdate}/>}
            
            
        </div>
    )
}

export default CreateUpdateQuestion

