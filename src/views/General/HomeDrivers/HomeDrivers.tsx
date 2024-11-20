import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { prefix, searchRoute } from '../../../utils/Routes';
import SwitchPage from '../SwitchPage';
import { useEffect, useState } from 'react';
import Card1 from '../../../components/Cards/CardPassanger/CardPassanger';
import Modal from '../../../components/Modals/MainModal';
import { Button } from 'storybook/internal/components';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { fetchProfileData } from '../../../utils/fetchProfileData';
import Time from '../../../components/Inputs/Time';

interface Trip {
	date: string;
	time: string;
	startPoint: string;
	endPoint: string;
	seatAvailable: number;
	route: string;
	paymentMethod: string;
}

interface User {
	idCreator: string;
	userName: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	stop: string;
	paymentMethod: string;
}

interface Passenger extends User {
	idCreator: string;
	userName: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	stop: string;
	paymentMethod: string;
}

function HomeDriverPage() {
	const [accepted, setAccepted] = useState<Array<Passenger>>();
	const [requests, setRequests] = useState<Array<Passenger>>();
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [TripData, setTripData] = useState<Trip | null>(null);
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const MySwal = withReactContent(Swal);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				setLoading(true);
				const data = await fetchProfileData('trip', setErrorMessage);
				if (data) {
					setTripData(data);
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
          <input id="swal-input1" class="swal2-input" placeholder="Fecha" value="${TripData?.date || ''}">
          <input id="swal-input3" class="swal2-input" placeholder="Hora" value="${TripData?.time || ''}">
        `,
				focusConfirm: false,
				showCancelButton: true,
				confirmButtonText: 'Save',
				cancelButtonText: 'Cancel',
				confirmButtonColor: '#6D9773',
				cancelButtonColor: '#374151',
				preConfirm: () => {
					return {
						Date: (document.getElementById('swal-input1') as HTMLInputElement)
							.value,
						Time: (document.getElementById('swal-input2') as HTMLInputElement)
							.value,
					};
				},
			});

			if (formValues) {
				const changedData: Partial<Trip> = {};
				Object.entries(formValues).forEach(([key, value]) => {
					if (value !== '' && value !== TripData?.[key as keyof Trip]) {
						changedData[key as keyof Trip] = value as string | any;
					}
				});

				if (Object.keys(changedData).length > 0) {
					setLoading(true);
					const url = `${localStorage.getItem('API')}/trip`;
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
						setTripData((prevData) => ({ ...prevData!, ...changedData }));
						Swal.fire('Viaje actualizado!', '', 'success');
					} else {
						const error = await response.json();
						Swal.fire(
							'Error',
							error.message || 'Failed to update trip',
							'error'
						);
					}
				}
			}
		} catch (error) {
			setErrorMessage(`Failed to edit data: ${error}`);
			Swal.fire('Error', 'Failed to update trip', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteTrip = async () => {
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
				const url = `${localStorage.getItem('API')}/trip`;
				const token = localStorage.getItem('token');

				const response = await fetch(url, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					Swal.fire('Eliminada', 'Tu viaje ha sido eliminado.', 'success');
					navigate(searchRoute('CreateTrip')?.path || prefix);
				} else {
					Swal.fire(
						'Error',
						'No se pudo eliminar tu viaje. Intenta de nuevo.',
						'error'
					);
				}
			} catch (error) {
				console.error('Error al eliminar el viaje:', error);
				Swal.fire('Error', 'Hubo un problema al eliminar tu viaje.', 'error');
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		// Cambia el título de la página
		document.title = 'Home - Driver';

		// Función para hacer solicitudes genéricas
		const fetchData = async (endpoint: string) => {
			try {
				const response = await fetch(
					`${localStorage.getItem('API')}/trip/${endpoint}`
				);
				if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
				return await response.json();
			} catch (error) {
				console.error(`Error fetching ${endpoint}:`, error);
				return null; // Maneja errores devolviendo null
			}
		};

		const fetchAllData = async () => {
			setLoading(true);
			try {
				// Realiza ambas solicitudes en paralelo
				const [waitData, acceptedData] = await Promise.all([
					fetchData('waiting'),
					fetchData('accepted'),
				]);

				// Actualiza los estados
				if (waitData) setRequests(waitData);
				if (acceptedData) setAccepted(acceptedData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		// Llama a la función para cargar datos
		fetchAllData();
	}, [requests, accepted]);

	if (loading) return <SwitchPage />;

	const tripId = localStorage.getItem('tripId');

	const closeModal = () => setIsModalOpen(false);
	const openModal = () => setIsModalOpen(true);

	return (
		<div className='container  mx-auto'>
			{/* Contenedor centralizado */}
			<div className='flex justify-center items-center m-5 mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-10'>
				<Link to={searchRoute('HomePage')?.path || prefix}>
					<div className='w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
						<BsPeopleFill className='text-white' />
					</div>
				</Link>{' '}
				{/* Título */}
				<h1 className='font-xsm text-xl text-center font-normal mb-4 pt-4 sm:text-2xl'>
					Bienvenido
				</h1>
				<Link to={searchRoute('ProfileCar')?.path || prefix}>
					<div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
						<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
					</div>
				</Link>{' '}
			</div>
			<div className='bg-black text-white rounded-lg p-3 m-4 mb-4'>
				{tripId ? (
					<button
						className='text-lg font-semibold w-full text-left'
						onClick={openModal}
					>
						View Current Trip
					</button>
				) : (
					<Link to={searchRoute('CreateTrip')?.path || prefix}>
						<h3 className='text-lg font-semibold'>Nuevo viaje</h3>
					</Link>
				)}
			</div>
			<div className='w-full bg-black p-4'>
				<div className='bg-white rounded-lg p-3 shadow-md mb-4'>
					<Card1
						type={'Pasajeros'}
						request={false}
						users={accepted || []}
					></Card1>
				</div>

				<div className='bg-white rounded-lg p-3 shadow-md'>
					{
						<Card1
							type={'Solicitudes'}
							request={true}
							users={requests || []}
						></Card1>
					}
				</div>
			</div>
			{/* Modal */}
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className='space-y-4'>
					<h2 className='text-xl font-bold'>Información del viaje</h2>
					<p>
						<strong>Punto de Partida:</strong> {TripData?.startPoint}
					</p>
					<p>
						<strong>Punto de llegada:</strong> {TripData?.endPoint}
					</p>
					<p>
						<strong>Ruta principal:</strong> {TripData?.route}
					</p>
					<p>
						<strong>Fecha:</strong> {TripData?.date}
					</p>
					<p>
						<strong>Hora:</strong> {TripData?.time}
					</p>
					<p>
						<strong>Asientos disponibles:</strong> {TripData?.seatAvailable}
					</p>
					<p>
						<strong>Métodos de pago disponibles:</strong>
						{TripData?.paymentMethod}
					</p>
				</div>
			</Modal>
		</div>
	);
}

export default HomeDriverPage;
