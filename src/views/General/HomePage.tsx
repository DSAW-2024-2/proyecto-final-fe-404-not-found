import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import whiteLogo from '../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';
import { searchRoute } from '../../utils/Routes';

function ViewHomePage() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleCarLinkClick = async () => {
		setLoading(true);

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
				navigate(searchRoute('HomeDriver')?.path || '/');
			} else {
				navigate(searchRoute('RegisterCar')?.path || '/');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container mx-auto'>
			<div className='flex justify-center items-center m-4 mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-10'>
				<Link to={searchRoute('ProfileUser')?.path || '/'}>
					<div className='w-[40px] h-[40px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
						<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
					</div>
				</Link>
				<h1 className='mt-3 text-xl text-center font-normal mb-4 sm:text-2xl'>
					Bienvenido
				</h1>

				<div
					onClick={handleCarLinkClick}
					className='cursor-pointer w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'
				>
					<FaCar className='text-white' style={{ cursor: 'pointer' }} />
				</div>
			</div>
			<div className='flex items-center h-13 rounded-md bg-[#6D9773] pt-3 pl-5 m-4 mt-2 mb-5'>
				<div className='h-[30px] w-[200px] mb-4 bg-white rounded-full border px-3 py-2'>
					<button className='p-1'></button>
				</div>
			</div>
			<div className='w-full bg-[#6D9773] p-4'>
				<div className='bg-white rounded-lg p-3 mb-4'>
					<h3 className='text-gray-800 font-semibold mb-2'>Mis viajes</h3>
					<div className='info viaje'></div>
				</div>

				<div className='bg-white rounded-lg p-3 shadow-md'>
					<h3 className='text-gray-800 font-semibold mb-2'>VIAJES</h3>
					<p className='text-gray-600 mb-2'>Recomendaciones</p>
					<div className='flex items-center'>
						<span className='text-yellow-500 mr-2'>★</span>
						<div className='info tarjetas'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewHomePage;
