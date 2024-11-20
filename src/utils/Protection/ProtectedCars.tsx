import { Outlet, Navigate } from 'react-router-dom';
import { prefix, searchRoute } from '../Routes';
import { useState, useEffect } from 'react';
import SwitchPage from '../../views/General/SwitchPage';

const ProtectedCar = () => {
	const [loading, setLoading] = useState(true); // Estado para controlar el loading
	const [pass, setPass] = useState(false); // Estado para controlar el acceso

	useEffect(() => {
		// Función para manejar la lógica del fetch
		const checkAccess = async () => {
			try {
				const response = await fetch(`${localStorage.getItem('API')}/car`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});

				if (response.ok) {
					setPass(true); // Permitir acceso si la respuesta es válida
					localStorage.setItem('car', 'true');
				} else {
					setPass(false); // Denegar acceso si la respuesta no es válida
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
		return <SwitchPage />;
	}

	// Si tiene acceso, renderizar el contenido protegido
	if (pass) {
		return <Outlet />;
	}

	// Si no tiene acceso, redirigir al HomePage
	return <Navigate to={searchRoute('HomePage')?.path || prefix} />;
};

export default ProtectedCar;
