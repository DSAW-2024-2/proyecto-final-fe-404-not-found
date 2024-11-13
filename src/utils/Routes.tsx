import EmailVerify from '../views/General/EmailVerify';
import HomeDrivers from '../views/General/HomeDrivers';
import HomePage from '../views/General/HomePage';
import InicialPage from '../views/General/InicialPage';
import LoadingPage from '../views/General/LoadingPage';
import SwitchPage from '../views/General/SwitchPage';
import ViewTermsAndConditions from '../views/General/TermsCondition';
import ProfileCar from '../views/ManageCar/ProfileCar';
import RegisterCar from '../views/ManageCar/RegisterCar';
import CreateTrip from '../views/ManageTrips/CreateTrip';
import InfoTrip from '../views/ManageTrips/InfoTrip';
import LogInUser from '../views/ManageUser/LogInUser';
import ProfileUser from '../views/ManageUser/ProfileUser';
import RecoverAccoount from '../views/ManageUser/RecoverAccount';
import RegisterUser from '../views/ManageUser/RegisterUser';

const routesList = [
	{
		name: 'LoadingPage',
		path: '/loading-page',
		component: LoadingPage,
		filter: 'General',
	},
	{
		name: 'Conditions',
		path: '/terms-and-conditions',
		component: ViewTermsAndConditions,
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
		name: 'EmailVerify',
		path: '/verify-email',
		component: EmailVerify,
		filter: 'notAuthenticated',
	},
	{
		name: 'RecoverPassword',
		path: '/recover-password',
		component: RecoverAccoount,
		filter: 'notAuthenticated',
	},
	{
		name: 'HomePage',
		path: '/home',
		component: HomePage,
		filter: 'authenticated',
	},
	{
		name: 'HomeDriver',
		path: '/driver',
		component: HomeDrivers,
		filter: 'authenticated',
	},
	{
		name: 'ProfileCar',
		path: '/car-profile',
		component: ProfileCar,
		filter: 'authenticated',
	},
	{
		name: 'RegisterCar',
		path: '/car-register',
		component: RegisterCar,
		filter: 'authenticated',
	},
	{
		name: 'CreateTrip',
		path: '/trip-create',
		component: CreateTrip,
		filter: 'authenticated',
	},
	{
		name: 'InfoTrip',
		path: '/trip-info',
		component: InfoTrip,
		filter: 'authenticated',
	},
	{
		name: 'ProfileUser',
		path: '/user-profile',
		component: ProfileUser,
		filter: 'authenticated',
	},
];

const searchRoute = (name: string) => {
	return routesList.find((route) => route.name === name);
};

export { routesList, searchRoute };
