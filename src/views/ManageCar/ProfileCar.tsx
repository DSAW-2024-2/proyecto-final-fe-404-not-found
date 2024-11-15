import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button2 from '../../components/Buttons/TextButton';
import { prefix, searchRoute } from '../../utils/Routes';

const CarProfile: React.FC = () => {
	const [carData, setCarData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const loadCarData = async () => {
			const data = await fetchProfileData('car', setErrorMessage);
			if (data) setCarData(data);
		};
		loadCarData();
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
				<input id="swal-input1" class="swal2-input" placeholder="Capacidad" value="${carData?.capacity || ''}">
				

			`,
				preConfirm: () => {
					const capacity = (
						document.getElementById('swal-input1') as HTMLInputElement
					).value;

					return { capacity };
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
					setCarData({ ...carData, ...formValues });
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

	const handleDeleteAccount = async () => {
		const result = await Swal.fire({
			title: '¿Estás seguro?',
			text: 'Esta acción eliminará tu vehículo de forma permanente.',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#6D9773',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar vehículo',
			cancelButtonText: 'Cancelar',
		});

		if (result.isConfirmed) {
			try {
				setLoading(true);
				const url = `${localStorage.getItem('API')}/car`;
				const token = localStorage.getItem('token');

				const response = await fetch(url, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					Swal.fire('Eliminada', 'Tu vehículo ha sido eliminada.', 'success');
					navigate(searchRoute('HomePage')?.path || prefix);
				} else {
					Swal.fire(
						'Error',
						'No se pudo eliminar tu vehículo. Intenta de nuevo.',
						'error'
					);
				}
			} catch (error) {
				console.error('Error al eliminar el vehículo:', error);
				Swal.fire(
					'Error',
					'Hubo un problema al eliminar tu vehículo.',
					'error'
				);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className='container mx-auto p-6 max-w-sm  rounded-lg shadow-lg'>
			<div className='w-full h-full p-5 border border-black'>
				{errorMessage ? (
					<p className='text-red-500'>{errorMessage}</p>
				) : (
					<div>
						{/* Header */}
						<div className='flex items-center mb-4'>
							<Link to={searchRoute('HomeDriver')?.path || prefix}>
								<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
							</Link>
						</div>
						<div className='flex justify-center gap-x-2'>
							<p className='text-center'>Vehículo</p>
							<div className='mt-1 text-[#0C3B2E]'>
								<FaEdit onClick={handleEdit}>Editar Vehículo</FaEdit>
							</div>
						</div>

						{/* Car Image and License Plate */}
						<div className='text-center'>
							<div className='w-full h-[150px] mb-4'>
								<img
									src={carData?.image || 'path/to/car-image.png'}
									alt='Car'
									className='w-full h-full object-contain'
								/>
							</div>
							<div className='flex items-center justify-center mb-4'>
								<h2 className='text-xl font-semibold'>
									{carData?.licensePlate}
								</h2>
								<FaEdit className='ml-2 h-4 w-4 text-gray-500 cursor-pointer' />
							</div>
						</div>

						{/* Car Details */}
						<div className=' mb-4'>
							<p className='text-gray-500'>Marca</p>
							<p className='font-semibold'>{carData?.brand}</p>

							<p className='text-gray-500 mt-2'>Modelo</p>
							<p className='font-semibold'>{carData?.model}</p>

							<p className='text-gray-500 mt-2'>Capacidad</p>
							<p className='font-semibold'>{carData?.capacity}</p>

							<p className='text-gray-500 mt-2'>SOAT</p>
							<a
								href={carData?.soatPdf || '#'}
								target='_blank'
								className='inline-block mt-1 px-3 py-1 border border-gray-500 rounded-md text-gray-700 text-sm'
							>
								📄 SOAT PDF
							</a>
						</div>

						{/* Delete Button */}
						<div className='flex justify-center'>
							<Button2 onClick={handleDeleteAccount}>Eliminar vehículo</Button2>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CarProfile;
