import React,{useEffect,useState} from 'react'
import api from '../../api/quizz'
import InputComp from '../Input/InputComp';
import './ModalImportQuestion.css'

const ModalImportQuestion = ({modal,toggleModal,setQuestions,attachedQuestion}) => {

    const [search,setSearch]= useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allSessionQuestion,setAllSessionQuestion]=useState([]);
    const [selectedQuestion,setSelectedQuestion]=useState([]);

    if(modal) {
        document.body.classList.add('active-modal')
        
    } else {
        document.body.classList.remove('active-modal')
    }


    /*const triQuestions = (data) =>{
        data.forEach(question => {
            attachedQuestion.forEach( attached=> {
                if(question.id===attached.id){
                    console.log(question.id)
                }
            })
        });
        setAllSessionQuestion(data);
    }*/

    useEffect(() => {
        if(modal===true){
            const fetchQuestion = async () => {
                try {
                    const response = await api.get(`/question`);
                    setAllSessionQuestion(response.data)
                } catch (err) {
                    console.log(err.response.status);
                }
            }
            fetchQuestion();
        }
    }, [modal])


    useEffect(() => {
        allSessionQuestion.forEach(question => {
            attachedQuestion.forEach( attached=> {
                if(question.id===attached.id){
                    question["attached"]=true;
                }
            })
        });
    }, [allSessionQuestion,attachedQuestion])

    useEffect(() => {
        const filteredResults = allSessionQuestion.filter((question) =>
            ((question.description).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [allSessionQuestion, search])


    const resetModal =  () =>{
        setSearch('')
    }

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

    const handleSubmit = () =>{
        setQuestions(selectedQuestion)
        toggleModal();
        resetModal();
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
                            </form>
                            <ul className='questions_list'>
                                {searchResults.map((question,index) => 
                                    !question.attached ? (<li key={index}>
                                        <input 
                                            type="checkbox"
                                            id={index} 
                                            name={index} 
                                            value={question.id}
                                            onChange={e=> {handleCheck(e,question)}}
                                        />
                                        <label >{question.description}</label>
                                    </li>):(
                                        <li key={index}>
                                            <input 
                                                type="checkbox"
                                                id={index} 
                                                name={index} 
                                                value={question.id}
                                                onChange={e=> {handleCheck(e,question)}}
                                                disabled
                                            />
                                            <label >{question.description} déja attaché</label>
                                        </li>
                                    )

                                    
                                )}
                            </ul>
                            <div className='btn_field'>
                                <input type="submit" className='import_question_btn' value="Attacher" onClick={handleSubmit}/>
                            </div>

                        </div>
                    </div>
                }
        </>
    )
}

export default ModalImportQuestion