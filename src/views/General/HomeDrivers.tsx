import whiteLogo from '../../components/pictures/whiteLogo.png';

function HomeDriverPage() {
	return (
		<div className='container p-4 mx-auto'>
			{/* Contenedor centralizado */}
			<div className='flex flex-col items-center mt-3 gap-5 sm:flex-row sm:justify-center sm:gap-x-10'>
				{/* Logo */}
				<div className='w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
					<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
				</div>

				{/* Título */}
				<h1 className='text-xl text-center font-normal mb-4 sm:text-2xl'>
					Bienvenido Conductor
				</h1>
			</div>
		</div>
	);
}

export default HomeDriverPage;
