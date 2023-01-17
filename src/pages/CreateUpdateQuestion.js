import React,{useState,useEffect} from 'react'
import InputComp from '../component/Input/InputComp'
import InputRadioComp from '../component/Input/InputRadioComp'
import TextAreaComp from '../component/Input/TextAreaComp'
import { useNavigate,useParams } from 'react-router-dom';
import api from '../api/quizz' 
import TagsForm from '../component/Tags/TagsForm';

const CreateUpdateQuestion = () => {
    //Initialisation des champs de saisie description, reponse, proposition,
    //tags ainsi que le type de reponse de la question
    const [questionDescriptionValue, setQuestionDescriptionValue] = useState('')
    const [questionReponseValue, setQuestionReponseValue] = useState('')
    const [questionTypeValue, setQuestionTypeValue] = useState('')
    const [tags,setTags] = useState([]);
    const [questionPropositionValue, setQuestionPropositionValue] = useState('')


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
        newQuestion = { description : questionDescriptionValue ,
                        reponse: questionReponseValue ,
                        type : questionTypeValue, 
                        proposition: questionPropositionValue,
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
        }
    }, [id,navigate])

    //Fonction qui complete les champs du formulaire selon les données importées
    const setQuestionForm = (data) => {
        setQuestionDescriptionValue(data.description)
        setQuestionReponseValue(data.reponse)
        setQuestionTypeValue(data.type)
        setQuestionPropositionValue(data.proposition)

    }


    //Fonction qui s'execute lorsque l'utilisateur soumet le formulaire de modofication
    const handleUpdate= async (e) =>{
        e.preventDefault();
        //Création d'un objet newQuestion dans lequel va être inserer toute les données correspondant au differant champs
        let newQuestion={}
        newQuestion = { description : questionDescriptionValue ,
            reponse: questionReponseValue ,
            type : questionTypeValue, 
            proposition: questionPropositionValue,
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

    return (
        <div className='create_update_quizz_form'>
            {id === undefined  && <h2>Creation de la question</h2>}
            {id !== undefined && <h2>Modification de la question</h2>}
        
            <form onSubmit={(e) => e.preventDefault()}>

                <TextAreaComp 
                    placeholder={"Description de la question..."}
                    setValue={setQuestionDescriptionValue}
                    modalValue={questionDescriptionValue}
                    required={true}
                    erreur={""}
                    className={"input_field"}
                    label={"Description de la question"}
                />
                <InputComp 
                    placeholder={"Reponse à la question..."}
                    setValue={setQuestionReponseValue}
                    modalValue={questionReponseValue}
                    inputType={"text"}
                    required={true}
                    erreur={""}
                    className={'input_field'}
                    label={"Reponse à la question"}
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
                {questionTypeValue==="qcm" &&
                    <InputComp 
                        placeholder={"Prop1;Prop2;Prop3"}
                        setValue={setQuestionPropositionValue}
                        modalValue={questionPropositionValue}
                        inputType={"text"}
                        required={true}
                        erreur={""}
                        className={'input_field'}
                        label={"Proposition"}
                    />
                }
                {questionTypeValue==="echelle" &&
                    <InputComp 
                        placeholder={"Inferieur;Superieur"}
                        setValue={setQuestionPropositionValue}
                        modalValue={questionPropositionValue}
                        inputType={"text"}
                        required={true}
                        erreur={""}
                        className={'input_field'}
                        label={"Proposition"}
                    />
                }

                <TagsForm
                    GlobalDivClassName={'tags_field'}    
                    aBtnClassName={'tags_plus'}
                    btnClassName={'tags_button_plus'}
                    tagsClassName={'tags_name'}
                    tags={tags}
                    setTags={setTags}
                />
            </form>
            
            {id === undefined  &&<input type="submit" value="Créer" onClick={handleCreate}/>}
            {id !== undefined &&<input type="submit" value="Modifier" onClick={handleUpdate}/>}
            
            
        </div>
    )
}

export default CreateUpdateQuestion