import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import whiteLogo from '../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';

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
				navigate('/driver');
			} else {
				navigate('/car/register');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container p-4 mx-auto'>
			<div className='flex justify-center items-center mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-10'>
				<Link to='/user/info'>
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
		</div>
	);
}

export default ViewHomePage;
