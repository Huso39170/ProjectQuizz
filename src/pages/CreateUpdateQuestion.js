import React,{useState,useEffect} from 'react'
import InputRadioComp from '../component/Input/InputRadioComp'
import InputComp from '../component/Input/InputComp';
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

    //Initialisation des bornes par defaut pour le type de question echelle
    const [bornInf,setBornInf]=useState('')
    const [bornSup,setBornSup]=useState('')

    //Initialisation de la reponse si le type est "Echelle"
    const [reponseNum,setReponseNum]=useState('')


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
            value :"qcu",
            label: "Choix unique"

        },
        {
            divClassName:"radio",
            value :"num",
            label: "Echelle"
        }
    ]

    //Fonction qui complete les champs du formulaire selon les données importées
    const setQuestionForm = (data) => {
        setQuestionDescriptionValue(data.libelle)
        setQuestionTypeValue(data.type)
        if(data.type==="num"){
            setBornInf(data.inf);
            setBornSup(data.sup);
            setReponseNum(data.reponse);
        }else{
            let propositions=[]
            data.reponses.forEach(element => {
                propositions.push(element.libelle)
                if(element.isCorrect===true){
                    setQuestionReponseValue(element.libelle)
                }
            });
            setQuestionPropositionValues(propositions)
        }

        setTags(data.tags)
        setLoader(true);

    }
    
    const resetField=()=>{
        setQuestionDescriptionValue('');
        setQuestionReponseValue('');
        setQuestionTypeValue('');
        setTags([]);
        setQuestionPropositionValues([]);
        setQuestionPropositionTab([]);
        setBornInf('');
        setBornSup('');
        setReponseNum('');
    }

    const handleCreate = async (e)=>{
        //Empeche la page de rafraichir
        e.preventDefault();
        //Creation d'une variable dans laquel est stocké les différentes informations à propos de la question
        let newQuestion={}
        if(questionTypeValue==="num"){
            newQuestion = { libelle : questionDescriptionValue ,
                            type : questionTypeValue, 
                            inf:bornInf,
                            sup:bornSup,
                            reponse:reponseNum,
                            tags:tags
            };
        }else{
            newQuestion = { libelle : questionDescriptionValue ,
                type : questionTypeValue, 
                reponses: questionPropositionTab,
                tags:tags
            };
        }
        resetField();
        console.log(newQuestion)
        try{
            //Requete poste pour injecter de nouvelle données dans la BD
            const response = await api.post('/question', newQuestion);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(`Error: ${err.message}`);
        }
    }

    //Fonction qui s'execute lorsque l'utilisateur soumet le formulaire de modofication
    const handleUpdate= async (e) =>{
        e.preventDefault();
        //Création d'un objet newQuestion dans lequel va être inserer toute les données correspondant au differant champs
        let newQuestion={}
        if(questionTypeValue==="num"){
            newQuestion = { libelle : questionDescriptionValue ,
                            type : questionTypeValue, 
                            inf:bornInf,
                            sup:bornSup,
                            reponse:reponseNum,
                            tags:tags,
                            id:id
            };
        }else{
            newQuestion = { 
                libelle : questionDescriptionValue ,
                type : questionTypeValue, 
                reponses: questionPropositionTab,
                tags:tags,
                id:id
    
            };
        }


        try{
            //Requete patch pour mettre a jour des données existante de la BD
            const response = await api.patch(`/question`, newQuestion);
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
            for(let i=0;i<questionReponseValue.length;i++){
                if(element.toString() === questionReponseValue[i]){
                    proposition.isCorrect = true
                }
            }
            propositionsTab.push(proposition);
        });
        setQuestionPropositionTab(propositionsTab)


    }, [questionPropositionValues,setQuestionReponseValue,questionReponseValue])

    //Empeche les décimale et transforme en integer
    useEffect(()=>{
        if(bornInf!==''){
            setBornInf(parseInt(bornInf));
        }
        if(bornSup!==''){
            setBornSup(parseInt(bornSup));
        }
        if(reponseNum!==''){
            setReponseNum(parseInt(reponseNum));
        }

    },[bornInf,bornSup,reponseNum])

    //UseEffect qui entre en jeux lorsque les borne sont changé et que le type de question est echelle
    //On affecte au tableau proposition les valeurs entre la borne inférieur et supérieur 
    //Ainsi l'utilisateur pourra choisir la bonne reponses dans l'intervalle
    useEffect(() => {
        if(questionTypeValue==="num"){
            if(bornInf!=='' && bornSup!==''){
                if(bornInf>bornSup){
                    setBornInf(bornSup-1)
                }
            }
        }
    }, [bornInf,bornSup,questionTypeValue])



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
                    legend={"Type de question :"}
                    name={"radio_type"}
                    modalValue={questionTypeValue}
                    setValue={setQuestionTypeValue}
                    erreur={""}
                /> 

                {questionTypeValue==="num"&&
                <div className='born_field'>
                    <InputComp
                        placeholder={"Borne inferieur"}
                        setValue={setBornInf}
                        modalValue={bornInf}
                        inputType={"number"}
                        required={true}
                        erreur={""}
                        className={'input_field'}
                        label={"Borne inferieur et superieur"}
                    />
                    <InputComp
                        placeholder={"Borne superieur"}
                        setValue={setBornSup}
                        modalValue={bornSup}
                        inputType={"number"}
                        required={true}
                        erreur={""}
                        className={'input_field'}
                    />
                </div>
                }

                {(questionTypeValue==="qcm" ||questionTypeValue==="qcu")&&<ItemsForm
                    GlobalDivClassName={'tags_field'}    
                    aBtnClassName={'tags_plus'}
                    btnClassName={'tags_button_plus'}
                    itemsClassName={'tags_name'}
                    items={questionPropositionValues}
                    setItems={setQuestionPropositionValues}
                    itemNames={"Propositions"}
                />}

                {(questionPropositionValues.length>0&&(questionTypeValue==="qcm" ||questionTypeValue==="qcu"))&&<InputSelectComp
                    options={questionPropositionValues}
                    className={'input_field'}
                    legend={"Reponse(s) à la question"}
                    setValue={setQuestionReponseValue}
                    selectName={"reponse_select"}
                    erreur={""}
                    value={questionReponseValue}
                    selectId={"reponse_select_id"}
                    question_type={questionTypeValue}
                />}

                {(questionTypeValue==="num"&&
                    bornInf!==''&& bornSup!=='')&&
                    <InputComp
                    placeholder={"Saisir la bonne reponse ..."}
                    setValue={setReponseNum}
                    modalValue={reponseNum}
                    inputType={"number"}
                    required={true}
                    erreur={""}
                    className={'input_field'}
                    label={"Reponse à la question"}
                />
                }
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

