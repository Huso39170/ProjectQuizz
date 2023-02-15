import Home from './pages/Home';
import Missing from './pages/Missing';
import Layout from './component/Layout/Layout';
import CreateUpdateQuizz from './pages/CreateUpdateQuizz';
import CreateUpdateQuestion from './pages/CreateUpdateQuestion';
import QuizzEtQuestion from './pages/QuizzEtQuestion';
import { Route,Routes,useNavigate} from 'react-router-dom';
import './App.css';
import MesQuizz from './pages/MesQuizz'
import MesQuestions from './pages/MesQuestions'
import MonCompte from './pages/MonCompte';
import { useEffect,useState } from 'react';


function App() {
	//Utilisation de la fonction usenavigate afin de rediriger l'utilisateur vers une autre page
	const navigate = useNavigate(); 
    const[isUserLoged,setIsUserLoged]=useState(false);


	useEffect(() => {
		const localToken=localStorage.getItem('token')
		let token;
		if(localToken===null || localToken===undefined){
			token = sessionStorage.getItem('token');
		}else{
			token = localToken;
		}

		if(token===null || token===undefined){
			navigate('/')
		}else{
			setIsUserLoged(true)
		}
		console.log(token)
	}, [navigate])

    return (
		<>
		<Routes>
			<Route path="/" element={<Layout/>}>
				<Route index element={<Home isUserLoged={isUserLoged}/>}/>
				<Route path="mesquizz" element={<MesQuizz/>}/>
				<Route path="mesquizz/creer" element={<CreateUpdateQuizz/>}/>
				<Route path="mesquizz/modifier/:id" element={<CreateUpdateQuizz/>}/>
				<Route path="mesquizz/question" element={<MesQuestions/>}/>
				<Route path="mesquizz/question/creer" element={<CreateUpdateQuestion/>}/>
				<Route path="mesquizz/question/modifier/:id" element={<CreateUpdateQuestion/>}/>
				<Route path="mesquizz/quizz/:id" element={<QuizzEtQuestion/>}/>
				<Route path="moncompte" element={<MonCompte/>}/>
				<Route path="*" element={<Missing/>} />
			</Route>
		</Routes>
		</>
    );
}

export default App;
