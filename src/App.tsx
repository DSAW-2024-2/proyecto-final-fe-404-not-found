// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Importación de vistas
import InicialPage from './views/General/InicialPage';
import SwitchPage from './views/General/SwitchPage';
import HomePage from './views/General/HomePage';
import ProfileCar from './views/ManageCar/ProfileCar';
import RegisterCar from './views/ManageCar/RegisterCar';
import CreateTrip from './views/ManageTrips/CreateTrip';
import LogInUser from './views/ManageUser/LogInUser';
import RecoverAccount from './views/ManageUser/RecoverAccount';
import RegisterUser from './views/ManageUser/RegisterUser';
import ProfileUser from './views/ManageUser/ProfileUser';
import InfoTrip from './views/ManageTrips/InfoTrip';
import LoadingPage from './views/General/LoadingPage';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
	useEffect(() => {
		// Establece la URL de la API en el localStorage solo una vez al cargar
		localStorage.setItem(
			'API',
			'https://proyecto-final-be-404-not-found-befi8md2q-maosuarezs-projects.vercel.app'
		);
	}, []); // Dependencia vacía para que se ejecute solo una vez

	return (
		<Router>
			<Routes>
				<Route path='/' element={<InicialPage />} />
				<Route path='/loadingpage' element={<LoadingPage />} />
				<Route path='/SwitchPage' element={<SwitchPage />} />
				<Route path='/User/Login' element={<LogInUser />} />
				<Route path='/User/Register' element={<RegisterUser />} />
				<Route path='/User/Info/Recover' element={<RecoverAccount />} />

				<Route element={<ProtectedRoutes />}>
					<Route path='/Home' element={<HomePage />} />
					<Route path='/Car/Info' element={<ProfileCar />} />
					<Route path='/Car/Register' element={<RegisterCar />} />
					<Route path='/Trip/Create' element={<CreateTrip />} />
					<Route path='/Trip/Info' element={<InfoTrip />} />
					<Route path='/User/Info' element={<ProfileUser />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
