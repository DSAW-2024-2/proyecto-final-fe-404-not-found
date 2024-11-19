import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { prefix, searchRoute } from '../../../utils/Routes';
import { useEffect, useState } from 'react';
import SwitchPage from '../SwitchPage';

interface Passenger {
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

	return (
		<div className='container  mx-auto'>
			{/* Contenedor centralizado */}
			<div className='flex justify-center items-center m-5 mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-10'>
				<Link to={searchRoute('ProfileCar')?.path || prefix}>
					<div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
						<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
					</div>
				</Link>{' '}
				{/* Título */}
				<h1 className='font-xsm text-xl text-center font-normal mb-4 pt-4 sm:text-2xl'>
					Bienvenido
				</h1>
				<Link to={searchRoute('HomePage')?.path || prefix}>
					<div className='w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
						<BsPeopleFill className='text-white' />
					</div>
				</Link>{' '}
			</div>
			<div className='bg-black text-white rounded-lg p-3 m-4 mb-4'>
				<Link to={searchRoute('CreateTrip')?.path || prefix}>
					<h3 className='text-lg font-semibold'>Nuevo viaje</h3>
				</Link>{' '}
			</div>
			<div className='w-full bg-black p-4'>
				<div className='bg-white rounded-lg p-3 shadow-md mb-4'>
					<h3 className='text-gray-800 font-semibold mb-2'>PASAJEROS</h3>
					<div className='flex items-center mb-2'>
						<p className='text-gray-700'>Usuario 1</p>
						<p className='ml-auto text-gray-500'>Paradero</p>
					</div>
					<div className='flex items-center'>
						<p className='text-gray-700'>Usuario 2</p>
						<p className='ml-auto text-gray-500'>Paradero</p>
					</div>
				</div>

				<div className='bg-white rounded-lg p-3 shadow-md'>
					<h3 className='text-gray-800 font-semibold mb-2'>SOLICITUDES</h3>
					<div className='flex items-center'>
						<p className='text-gray-700'>Usuario 3</p>
						<p className='ml-auto text-gray-500'>Paradero</p>
						<button className='ml-2 text-green-500'>✔</button>
						<button className='ml-1 text-red-500'>✖</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeDriverPage;
