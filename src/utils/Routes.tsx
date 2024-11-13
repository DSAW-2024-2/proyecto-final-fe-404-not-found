import EmailVerify from '../views/General/EmailVerify';
import HomeDrivers from '../views/General/HomeDrivers';
import HomePage from '../views/General/HomePage';
import InicialPage from '../views/General/InicialPage';
import LoadingPage from '../views/General/LoadingPage';
import SwitchPage from '../views/General/SwitchPage';
import ProfileCar from '../views/ManageCar/ProfileCar';
import RegisterCar from '../views/ManageCar/RegisterCar';
import CreateTrip from '../views/ManageTrips/CreateTrip';
import InfoTrip from '../views/ManageTrips/InfoTrip';
import LogInUser from '../views/ManageUser/LogInUser';
import ProfileUser from '../views/ManageUser/ProfileUser';
import RegisterUser from '../views/ManageUser/RegisterUser';

const routesList = [
	{
		name: 'LoadingPage',
		path: '/loading-page',
		component: LoadingPage,
		filter: 'General',
	},
	{
		name: 'SwitchPage',
		path: '/switch-page',
		component: SwitchPage,
		filter: 'General',
	},
	{
		name: 'InicialPage',
		path: '/',
		component: InicialPage,
		filter: 'General',
	},
	{
		name: 'Login',
		path: '/login',
		component: LogInUser,
		filter: 'notAuthenticated',
	},
	{
		name: 'Register',
		path: '/register',
		component: RegisterUser,
		filter: 'notAuthenticated',
	},
	{
		name: 'Verify',
		path: '/verify-email',
		component: EmailVerify,
		filter: 'notAuthenticated',
	},
	{
		name: 'Home',
		path: '/home',
		component: HomePage,
		filter: 'authenticated',
	},
	{
		name: 'Driver',
		path: '/driver',
		component: HomeDrivers,
		filter: 'authenticated',
	},
	{
		name: 'CarProfile',
		path: '/car-profile',
		component: ProfileCar,
		filter: 'authenticated',
	},
	{
		name: 'CarRegister',
		path: '/car-register',
		component: RegisterCar,
		filter: 'authenticated',
	},
	{
		name: 'TripCreate',
		path: '/trip-create',
		component: CreateTrip,
		filter: 'authenticated',
	},
	{
		name: 'TripInfo',
		path: '/trip-info',
		component: InfoTrip,
		filter: 'authenticated',
	},
	{
		name: 'UserProfile',
		path: '/user-profile',
		component: ProfileUser,
		filter: 'authenticated',
	},
];

export default routesList;
