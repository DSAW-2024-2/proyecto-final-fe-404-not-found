import { Outlet, Navigate } from 'react-router-dom';
import { prefix, searchRoute } from './Routes';

const ProtectedRoutes = () => {
	const user = localStorage.getItem('token');
	return user ? (
		<Outlet />
	) : (
		<Navigate to={searchRoute('Login')?.path || prefix} />
	);
};

export default ProtectedRoutes;
