import whiteLogo from '../../components/pictures/whiteLogo.png';
function ViewHomePage() {
	return (
		<div className='container p-4 max-w-80'>
			<div className='flex mt-3 gap-x-10'>
				<div className='ml-[5px] w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
					<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
				</div>
				<h1 className='text-xl text-center font-normal mb-4'>Bienvenido</h1>
			</div>
		</div>
	);
}

export default ViewHomePage;
