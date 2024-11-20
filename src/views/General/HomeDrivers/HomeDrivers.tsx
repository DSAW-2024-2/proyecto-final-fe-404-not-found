import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { prefix, searchRoute } from '../../../utils/Routes';
import SwitchPage from '../SwitchPage';
import { useEffect, useState } from 'react';
import Card1 from '../../../components/Cards/CardPassanger/CardPassanger';
import Modal from '../../../components/Modals/MainModal';

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
						<strong>Punto de Partida:</strong> {}
					</p>
					<p>
						<strong>Punto de llegada:</strong> {}
					</p>
					<p>
						<strong>Ruta principal:</strong> {}
					</p>
					<p>
						<strong>Fecha:</strong> {}
					</p>
					<p>
						<strong>Hora:</strong> {}
					</p>
					<p>
						<strong>Asientos disponibles:</strong> {}
					</p>
				</div>
			</Modal>
		</div>
	);
}

export default HomeDriverPage;
