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
import RoutesBefore from './utils/RoutesBefore';
import ViewTermsAndConditions from './views/General/TermsCondition';
import HomeDrivers from './views/General/HomeDrivers';
import EmailVerify from './views/General/EmailVerify';

function App() {
	useEffect(() => {
		// Establece la URL de la API en el localStorage solo una vez al cargar
		localStorage.setItem('API', 'http://149.130.182.245:3001/api-wheels/v1');
	}, []); // Dependencia vacía para que se ejecute solo una vez

	return (
		<Router>
			{/* Contenedor principal con padding y fondo general */}
			<div className=''>
				<Routes>
					<Route path='/loadingpage' element={<LoadingPage />} />
					<Route path='/SwitchPage' element={<SwitchPage />} />
					<Route path='/' element={<InicialPage />} />
					<Route path='/condiciones' element={<ViewTermsAndConditions />} />

					{/* Rutas antes de autenticarse (login, registro, etc.) */}
					<Route element={<RoutesBefore />}>
						<Route path='/User/Login' element={<LogInUser />} />
						<Route path='/verify' element={<EmailVerify />} />
						<Route path='/User/Register' element={<RegisterUser />} />
						<Route path='/User/Info/Recover' element={<RecoverAccount />} />
					</Route>
					{/* Rutas protegidas */}
					<Route element={<ProtectedRoutes />}>
						<Route path='/home' element={<HomePage />} />
						<Route path='/driver' element={<HomeDrivers />} />
						<Route path='/car/info' element={<ProfileCar />} />
						<Route path='/car/register' element={<RegisterCar />} />
						<Route path='/trip/create' element={<CreateTrip />} />
						<Route path='/trip/info' element={<InfoTrip />} />
						<Route path='/user/info' element={<ProfileUser />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
