import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../../utils/fetchProfileData';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button2 from '../../../components/Buttons/TextButton';
import { prefix, searchRoute } from '../../../utils/Routes';
import LoadingPage from '../../General/LoadingPage';

interface Car {
	id: number;
	brand: string;
	model: string;
	licensePlate: string;
	capacity: number;
	licensePhoto: string;
	vehiclePhoto: string;
	soatPhoto: string;
}

const CarProfile: React.FC = () => {
	const [carData, setCarData] = useState<Car | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Cargar datos del vehículo
	useEffect(() => {
		setLoading(true);
		const loadCarData = async () => {
			try {
				const data = await fetchProfileData('car', setErrorMessage);
				if (data) setCarData(data);
				setLoading(false);
			} catch {
				setErrorMessage('Error al cargar los datos del vehículo.');
			}
		};
		loadCarData();
	}, []);

	// Manejar edición del perfil
	const handleEdit = async () => {
		try {
			const result = await Swal.fire({
				title: 'Editar Vehículo',
				html: `
          <input id="swal-input-capacity" class="swal2-input" placeholder="Capacidad" value="${carData?.capacity || ''}" />
        `,
				preConfirm: () => {
					const capacity = (
						document.getElementById('swal-input-capacity') as HTMLInputElement
					).value;
					return { capacity };
				},
				showCancelButton: true,
				confirmButtonText: 'Guardar',
				confirmButtonColor: '#6D9773',
				cancelButtonColor: '#d33',
			});

			if (result.isConfirmed) {
				const updatedData = result.value;
				setLoading(true);
				const response = await fetch(`${localStorage.getItem('API')}/car`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify(updatedData),
				});

				if (response.ok) {
					setCarData({ ...carData, ...updatedData });
					Swal.fire(
						'Actualizado',
						'Los datos del vehículo se han actualizado.',
						'success'
					);
				} else {
					throw new Error('No se pudo actualizar el perfil.');
				}
			}
		} catch (error) {
			Swal.fire(
				'Error',
				(error as Error).message || 'Ocurrió un error al actualizar.',
				'error'
			);
		} finally {
			setLoading(false);
		}
	};

	// Manejar eliminación del vehículo
	const handleDeleteAccount = async () => {
		const result = await Swal.fire({
			title: '¿Estás seguro?',
			text: 'Esta acción eliminará tu vehículo de forma permanente.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			confirmButtonColor: '#d33',
			cancelButtonColor: '#6D9773',
		});

		if (result.isConfirmed) {
			try {
				setLoading(true);
				const response = await fetch(`${localStorage.getItem('API')}/car`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});

				if (response.ok) {
					Swal.fire('Eliminado', 'El vehículo ha sido eliminado.', 'success');
					navigate(searchRoute('HomePage')?.path || prefix);
				} else {
					throw new Error('No se pudo eliminar el vehículo.');
				}
			} catch (error) {
				Swal.fire(
					'Error',
					(error as Error).message ||
						'Ocurrió un problema al eliminar el vehículo.',
					'error'
				);
			} finally {
				setLoading(false);
			}
		}
	};

	// Subcomponente para renderizar datos
	const CarDetails = ({ label, value }: { label: string; value: string }) => (
		<div className='mb-2'>
			<p className='text-gray-500'>{label}</p>
			<p className='font-semibold'>{value || 'N/A'}</p>
		</div>
	);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div className='container md:w-screen mx-auto p-6 bg-[#6D9773] shadow rounded-lg md:overflow-hidden'>
			<div className='flex items-center justify-between mb-4'>
				{/* Icono FaArrowLeft en el extremo izquierdo */}
				<Link to={searchRoute('HomeDriver')?.path || prefix}>
					<FaArrowLeft className='h-5 w-5 text-white hover:text-black cursor-pointer' />
				</Link>

				{/* Icono FaEdit en el extremo derecho */}
				<FaEdit
					className='h-6 w-6 text-white hover:text-black cursor-pointer'
					onClick={handleEdit}
				/>
			</div>

			{errorMessage ? (
				<p className='text-red-500 text-center'>{errorMessage}</p>
			) : (
				<div className='bg-slate-100 shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto md:flex md:justify-center md:items-center'>
					{/* Encabezado */}
					<div className='text-center mb-6 md:mt-4 md:w-1/2'>
						<div className='w-full h-40 mb-4'>
							<img
								src={
									carData?.vehiclePhoto ||
									localStorage.getItem('FotoDefaultCar') ||
									''
								}
								alt='Foto del vehículo'
								className='w-full h-full object-contain rounded-md border border-gray-200'
							/>
						</div>
						<h2 className='text-2xl font-bold text-gray-800'>
							{carData?.licensePlate || 'Placa no disponible'}
						</h2>
					</div>
					<div className='md:border-t md:border-gray-200 md:my-4 md:w-1/2 md:p-6'>
						{/* Detalles del vehículo */}
						<div className='space-y-4'>
							<CarDetails label='Marca' value={carData?.brand || 'N/A'} />
							<CarDetails label='Modelo' value={carData?.model || 'N/A'} />
							<CarDetails
								label='Capacidad'
								value={carData?.capacity?.toString() || 'N/A'}
							/>

							{/* SOAT */}
							<div className='flex items-center justify-between bg-gray-50 p-3 rounded-lg'>
								<CarDetails
									label='SOAT'
									value={carData?.soatPhoto ? 'Disponible' : 'No disponible'}
								/>
								{carData?.soatPhoto && (
									<Button2
										onClick={() => {
											window.open(carData.soatPhoto, '_blank');
										}}
										className='text-sm bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md'
									>
										Ver aquí
									</Button2>
								)}
							</div>

							{/* Licencia */}
							<div className='flex items-center justify-between bg-gray-50 p-3 rounded-lg'>
								<CarDetails
									label='Licencia de Conducir'
									value={carData?.licensePhoto ? 'Disponible' : 'No disponible'}
								/>
								{carData?.licensePhoto && (
									<Button2
										onClick={() => {
											window.open(carData.licensePhoto, '_blank');
										}}
										className='text-sm bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md'
									>
										Ver aquí
									</Button2>
								)}
							</div>
						</div>

						{/* Botón de eliminación */}
						<div className='mt-6 text-right flex justify-center'>
							<Button2
								onClick={handleDeleteAccount}
								className='bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-lg'
							>
								Eliminar Vehículo
							</Button2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CarProfile;
