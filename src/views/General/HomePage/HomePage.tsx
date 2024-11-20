import { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Swal from 'sweetalert2';
import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Button } from '../../../components/Buttons/searchButton';
import { Input } from '../../../components/Inputs/Search';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/Cards/CardSearch/CardSeach';
import { prefix, searchRoute } from '../../../utils/Routes';
import { FaCar, FaStar } from 'react-icons/fa';

interface Vehicle {
	_id: string;
	brand: string;
	model: string;
	licensePlate: string;
	capacity: string;
	licensePhoto: string;
	vehiclePhoto: string;
	soatPhoto: string;
	__v: number;
}

interface Driver {
	_id: string;
	firstName: string;
	lastName: string;
	userName: string;
	idUniversidad: string;
	email: string;
	phone: string;
	password: string;
	vehicle: Vehicle;
	recommendations: string[];
	ratings: { score: number; comment?: string }[];
	__v: number;
}

interface Trip {
	_id: string;
	driver: Driver;
	vehicle: Vehicle;
	startPoint: string;
	endPoint: string;
	date: string;
	time: string;
	route: string;
	fare: string;
	seatCount: number;
	paymentMethods: string[];
	waitingPassengers: any[];
	acceptedPassengers: any[];
	__v: number;
}

const API_URL = localStorage.getItem('API') || '';
const TOKEN = localStorage.getItem('token') || '';

