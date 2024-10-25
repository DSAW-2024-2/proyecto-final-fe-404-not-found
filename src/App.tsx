// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
	return (
		<>
			<div>
				<RegisterUser />
			</div>
			<Router>
				<Routes>
					<Route path='/LoadingPage' element={<LoadingPage />} />
					<Route path='/InicialPage' element={<InicialPage />} />
					<Route path='/Home' element={<HomePage />} />
					<Route path='/SwitchPage' element={<SwitchPage />} />
					<Route path='/Car/Info' element={<ProfileCar />} />
					<Route path='/Car/Register' element={<RegisterCar />} />
					<Route path='/Trip/Create' element={<CreateTrip />} />
					<Route path='/Trip/Info' element={<InfoTrip />} />
					<Route path='/User/Login' element={<LogInUser />} />
					<Route path='/User/Register' element={<RegisterUser />} />
					<Route path='/SwitchPage' element={<SwitchPage />} />

					<Route element={<ProtectedRoutes />}>
						<Route path='/Home' element={<HomePage />} />
						<Route path='/Car/Info' element={<ProfileCar />} />
						<Route path='/Car/Register' element={<RegisterCar />} />
						<Route path='/Trip/Create' element={<CreateTrip />} />
						<Route path='/Trip/Info' element={<InfoTrip />} />
						<Route path='/User/Info' element={<ProfileUser />} />
						<Route path='/User/Info/Recover' element={<RecoverAccount />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
