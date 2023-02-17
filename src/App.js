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


function App() {
	//Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
    const[isUserLoged,setIsUserLoged]=useState(false);
	const {auth} = useAuth();

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
							<Route path="mesquizz" element={<MesQuizz/>}/>
							<Route path="mesquizz/creer" element={<CreateUpdateQuizz/>}/>
							<Route path="mesquizz/modifier/:id" element={<CreateUpdateQuizz/>}/>
							<Route path="mesquizz/question" element={<MesQuestions/>}/>
							<Route path="mesquizz/question/creer" element={<CreateUpdateQuestion/>}/>
							<Route path="mesquizz/question/modifier/:id" element={<CreateUpdateQuestion/>}/>
							<Route path="mesquizz/quizz/:id" element={<QuizzEtQuestion/>}/>
							<Route path="moncompte" element={<MonCompte/>}/>
						</Route>
					</Route>
					
				<Route path="*" element={<Missing/>} />
			</Route>
		</Routes>
		</>
    );
}

export default App;
