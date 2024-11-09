import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import whiteLogo from '../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';

function ViewHomePage() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleCarLinkClick = async () => {
		setLoading(true); // Start loading

		try {
			const url = `${localStorage.getItem('API')}/check-car`; // Your API endpoint to check if car is registered
			const token = localStorage.getItem('token');

			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			if (data.isCarRegistered) {
				// If car is registered, redirect to driver page
				navigate('/driver/home');
			} else {
				// If car is not registered, redirect to register page
				navigate('/car/register');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			// Handle error, maybe show a message to the user
		} finally {
			setLoading(false); // End loading
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

				{/* Make the onClick work on the div and inside FaCar logo */}
				<div
					onClick={handleCarLinkClick}
					className='cursor-pointer w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'
				>
					<FaCar
						className='text-white'
						style={{ cursor: 'pointer' }} // Ensure the cursor is a pointer on the FaCar icon too
					/>
				</div>
			</div>
		</div>
	);
}

export default ViewHomePage;
