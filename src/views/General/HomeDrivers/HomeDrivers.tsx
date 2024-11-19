import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { prefix, searchRoute } from '../../../utils/Routes';
import SwitchPage from '../SwitchPage';
import { useState } from 'react';

function HomeDriverPage() {
	const [loading, setLoading] = useState(false);

	if (loading) {
		return <SwitchPage />;
	}
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