export default function ViewHomePage() {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([] as Trip[]);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Home - User';
		setLoading(true);

		const fetchData = async () => {
			let isCancelled = false;

			try {
				const response = await fetch(`${API_URL}/trip/list/complete`, {
					method: 'GET',
				});
				const data = await response.json();
				if (!response.ok) throw new Error(`Error: ${response.status}`);

				if (!isCancelled) {
					setResults(data);
					setLoading(false);
				}
			} catch (error) {
				console.error(error);
				if (!isCancelled) {
					setLoading(false);
				}
			}

			return () => {
				isCancelled = true;
			};
		};

		fetchData();
	}, []);

	const handleSearch = useCallback(async () => {
		if (!query.trim()) return;

		setLoading(true);
		try {
			const response = await fetch(
				`${API_URL}/search?query=${encodeURIComponent(query)}`,
				{
					method: 'GET',
					headers: { Authorization: `Bearer ${TOKEN}` },
				}
			);

			if (!response.ok) throw new Error(`Error: ${response.status}`);

			const data = await response.json();
			navigate(
				data.results?.length > 0
					? `/results?query=${encodeURIComponent(query)}`
					: '/no-results'
			);
		} catch (error) {
			console.error('Error al realizar la búsqueda:', error);
		} finally {
			setLoading(false);
		}
	}, [query, navigate]);

	const handleCarLinkClick = async () => {
		try {
			const url = `${API_URL}/car`;
			const token = localStorage.getItem('token');

			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			if (data.brand) {
				navigate(searchRoute('HomeDriver')?.path || prefix);
			} else {
				navigate(searchRoute('RegisterCar')?.path || prefix);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCardClick = async (trip: Trip) => {
		const { value: formData } = await Swal.fire({
			title: `<strong>Detalles del viaje</strong>`,
			html: `
        <div class="text-left">
          <p><strong>Conductor:</strong> ${trip.driver.userName}</p>
          <p><strong>Ruta:</strong> ${trip.route}</p>
          <p><strong>Asientos disponibles:</strong> ${trip.seatCount}</p>
          <label for="endpoint" class="block text-left mb-2 mt-4">Punto de parada:</label>
          <input id="endpoint" class="w-full p-2 border rounded" placeholder="Ingresa tu parada" />

          <label for="payment-method" class="block text-left mb-2 mt-4">Método de pago:</label>
          <select id="payment-method" class="w-full p-2 border rounded">
            ${trip.paymentMethods
							.map((method) => `<option value="${method}">${method}</option>`)
							.join('')}
          </select>
        </div>
      `,
			icon: 'info',
			showCancelButton: true,
			confirmButtonText: 'Reservar',
			cancelButtonText: 'Cancelar',
			preConfirm: () => {
				const endpoint = (
					document.getElementById('endpoint') as HTMLInputElement
				)?.value;
				const paymentMethod = (
					document.getElementById('payment-method') as HTMLSelectElement
				)?.value;

				if (!endpoint || !paymentMethod) {
					Swal.showValidationMessage('Todos los campos son obligatorios.');
				}

				return { endpoint, paymentMethod };
			},
		});

		if (formData) {
			const { endpoint, paymentMethod } = formData;

			try {
				const response = await fetch(`${API_URL}/trip/booking/${trip._id}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${TOKEN}`,
					},
					body: JSON.stringify({
						firstName,
						lastName,
						email,
						phone,
						stop,
						paymentMethod,
					}),
				});

				if (!response.ok) throw new Error(`Error: ${response.status}`);

				await Swal.fire({
					icon: 'success',
					title: 'Reserva exitosa',
					text: 'Tu reserva se ha realizado con éxito.',
				});
			} catch (error) {
				console.error('Error realizando la reserva:', error);
				await Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Hubo un problema al realizar la reserva.',
				});
			}
		}
	};

	return (
		<div className='min-h-screen bg-sage-50'>
			<header className='bg-white border-b'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex justify-center items-center m-4 mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-8'>
						<div
							onClick={handleCarLinkClick}
							className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center border border-gray-300'
						>
							<FaCar className='text-white' style={{ cursor: 'pointer' }} />
						</div>
						<h1 className='mt-3 text-xl text-center font-normal mb-4 sm:text-2xl'>
							Bienvenido
						</h1>
						<Link to={searchRoute('ProfileUser')?.path || prefix}>
							<div className='w-[40px] h-[40px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
								<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
							</div>
						</Link>
					</div>
				</div>
			</header>

			<main className='container mx-auto px-4 py-6'>
				<div className='mb-6'>
					<div className='flex gap-2'>
						<Input
							className='flex-grow'
							placeholder='Buscar...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleSearch();
							}}
							disabled={loading}
						/>
						<Button onClick={handleSearch} disabled={loading}>
							{loading ? 'Buscando...' : <Search className='h-4 w-4' />}
						</Button>
					</div>
				</div>

				<Card className='mb-6 bg-sage-600 text-black'>
					<CardHeader>
						<CardTitle>Mis viajes</CardTitle>
					</CardHeader>
					<CardContent>
						{results.map((trip) => (
							<div key={trip._id} className='mb-2'>
								<p>
									{trip.startPoint} - {trip.endPoint}
								</p>
								<p>{trip.date}</p>
								<p>{trip.time}</p>
							</div>
						))}
						{results.length === 0 && (
							<p className='text-center'>No tienes viajes programados</p>
						)}
					</CardContent>
				</Card>

				<h2 className='text-lg font-semibold mb-4'>Viajes disponibles</h2>
				{loading && <p className='text-center'>Cargando viajes...</p>}

				{results.map((trip, key) => (
					<Card
						key={key}
						className='max-w-sm mb-4'
						onClick={() => handleCardClick(trip)}
					>
						<CardHeader>
							<CardTitle>
								<div className='flex gap-x-3'>
									<FaStar className='text-yellow-700' />
									{trip.startPoint} - {trip.endPoint}
								</div>
								<br />
								{trip.date}
							</CardTitle>
						</CardHeader>
						<CardContent>
							Hora de salida: {trip.time}
							<br />
							Tarifa: ${trip.fare} <br />
						</CardContent>
					</Card>
				))}

				{!loading && results.length === 0 && (
					<p className='text-center'>No hay viajes disponibles</p>
				)}
			</main>
		</div>
	);
}
