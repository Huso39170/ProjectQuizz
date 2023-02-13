import React, {useState} from 'react'
import './home.css'
import ModalSubLog from '../component/Modal/ModalSubLog'
import {useNavigate} from 'react-router-dom';
import Navbar from '../component/Layout/Navbar';

const Home = () => {
    //Fonction qui gere la soumission du formulaire
    const handleSubmit = (e) => {
        //Empeche la page de se rafraichir lorsque l'on soumet un formulaire
        e.preventDefault();
    }
    const[modal,setModal]= useState(false);
    const[isLoginClicked,setIsLoginClicked]=useState(false);
    const[isUserLoged]=useState(false);

    //Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();



    /*la fonction toggleModal est appelée avec l'argument login 
    qui détermine si la modale doit afficher le formulaire de 
    connexion ou d'inscription*/
    const toggleModal = (login) =>{
        //Inverse le bollean de modal
        setModal(!modal);
        //Passe true si le bouton login est cliqué
        //Passe false si le bouton inscription est cliqué
        setIsLoginClicked(login);
    }


    return (
        <main className='home'>
            <div className='home_page_pt1'>
                <Navbar isUserLoged={isUserLoged} toggleModal={toggleModal}/>
                <section className='presentation'>
                    <h1>Créer rapidement et gratuitement votre quiz interactif en ligne</h1>
                </section>
                {isUserLoged===false &&
                    <div className='sub_section'>
                        <a href=" "  onClick={e=> {e.preventDefault(); toggleModal(false)}} className="sub_button">Inscription </a>
                    </div>
                }
                <section className='etape'>
                    <h2>Seulement quelques étapes :</h2>
                    <ul className='etape_liste'>
                        <li>
                            1  Créer un quiz
                        </li>
                        <li>
                            2  Partager le
                        </li>
                        <li>
                            3  Lancer le quiz
                        </li>
                    </ul>
                </section>
            </div>

            <div className="home_page_pt2">
                <section className='wave_container'>
                    <svg width="100%" height="600px" preserveAspectRatio="none" className='wave' viewBox="0 0 500 500">
                        <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"></path>
                    </svg>    
                </section>
                <section className='join'>
                    <h2>
                        Rejoindre une partie : 
                    </h2>
                    <form className='join_form' onSubmit={handleSubmit}>
                        <input className='join_text' placeholder='Entrez le code' type="text" name="name" />
                        <input className='join_submit' type="submit" value="Submit" />
                    </form>
                </section>
            </div>
            <ModalSubLog 
                modal={modal} 
                toggleModal={toggleModal}
                isLoginClicked={isLoginClicked}
            />
        </main>

    )
}

export default Home
