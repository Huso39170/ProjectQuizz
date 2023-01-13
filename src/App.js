import Home from './pages/Home';
import Missing from './pages/Missing';
import Layout from './component/Layout/Layout';
import CreateUpdateQuizz from './pages/CreateUpdateQuizz';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import MesQuizz from './pages/MesQuizz'

function App() {
    return (
		<>
		<Routes>
			<Route path="/" element={<Layout/>}>
				<Route index element={<Home/>}/>
				<Route path="mesquizz" element={<MesQuizz/>}/>
				<Route path="mesquizz/creer" element={<CreateUpdateQuizz/>}/>
				<Route path="mesquizz/modifier/:id" element={<CreateUpdateQuizz/>}/>
				<Route path="*" element={<Missing/>} />
			</Route>
		</Routes>
		</>
    );
}

export default App;
