import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<AuthProvider>
			<Routes>
				<Route path="/*" element={<App/>}/>
			</Routes>
		</AuthProvider>
	</Router>
);

