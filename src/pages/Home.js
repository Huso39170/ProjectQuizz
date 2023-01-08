import React, {useState} from 'react'
import './home.css'
import ModalSubLog from '../component/Modal/ModalSubLog'
const Home = () => {
    //Fonction qui gere la soumission du formulaire
    const handleSubmit = (e) => {
        //Empeche la page de se rafraichir lorsque l'on soumet un formulaire
        e.preventDefault();
    }


    const[modal,setModal]= useState(false);

    const[isLogin,setIsLogin]=useState(false);


    /*la fonction toggleModal est appelée avec l'argument login 
    qui détermine si la modale doit afficher le formulaire de 
    connexion ou d'inscription*/
    const toggleModal = (login) =>{
        //Inverse le bollean de modal
        setModal(!modal);
        //Passe true si le bouton login est cliqué
        //Passe false si le bouton inscription est cliqué
        setIsLogin(login);
    }


    return (
        <main >
            <div className='home_page_pt1'>
                <header className='navbar'>
                    <h2>Quizzeo</h2>
                    <a href=" " onClick={e=> {e.preventDefault(); toggleModal(true)}} className="login_button">Connexion</a>
                </header>
                <section className='presentation'>
                    <h1>Créez rapidement et gratuitement votre quizz interactif en ligne</h1>
                </section>
                <div className='sub_section'>
                    <a href=" "  onClick={e=> {e.preventDefault(); toggleModal(false)}} className="sub_button">Inscription </a>
                </div>
                <section className='etape'>
                    <h2>Seulement quelques étapes :</h2>
                    <ul className='etape_liste'>
                        <li>
                            1  Creéz un quizz
                        </li>
                        <li>
                            2  Partagez le
                        </li>
                        <li>
                            3  Lancer le quizz
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
                        Rejoignez une partie : 
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
                isLogin={isLogin}
            />


            

        </main>

    )
}

export default Home
