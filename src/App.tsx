// import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Prueba from './components/prueba';
import Accept from './components/Buttons/Accept';
import Delete from './components/Buttons/Delete';
import SignInUser from './views/ManageUser/RegisterUser';
import InicialPage from './views/General/InicialPage';
import SwitchPage from './views/General/SwitchPage';
import LoadingPage from './views/General/LoadingPage';
import HomePage from './views/General/HomePage';
import ProfileCar from './views/ManageCar/ProfileCar';
import RegisterCar from './views/ManageCar/RegisterCar';
import CreateTrip from './views/ManageTrips/CreateTrip';
import LogInUser from './views/ManageUser/LogInUser';
import RecoverAccount from './views/ManageUser/RecoverAccount';
import RegisterUser from './views/ManageUser/RegisterUser';
import ProfileUser from './views/ManageUser/ProfileUser';
import InfoTrip from './views/ManageTrips/InfoTrip';
import Circular from './components/Buttons/Circular';

function App() {
	return (
		<>
			<div>
				<CreateTrip />
			</div>
			<Router>
				<Routes>
					<Route path='/InicialPage' element={<InicialPage />} />
					<Route path='/Home' element={<HomePage />} />
					<Route path='/SwitchPage' element={<SwitchPage />} />
					<Route path='/LoadingPage' element={<LoadingPage />} />
					<Route path='/Car/Info' element={<ProfileCar />} />
					<Route path='/Car/Register' element={<RegisterCar />} />
					<Route path='/Trip/Create' element={<CreateTrip />} />
					<Route path='/Trip/Info' element={<InfoTrip />} />
					<Route path='/User/Login' element={<LogInUser />} />
					<Route path='/User/Info' element={<ProfileUser />} />
					<Route path='/User/Info/Recover' element={<RecoverAccount />} />
					<Route path='/User/Register' element={<RegisterUser />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
