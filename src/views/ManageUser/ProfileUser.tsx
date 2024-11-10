import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button2 from '../../components/Buttons/TextButton';

const UserProfile: React.FC = () => {
	const [userData, setUserData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const data = await fetchProfileData('user', setErrorMessage);
				if (data) {
					setUserData(data);
				}
			} catch (error) {
				setErrorMessage(`Failed to load data: ${error}`);
			} finally {
				setLoading(false);
			}
		};
		loadUserData();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	const handleDeleteAccount = async () => {
		const result = await Swal.fire({
			title: '¿Estás seguro?',
			text: 'Esta acción eliminará tu cuenta de forma permanente.',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#6D9773',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar cuenta',
			cancelButtonText: 'Cancelar',
		});

		if (result.isConfirmed) {
			try {
				setLoading(true);
				const url = `${localStorage.getItem('API')}/user`;
				const token = localStorage.getItem('token');

				const response = await fetch(url, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					Swal.fire('Eliminada', 'Tu cuenta ha sido eliminada.', 'success');
					handleLogout();
				} else {
					Swal.fire(
						'Error',
						'No se pudo eliminar tu cuenta. Intenta de nuevo.',
						'error'
					);
				}
			} catch (error) {
				console.error('Error al eliminar la cuenta:', error);
				Swal.fire('Error', 'Hubo un problema al eliminar tu cuenta.', 'error');
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className='container p-4 max-w-80'>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div>
					<div className='flex gap-x-[65px]'>
						<Link to='/home'>
							<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
						</Link>
						<div className='w-[120px] h-[120px] mt-5 border rounded-full border-black'>
							<img src='' alt='' />
						</div>
					</div>

					<h1 className='text-center'>Perfil</h1>
					<br />
					{userData ? (
						<div className='ml-5'>
							<p>Nombre: {userData.name}</p>
							<p>Apellido: {userData.lastName}</p>
							<p>Email: {userData.email}</p>
							<p>Teléfono: {userData.phone}</p>
						</div>
					) : (
						<p>Loading...</p>
					)}
					<div className='ml-5'>
						<Button2 onClick={handleLogout}>Cerrar Sesión</Button2>
					</div>
					<div className='flex justify-center ml-5'>
						<Button2 onClick={handleDeleteAccount}>Eliminar Cuenta</Button2>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
