import {useState,useEffect} from 'react';
import Home from './pages/Home';
import Missing from './pages/Missing';
import Layout from './component/Layout/Layout';
import CreateUpdateQuizz from './pages/CreateUpdateQuizz';
import CreateUpdateQuestion from './pages/CreateUpdateQuestion';
import QuizzEtQuestion from './pages/QuizzEtQuestion';
import { Route,Routes} from 'react-router-dom';
import './App.css';
import MesQuizz from './pages/MesQuizz'
import MesQuestions from './pages/MesQuestions'
import MonCompte from './pages/MonCompte';
import RequireAuth from './component/Auth/RequireAuth';
import useAuth from "./hooks/useAuth";
import PersistLogin from './component/Auth/PersistLogin';
import PlayQuizz from './pages/PlayQuizz/PlayQuizz';
import PlayQuizzAdminView from './pages/PlayQuizz/PlayQuizzAdminView';
import QuizzFinish from './pages/PlayQuizz/QuizzFinish';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client'

function App() {
	//Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const[isUserLoged,setIsUserLoged]=useState(false);
	const {auth} = useAuth();

	const socket = io.connect("http://localhost:3001")

	//Verification si un utilisateur est connecté si oui on change la navbar
	useEffect(() => {
		if(auth.accessToken){
			setIsUserLoged(true)
		}
	}, [auth])

    return (
		<>
		<Routes>
			<Route path="/" element={<Layout/>}>
					<Route element={<PersistLogin />}>
						<Route index element={<Home isUserLoged={isUserLoged}/>}/>
						<Route element={<RequireAuth/>}>
							<Route path="mesquizz" element={<MesQuizz socket={socket}/>}/>
							<Route path="mesquizz/creer" element={<CreateUpdateQuizz/>}/>
							<Route path="mesquizz/modifier/:id" element={<CreateUpdateQuizz/>}/>
							<Route path="mesquizz/question" element={<MesQuestions/>}/>
							<Route path="mesquizz/question/creer" element={<CreateUpdateQuestion/>}/>
							<Route path="mesquizz/question/modifier/:id" element={<CreateUpdateQuestion/>}/>
							<Route path="mesquizz/quizz/:id" element={<QuizzEtQuestion/>}/>
							<Route path="play/quizz/:id" element={<PlayQuizz/>}/>
							<Route path="moncompte" element={<MonCompte/>}/>
							<Route path="play/admin/:quizzCode" element={<PlayQuizzAdminView socket={socket}/>}/>
							<Route path="play/end" element={<QuizzFinish/>}/>


						</Route>
					</Route>
				<Route path="*" element={<Missing/>} />
			</Route>
			
		</Routes>
		<ToastContainer />
		</>
    );
}

export default App;
