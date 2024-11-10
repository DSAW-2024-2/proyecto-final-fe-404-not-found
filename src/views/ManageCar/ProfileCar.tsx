import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button2 from '../../components/Buttons/TextButton';

const CarProfile: React.FC = () => {
	const [carData, setCarData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadCarData = async () => {
			const data = await fetchProfileData('car', setErrorMessage);
			if (data) setCarData(data);
		};
		loadCarData();
	}, []);

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
		<div className='container p-4 max-w-80'>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div>
					<div className='flex gap-x-[65px]'>
						<Link to='/driver'>
							<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
						</Link>{' '}
						<div className='w-[120px] h-[120px] mt-5 border rounded-full border-black'>
							<img src='' alt='' />
						</div>
					</div>
					<h1>Car Profile</h1>
					{carData ? (
						<>
							<p>Brand: {carData.brand}</p>
							<p>Model: {carData.model}</p>
							<p>License Plate: {carData.licensePlate}</p>
						</>
					) : (
						<p>Loading...</p>
					)}
					<div className='flex justify-center '>
						<Button2 onClick={handleDeleteAccount}>Eliminar vehículo</Button2>
					</div>
				</div>
			)}
		</div>
	);
};

export default CarProfile;
