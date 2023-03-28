// Importer les hooks et les composants nécessaires
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
import { SocketProvider } from './context/SocketProvider';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizzStat from './pages/QuizzStat';
import QuizzStatDetail from './pages/QuizzStatDetail';

function App() {
	//Mise a true si l'utilisateur est connecté
    const[isUserLoged,setIsUserLoged]=useState(false);
	//Récupération des informations d'authentification
	const {auth} = useAuth();

	//Mis à jour de isUserLoged si l'utilisateur se connecte
	useEffect(() => {
		if(auth.accessToken){
			setIsUserLoged(true)
		}
	}, [auth])

    return (
		<>
		<SocketProvider>
			<Routes>
				<Route path="/" element={<Layout/>}>
						<Route element={<PersistLogin />}>
							<Route index element={<Home isUserLoged={isUserLoged}/>}/>
							<Route element={<RequireAuth/>}>
								<Route path="mesquizz" element={<MesQuizz/>}/>
								<Route path="mesquizz/creer" element={<CreateUpdateQuizz/>}/>
								<Route path="mesquizz/modifier/:id" element={<CreateUpdateQuizz/>}/>
								<Route path="mesquizz/question" element={<MesQuestions/>}/>
								<Route path="mesquizz/question/creer" element={<CreateUpdateQuestion/>}/>
								<Route path="mesquizz/question/modifier/:id" element={<CreateUpdateQuestion/>}/>
								<Route path="mesquizz/quizz/:id" element={<QuizzEtQuestion/>}/>
								<Route path="mesquizz/stat/:id" element={<QuizzStat/>}/>
								<Route path="mesquizz/stat/details/:id" element={<QuizzStatDetail/>}/>
								<Route path="moncompte" element={<MonCompte/>}/>
								<Route path="play/admin/:quizzCode" element={<PlayQuizzAdminView/>}/>
							</Route>
						</Route>
					<Route path="play/end" element={<QuizzFinish/>}/>
					<Route path="play/quizz/:quizzCode" element={<PlayQuizz/>}/>
					<Route path="*" element={<Missing/>} />
				</Route>
				
			</Routes>
		</SocketProvider>
		<ToastContainer />
		</>
    );
}

export default App;
