import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../../utils/fetchProfileData';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button2 from '../../../components/Buttons/TextButton';
import { prefix, searchRoute } from '../../../utils/Routes';

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

	const handleEdit = async () => {
		try {
			const result = await Swal.fire({
				title: 'Edit Profile',
				html: `
				<style>
					.swal2-popup .swal2-input {
						margin: 0; 
						width: 100%; 
						box-sizing: border-box; 
						margin-bottom: 10px;
					}
					.swal2-popup .swal2-content {
						padding: 0 20px; 
						
					}
				</style>
				<input id="swal-input1" class="swal2-input" placeholder="Name" value="${userData?.firstName || ''}">
				<input id="swal-input2" class="swal2-input" placeholder="Last Name" value="${userData?.lastName || ''}">
				<input id="swal-input4" class="swal2-input" placeholder="Phone" value="${userData?.phone || ''}">
				<input id="swal-input3" class="swal2-input" placeholder="Password" value="${''}">

			`,
				preConfirm: () => {
					const name = (
						document.getElementById('swal-input1') as HTMLInputElement
					).value;
					const lastName = (
						document.getElementById('swal-input2') as HTMLInputElement
					).value;
					const phone = (
						document.getElementById('swal-input4') as HTMLInputElement
					).value;
					const password = (
						document.getElementById('swal-input3') as HTMLInputElement
					).value;

					return { name, lastName, phone, password };
				},
				showCancelButton: true,
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				confirmButtonColor: '#6D9773',
				cancelButtonColor: 'black',
			});
			if (result.isConfirmed) {
				const formValues = result.value;

				setLoading(true);
				const url = `${localStorage.getItem('API')}/user`; // Update the endpoint as per your API
				const token = localStorage.getItem('token');

				const response = await fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formValues),
				});

				if (response.ok) {
					setUserData({ ...userData, ...formValues });
					Swal.fire('Profile updated!', '', 'success');
				} else {
					const error = await response.json();
					Swal.fire(
						'Error',
						error.message || 'Failed to update profile',
						'error'
					);
				}
			}
		} catch (error) {
			setErrorMessage(`Failed to edit data: ${error}`);
			Swal.fire('Error', 'Failed to update profile', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		<Navigate to={searchRoute('InicialPage')?.path || prefix} />;
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
					<div className='flex gap-x-[65px] mb-2'>
						<Link to={searchRoute('HomePage')?.path || prefix}>
							<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
						</Link>
						<div className='w-[120px] h-[120px] mt-5 border rounded-full border-black'>
							<img src='' alt='' />
						</div>
					</div>
					<div className='flex justify-center gap-x-2'>
						<p className='text-center'>Perfil</p>
						<div className='mt-1 text-[#0C3B2E]'>
							<FaEdit onClick={handleEdit}>Editar Perfil</FaEdit>
						</div>
					</div>
					<br />
					{userData ? (
						<div className='ml-5 mb-5'>
							<p className='text-gray-500'>Nombre</p>
							<p>{userData.firstName}</p>
							<p className='text-gray-500 mt-2'>Apellido</p>
							<p>{userData.lastName}</p>
							<p className='text-gray-500'>ID</p>
							<p>{userData.idUniversidad}</p>
							<p className='text-gray-500'>User Name</p>
							<p>{userData.userName}</p>
							<p className='text-gray-500 mt-2'>Email</p>
							<p>{userData.email}</p>
							<p className='text-gray-500 mt-2'>Teléfono</p>
							<p>{userData.phone}</p>
						</div>
					) : (
						<p>Loading...</p>
					)}
					<div className='pl-5'>
						<Button2 onClick={handleLogout}>Cerrar Sesión</Button2>
						<Button2 onClick={handleDeleteAccount}>Eliminar Cuenta</Button2>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
