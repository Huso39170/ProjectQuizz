import React,{useEffect,useState,useRef} from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import InputComp from '../Input/InputComp';
import './ModalImportQuestion.css'
import '../Loader/Loader.css'

const ModalImportQuestion = ({modal,toggleModal,setQuestions,attachedQuestion,quizz_id}) => {

    //Initialisation des champs de saisie de recherche, des resultats de la recherche,
    // du tableau des question récuperée dans la bd ainsi que les questions selectionné
    const [search,setSearch]= useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allSessionQuestion,setAllSessionQuestion]=useState([]);
    const [selectedQuestion,setSelectedQuestion]=useState([]);
    const [searchByTag,setSearchByTag]=useState(false);
    //Loader pour afficher un chargement si false
    const [loader,setLoader]=useState(false);


    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    //Condition qui verifie si le booleen modal est vrai ou faux, si vrai active le modal
    if(modal) {
        document.body.classList.add('active-modal')
        
    } else {
        document.body.classList.remove('active-modal')
    }

    //UseEffect qui entre en jeu lorsque le modal est activé, demande à la BD 
    //toute les questions de la session et les stock dans allSessionQuestion
    useEffect(() => {
        if(modal===true) {
            const fetchQuestion = async () => {
                try {
                    const response = await axiosPrivate.get(`/question`);
                    setAllSessionQuestion(response.data)
                    setLoader(true)
                } catch (err) {
                    console.log(err.response.status);
                }
            }
            fetchQuestion();
        }
    }, [modal,searchByTag,axiosPrivate])

    //UseEffect qui entre en jeux lorsque allSessionQuestion a été initialisé,
    //compare les question déja attaché et si une question est déja attaché 
    //lui attribue une variable attached=true
    useEffect(() => {
        allSessionQuestion.forEach(question => {
            attachedQuestion.forEach( attached=> {
                if(question._id===attached._id){
                    question["attached"]=true;
                }
            })
        });
    }, [allSessionQuestion,attachedQuestion])

    //UseEffect qui entre en jeux lorsque l'utilisateur tappe dans la barre de recherche
    //MEt les resultat de la recherche dans le tableau filteredResults
    useEffect(() => {
        const filteredResults = allSessionQuestion.filter((question) =>
            ((question.libelle).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [allSessionQuestion, search])


    //Fonction qui permer de reset le champs de saisie de la barre de recherche
    const resetModal =  () =>{
        setSearch('')
    }

    //FOnction qui insere ou suprrime du tableau selectedQuestion les question cochées ou décochées
    const handleCheck = (index,e,question) => {
        if(checkInputRef.current[index].checked===false){
            const questions = [...selectedQuestion, question];
            setSelectedQuestion(questions);
        }else{
            let questions=[];
            selectedQuestion.forEach(element => {
                if(element.id!==question.id){
                    questions.push(element);
                }
            });
            setSelectedQuestion(questions);
        }
    }



    //Soumission des questions à attacher
    const handleSubmit = (e) => {
        e.preventDefault();


        const attach = {quizzId: quizz_id ,
                    questionId : selectedQuestion[0]._id };
        console.log()    
        const fetchAttachQst = async () => {
            try{
                //Requete poste pour edit les données dans la BD
                const response = await axiosPrivate.post(`/quizz/question`,attach);
                if(response.status === 200) {
                    setQuestions(selectedQuestion)
                    toggleModal();
                    resetModal();
                }
            } catch (err){
                //Erreur affichée dans la console
                console.log(err.response.data.message)
            }
        }
        fetchAttachQst();
    }




    //Initialiser du useRef
    const checkInputRef = useRef([]);

    //Lorsque l'utilisateur clique sur le block de la question appel de la fonction handleCheck
    //et ajout de la class checked dans la liste de classe
    const handleLiClick=(index,e,question)=>{
        handleCheck(index,e,question)
        checkInputRef.current[index].checked=!checkInputRef.current[index].checked
        if(checkInputRef.current[index].checked===true){
            e.target.classList.add('checked')
        }else{
            e.target.classList.remove('checked')
        }
    }

    return (
            <>
                {modal &&
                    <div className="modal_question">
                        <div onClick={()=> {toggleModal();resetModal();}} className="overlay"></div>
                        <div className="modal_question_content">
                            <h2 className='modal_question_title'>Attacher des questions</h2>
                            <button className="close_question_modal" onClick={()=> {toggleModal();resetModal();}}>
                                X
                            </button>
                            {loader===true?
                                (<section className='attach_section'>
                                    <form className='filter_form' onSubmit={(e) => e.preventDefault()}>
                                        <InputComp 
                                            placeholder={"Rechercher une question"}
                                            setValue={setSearch}
                                            modalValue={search}
                                            inputType={"text"}
                                            required={false}
                                            erreur={""}
                                            className={'filter_field'}
                                        />
                                        <div className='filter_checkbox'>
                                            <input 
                                                type="checkbox"
                                                checked={searchByTag===true}
                                                onChange={()=>{setSearchByTag(!searchByTag)}}
                                            />
                                            <label >Rechercher avec les tags correspondant</label>
                                        </div>

                                        
                                    </form>
                                    <ul className='questions_list'>
                                        {searchByTag===false?(<h2>Toutes les questions</h2>):(<h2>Recherche par tags</h2>)}
                                        {/*Avec la methode map on regarde si une question est déja attaché ou non,
                                            si la question n'est pas attacher activation de l'option de cochage sinon disactivation*/ 
                                        searchResults.map((question,index) => 
                                            !question.attached ? 
                                            (<li key={index} onClick={(e)=>{handleLiClick(index,e,question)}}> 
                                                <input 
                                                    type="checkbox"
                                                    id={index} 
                                                    name={index} 
                                                    value={question.id}
                                                    ref={(question)=>checkInputRef.current[index] = question}
                                                />
                                                <label >{question.libelle}</label>
                                            </li>):(
                                                <li key={index} className="checked"> 
                                                    <input 
                                                        type="checkbox"
                                                        disabled
                                                    />
                                                    <label >{question.libelle}</label>
                                                </li>
                                            )

                                            
                                        )}
                                    </ul>
                                    <div className='btn_field'>
                                        <input type="submit" className='import_question_btn' value="Attacher" onClick={handleSubmit}/>
                                    </div>
                                </section>):
                                <div className="dot-flashing"></div>
                            }
                        </div>
                    </div>
                }
        </>
    )
}

export default ModalImportQuestion