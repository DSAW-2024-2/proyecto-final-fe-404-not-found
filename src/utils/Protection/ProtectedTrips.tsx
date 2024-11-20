import { Outlet, Navigate } from 'react-router-dom';
import { prefix, searchRoute } from '../Routes';
import { useState, useEffect } from 'react';
import LoadingPage from '../../views/General/LoadingPage';

const ProtectedTrips = () => {
	const [loading, setLoading] = useState(true); // Estado para controlar el loading
	const [pass, setPass] = useState(false); // Estado para controlar el acceso

	useEffect(() => {
		// Función para manejar la lógica del fetch
		const checkAccess = async () => {
			try {
				const response = await fetch(`${localStorage.getItem('API')}/trip`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				const data = await response.json();

				if (response.ok) {
					setPass(false); // Permitir acceso si la respuesta es válida
					localStorage.setItem('tripId', data._id);
				} else {
					setPass(true); // Denegar acceso si la respuesta no es válida
				}
			} catch (error) {
				console.error('Error al verificar el acceso:', error);
				setPass(false); // Denegar acceso si ocurre un error
			} finally {
				setLoading(false); // Desactivar el loading en cualquier caso
			}
		};

		checkAccess(); // Llamar a la función
	}, []); // Ejecutar solo una vez al montar el componente

	// Mientras esté cargando, mostrar la página de carga
	if (loading) {
		return <LoadingPage />;
	}

	// Si tiene acceso, renderizar el contenido protegido
	if (pass && localStorage.getItem('token') && localStorage.getItem('car')) {
		return <Outlet />;
	}

	// Si no tiene acceso, redirigir al HomePage
	return <Navigate to={searchRoute('HomePage')?.path || prefix} />;
};

export default ProtectedTrips;
