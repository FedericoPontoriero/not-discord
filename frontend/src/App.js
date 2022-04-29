import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import LoginPage from './authPages/LoginPage/LoginPage';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import Dashboard from './authPages/Dashboard/Dashboard';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path='/login' element={<LoginPage />} />
					<Route exact path='/register' element={<RegisterPage />} />
					<Route exact path='/dashboard' element={<Dashboard />} />
					<Route path='' element={<Navigate replace to='/dashboard' />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
