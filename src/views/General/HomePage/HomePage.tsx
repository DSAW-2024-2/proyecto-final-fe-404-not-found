import { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Button } from '../../../components/Buttons/SearchButton';
import { Input } from '../../../components/Inputs/Search';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/Cards/CardSearch/CardSeach';
import { prefix, searchRoute } from '../../../utils/Routes';
import { FaCar } from 'react-icons/fa';

const API_URL = localStorage.getItem('API') || '';
const TOKEN = localStorage.getItem('token') || '';

export default function ViewHomePage() {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	//const [cardsData, setCardsData]= useState([]) PARA MOSTRAR LOS VIAJES RECOMENDADOS
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Home - User';
		const fetchData = async () => {};
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
			const url = `${localStorage.getItem('API')}/car`; // Ajusta al endpoint correcto
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

	return (
		<div className='min-h-screen bg-sage-50'>
			<header className='bg-white border-b'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex justify-center items-center m-4 mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-8'>
						{/* Car Icon Button */}
						<div
							onClick={handleCarLinkClick} // No need for stopPropagation here
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
						{/* Search Input and Button */}
						<Input
							className='flex-grow'
							placeholder='Buscar...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								// Only handle search on "Enter" key press
								if (e.key === 'Enter') handleSearch();
							}}
							disabled={loading}
						/>
						<Button onClick={handleSearch} disabled={loading}>
							{loading ? 'Buscando...' : <Search className='h-4 w-4' />}
						</Button>
					</div>
				</div>

				{/* Card Components */}

				<Card className='mb-6 bg-sage-600 text-white'>
					<CardHeader>
						<CardTitle>Mis viajes</CardTitle>
					</CardHeader>
					<CardContent>{/* 'Mis viajes' */}</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>VIAJES</CardTitle>
					</CardHeader>
					<CardContent>
						<h3 className='font-semibold mb-2'>Recomendaciones</h3>
						<div className='flex items-center'>
							<span className='text-yellow-500 mr-2'>★</span>
							{/* recommendations */}
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
