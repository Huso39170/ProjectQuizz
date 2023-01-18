import './MesQuizz.css'
import { FaPlay, FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsFillFileEarmarkArrowUpFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import  { useState, useEffect } from 'react'


function MesQuizz() {

/* Barre de recherche dynamique */
const [datas, setDatas] = useState([]);
const [searchTerm, setSearchTerm] = useState('');


useEffect(() => {
  //fake api
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setDatas(json))
      
}, []);

const handleSearchTerm = (e) => {
  let value = e.target.value;
  setSearchTerm(value);
}

/* Clique CREER QUIZZ */
const [createQuizz, setCreateQuizz] = useState(false);

const handleCreateQuizz = () => {
  setCreateQuizz(!createQuizz);
  console.log(createQuizz);
}


return (
    <div className='content_main'>
        {datas.length ? (
        <>
            <div className='add_quizz'>
              <button className='add_button_quizz' onClick={handleCreateQuizz}>CRÉER UN QUIZZ</button>
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
                    return val.title.includes(searchTerm);
                  })
                  .map((val) => {
                    return (
                      <li className='quizz' key={val.id}>
                        <p className='quizz_name'>{val.title}</p>
                        <button className='play_button' title='Démarrer'> <FaPlay className='Fa' alt='play button' /> </button>
                        <button className='edit_button' title='Modifier'> <FaEdit className='Fa' alt='edit button' /> </button>
                        <button className='stats_button' title='Statistiques'> <FaEye className='Fa' alt='statistical button' /> </button>
                        <button className='del_button' title='Supprimer'> <FaTrashAlt className='FaTrash' alt='' delete button /> </button>
                      </li>
                    )
                })}
              </ul>
            </div>
            <button className='add_button_bis'>CRÉER UN QUIZZ</button>
        </>
          
      ) : (
        
        <>
          <p className='empty_quizz'>VOUS N'AVEZ PAS ENCORE DE QUIZZ</p>
          <button  className='add_button_quizz' onClick={handleCreateQuizz}>CRÉER UN QUIZZ</button>
        </>
        
        
      )}

    <div className={createQuizz ? 'creation' : 'creation_hidden'}>
      <ImCross className='cross_creation_quizz' role='button' onClick={handleCreateQuizz}/>
      <div className='creation_quizz'>
        <h2>Créer ou importer un quiz</h2>
        <section className='new_import'>
          <button><AiOutlineFileAdd className='icons'/></button>
          <p>Nouveau Quiz</p>
        </section>
        <section className='new_import'>
          <button><BsFillFileEarmarkArrowUpFill className='icons'/></button>
          <p>Importer un Quiz</p>
        </section>
      </div>
    </div>
  
    </div>
  )
}

export default MesQuizz
