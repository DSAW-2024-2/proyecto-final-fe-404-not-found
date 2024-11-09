import whiteLogo from '../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

function ViewHomePage() {
	return (
		<div className='container p-4 mx-auto'>
			{/* Contenedor centralizado */}
			<div className='flex justify-center items-center mt-3 gap-[50px] sm:flex-row sm:justify-center sm:gap-x-10'>
				{/* Logo */}
				<Link to='/user/info'>
					<div className='w-[40px] h-[40px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
						<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
					</div>
				</Link>{' '}
				{/* Título */}
				<h1 className='mt-3 text-xl text-center font-normal mb-4 sm:text-2xl'>
					Bienvenido
				</h1>
				<Link to='/car/register'>
					<div className='w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
						<FaCar className='text-white' />
					</div>
				</Link>{' '}
			</div>
		</div>
	);
}

export default ViewHomePage;
