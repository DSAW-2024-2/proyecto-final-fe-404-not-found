import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../../utils/FetchProfileData';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button2 from '../../../components/Buttons/TextButton';
import { prefix, searchRoute } from '../../../utils/Routes';
import LoadingPage from '../../General/LoadingPage';
import LoadingState from '../../../utils/Loader';
import withReactContent from 'sweetalert2-react-content';

interface UserProfile {
	firstName: string;
	lastName: string;
	imageProfile: string;
	idUniversidad: string;
	userName: string;
	email: string;
	phone: string;
	password: string;
}

interface UserData {
	firstName: string;
	lastName: string;
	phone: string;
	password?: string;
}

const UserProfile: React.FC = () => {
	const [userData, setUserData] = useState<UserProfile | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const MySwal = withReactContent(Swal);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				setLoading(true);
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
			const { value: formValues } = await MySwal.fire({
				title: 'Edit Profile',
				html: `
          <input id="swal-input1" class="swal2-input" placeholder="First Name" value="${userData?.firstName || ''}">
          <input id="swal-input2" class="swal2-input" placeholder="Last Name" value="${userData?.lastName || ''}">
          <input id="swal-input3" class="swal2-input" placeholder="Phone" value="${userData?.phone || ''}">
          <input id="swal-input4" class="swal2-input" type="password" placeholder="New Password">
        `,
				focusConfirm: false,
				showCancelButton: true,
				confirmButtonText: 'Save',
				cancelButtonText: 'Cancel',
				confirmButtonColor: '#6D9773',
				cancelButtonColor: '#374151',
				preConfirm: () => {
					return {
						firstName: (
							document.getElementById('swal-input1') as HTMLInputElement
						).value,
						lastName: (
							document.getElementById('swal-input2') as HTMLInputElement
						).value,
						phone: (document.getElementById('swal-input3') as HTMLInputElement)
							.value,
						password: (
							document.getElementById('swal-input4') as HTMLInputElement
						).value,
					};
				},
			});

			if (formValues) {
				const changedData: Partial<UserData> = {};
				Object.entries(formValues).forEach(([key, value]) => {
					if (value !== '' && value !== userData?.[key as keyof UserProfile]) {
						changedData[key as keyof UserData] = value;
					}
				});

				if (Object.keys(changedData).length > 0) {
					setLoading(true);
					const url = `${localStorage.getItem('API')}/user`;
					const token = localStorage.getItem('token');

					const response = await fetch(url, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(changedData),
					});

					if (response.ok) {
						setUserData((prevData) => ({ ...prevData!, ...changedData }));
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
		navigate(searchRoute('Login')?.path || prefix);
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

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div className='bg-[#6D9773] md:h-screen md:overflow-hidden flex justify-center items-center'>
			<div className='container p-6 mx-auto md:bg-[#9fcca6]  shadow-lg rounded-lg '>
				{errorMessage ? (
					<p className='text-red-500 text-center mb-4'>{errorMessage}</p>
				) : (
					<div className='md:flex md:h-screen'>
						<div className='md:w-1/2 md:h-fit md:p-10'>
							{/* Encabezado del perfil */}
							<Link
								to={searchRoute('HomePage')?.path || prefix}
								className='text-lg font-bold text-gray-800 mb-4'
							>
								<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
							</Link>
							<div className='flex flex-col items-center mb-6 md:gap-10 md:h-6/7 md:justify-center md:pt-10'>
								<div className='flex justify-center w-screen'>
									<div className='w-[100px] md:w-[250px] h-[100px] md:h-[250px] rounded-full border-2 border-gray-300 overflow-hidden'>
										<img
											src={
												userData?.imageProfile ||
												localStorage.getItem('FotoDefaultUser') ||
												''
											}
											alt='Foto de perfil'
											className='object-cover w-full h-full'
										/>
									</div>
								</div>
								<div className='text-center hidden md:block'>
									<p className='text-4xl font-bold text-gray-800'>
										Bienvenido {userData?.firstName}
									</p>
								</div>
							</div>
						</div>
						<div className='relative md:flex md:flex-col md:h-fit bg-white md:w-1/2 md:p-10 rounded-md md:m-auto'>
							{/* Botón de editar en la esquina superior derecha */}
							<button
								className='absolute top-4 right-4 flex items-center justify-center text-sm text-[#0C3B2E] hover:text-green-700 md:top-4 '
								onClick={handleEdit}
							>
								<FaEdit className='mr-1' /> Editar Perfil
							</button>

							{/* Información del usuario */}
							{userData ? (
								<div className='grid grid-cols-1 gap-y-4 text-base text-gray-700 pt-8 pl-5 md:grid-cols-2 md:gap-x-6'>
									<div>
										<p className='text-gray-500 font-medium'>Nombre</p>
										<p>{userData.firstName}</p>
									</div>
									<div>
										<p className='text-gray-500 font-medium'>Apellido</p>
										<p>{userData.lastName}</p>
									</div>
									<div>
										<p className='text-gray-500 font-medium'>ID</p>
										<p>{userData.idUniversidad}</p>
									</div>
									<div>
										<p className='text-gray-500 font-medium'>User Name</p>
										<p>{userData.userName}</p>
									</div>
									<div>
										<p className='text-gray-500 font-medium'>Email</p>
										<p>{userData.email}</p>
									</div>
									<div>
										<p className='text-gray-500 font-medium'>Teléfono</p>
										<p>{userData.phone}</p>
									</div>
									<div>
										<p className='text-gray-500 font-medium'>Contraseña</p>
										<p>*******</p>
									</div>
								</div>
							) : (
								<div className='flex justify-center items-center py-10'>
									<LoadingState />
								</div>
							)}

							{/* Botones */}
							<div className=' flex flex-col items-center md:flex-row gap-4 mt-6'>
								<Button2 onClick={handleLogout}>Cerrar Sesión</Button2>
								<Button2 onClick={handleDeleteAccount}>Eliminar Cuenta</Button2>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

/*
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
							<img src={userData?.imageProfile || ''} alt='' />
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
							<p className='text-gray-500 mt-2'>Contraseña</p>
							<p>*******</p>
						</div>
					) : (
						<div>
							<LoadingState />
						</div>
					)}
					<div className='pl-5'>
						<Button2 onClick={handleLogout}>Cerrar Sesión</Button2>
						<Button2 onClick={handleDeleteAccount}>Eliminar Cuenta</Button2>
					</div>
				</div>
			)}
		</div>
*/

export default UserProfile;
