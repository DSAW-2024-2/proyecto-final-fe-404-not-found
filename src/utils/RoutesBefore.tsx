import { Outlet, Navigate } from 'react-router-dom';
import { searchRoute } from './Routes/Routes';
import { prefix } from './Routes/Prefix';

const ProtectedRoutes = () => {
	const user = localStorage.getItem('token');
	return !user ? (
		<Outlet />
	) : (
		<Navigate to={searchRoute('HomePage')?.path || prefix} />
	);
};

export default ProtectedRoutes;
