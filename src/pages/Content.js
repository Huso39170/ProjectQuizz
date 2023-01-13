import React from 'react'
import './Content.css'
import { FaPlay, FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'
import  { useState } from 'react'


const Content = () => {

  /* Simulation de données de quizz en dur */

  const [quizz] = useState([
    {
      id : 1,
      name : "Le quizz un",
      desciption : "La description du quizz un"
    },

    {
      id : 2,
      name : "Le quizz deux",
      desciption : "La description du quizz deux"
    },

    {
      id : 3,
      name : "Le quizz trois",
      desciption : "La description du quizz trois"
    }
  ]);




  return (
    <div className='content_main'>
      {quizz.length ? (
        <><div className='search'>
          <input type='text' className='search__input' placeholder='Rechercher...' />
          <button className='search__button'>
            <svg className='search__icon' aria-hidden='true' viewBox='0 0 24 24'>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div><div className='quizz_display'>
            <ul>
              {quizz.map((item) => (
                <li className='quizz' key={item.id}>
                  <p className='quizz_name'>{item.name}</p>
                  <button className='play_button' title='Démarrer'> <FaPlay className='Fa' alt='play button' /> </button>
                  <button className='edit_button' title='Modifier'> <FaEdit className='Fa' alt='edit button' /> </button>
                  <button className='stats_button' title='Statistiques'> <FaEye className='Fa' alt='statistical button' /> </button>
                  <button className='del_button' title='Supprimer'> <FaTrashAlt className='FaTrash' alt='' delete button /> </button>

                </li>
              ))}
            </ul>
          </div>
          <button className='add_button_bis'>CRÉER UN QUIZZ</button></>
          
      ) : (
        
        <>
          <p className='empty_quizz'>VOUS N'AVEZ PAS ENCORE DE QUIZZ</p>
          <button  className='add_button_content'>CRÉER UN QUIZZ</button>
        </>
        
        
      )}
     
        

    </div>
  )
}

export default Content
