import React,{useEffect,useState,useRef} from 'react'
import api from '../../api/quizz'
import InputComp from '../Input/InputComp';
import './ModalImportQuestion.css'
import '../Loader/Loader.css'

const ModalImportQuestion = ({modal,toggleModal,setQuestions,attachedQuestion}) => {


    //Initialisation des champs de saisie de recherche, des resultats de la recherche,
    // du tableau des question récuperée dans la bd ainsi que les questions selectionné
    const [search,setSearch]= useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allSessionQuestion,setAllSessionQuestion]=useState([]);
    const [selectedQuestion,setSelectedQuestion]=useState([]);
    const [searchByTag,setSearchByTag]=useState(false);
    //Loader pour afficher un chargement si false
    const [loader,setLoader]=useState(false);

    //Condition qui verifie si le booleen modal est vrai ou faux, si vrai active le modal
    if(modal) {
        document.body.classList.add('active-modal')
        
    } else {
        document.body.classList.remove('active-modal')
    }

    //UseEffect qui entre en jeu lorsque le modal est activé, demande à la BD 
    //toute les questions de la session et les stock dans allSessionQuestion
    useEffect(() => {
        if(modal===true){
            const fetchQuestion = async () => {
                try {
                    const response = await api.get(`/question`);
                    setAllSessionQuestion(response.data)
                    setLoader(true)
                } catch (err) {
                    console.log(err.response.status);
                }
            }
            fetchQuestion();
        }
    }, [modal,searchByTag])

    //UseEffect qui entre en jeux lorsque allSessionQuestion a été initialisé,
    //compare les question déja attaché et si une question est déja attaché 
    //lui attribue une variable attached=true
    useEffect(() => {
        allSessionQuestion.forEach(question => {
            attachedQuestion.forEach( attached=> {
                if(question.id===attached.id){
                    question["attached"]=true;
                }
            })
        });
    }, [allSessionQuestion,attachedQuestion])

    //UseEffect qui entre en jeux lorsque l'utilisateur tappe dans la barre de recherche
    //MEt les resultat de la recherche dans le tableau filteredResults
    useEffect(() => {
        const filteredResults = allSessionQuestion.filter((question) =>
            ((question.description).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [allSessionQuestion, search])


    //Fonction qui permer de reset le champs de saisie de la barre de recherche
    const resetModal =  () =>{
        setSearch('')
    }

    //FOnction qui insere ou suprrime du tableau selectedQuestion les question cochées ou décochées
    const handleCheck = (e,question) => {
        if(e.target.checked===true){
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
    const handleSubmit = (e) =>{
        e.preventDefault();
        setQuestions(selectedQuestion)
        toggleModal();
        resetModal();
    }

    const checkInputRef = useRef([]);

    const handleLiClick=()=>{
        console.log(checkInputRef.current)

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
                                        <input 
                                            type="checkbox"
                                            checked={searchByTag===true}
                                            onChange={()=>{setSearchByTag(!searchByTag)}}
                                        />
                                        <label >Rechercher avec les tags correspondant</label>
                                    </form>

                                    <ul className='questions_list'>
                                        <h2>Toutes les questions</h2>
                                        {/*Avec la methode map on regarde si une question est déja attaché ou non,
                                            si la question n'est pas attacher activation de l'option de cochage sinon disactivation*/ 
                                        searchResults.map((question,index) => 
                                            !question.attached ? 
                                            (<li key={index} onClick={()=>{handleLiClick(index)}}> 
                                                <input 
                                                    type="checkbox"
                                                    id={index} 
                                                    name={index} 
                                                    value={question.id}
                                                    onChange={e=> {handleCheck(e,question)}}
                                                    ref={(question)=>checkInputRef.current[index] = question}
                                                />
                                                <label >{question.description.substring(0, 45).concat('...')}</label>
                                            </li>):(
                                                <li key={index} > 
                                                    <input 
                                                        type="checkbox"
                                                        id={index} 
                                                        name={index} 
                                                        value={question.id}
                                                        disabled
                                                    />
                                                    <label >{question.description.substring(0, 45).concat('...')} déja attaché</label>
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