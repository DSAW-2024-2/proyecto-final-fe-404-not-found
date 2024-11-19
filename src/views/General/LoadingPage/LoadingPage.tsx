import whiteLogo from '../../../components/pictures/whiteLogo.png';

function ViewLoadingPage() {
	return (
		<div className='flex items-center justify-center h-screen bg-[#6D9773]'>
			<div className='flex flex-col items-center'>
				<img className='w-[89px] h-[94px]' src={whiteLogo} alt='Logo' />
				<h1 className='mt-4 text-white text-lg font-semibold text-center md:text-xl'>
					Bienvenido a UniHop
				</h1>
			</div>
		</div>
	);
}

export default ViewLoadingPage;
