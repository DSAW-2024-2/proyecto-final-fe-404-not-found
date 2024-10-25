import Button from '../../components/Buttons/Regular';
import whiteLogo from '../../components/pictures/whiteLogo.png';

function ViewInitialPage() {
	return (
		<div className='container p-4 max-w-80'>
			<div className='absolute inset-0'>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full top-[-150px] left-[160px] opacity-40 z-0'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full top-[25px] left-[-190px] opacity-40 z-0'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full top-[-250px] right-[100px] opacity-40 z-0'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-[-220px] left-[170px] opacity-40 z-0'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-0 left-3/4 opacity-40 z-0'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-[-150px] right-1/3 opacity-40 z-0'></div>
			</div>
			<div className='ml-[65px] mt-16 w-[156px] h-[156px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300 z-10 relative'>
				<img className='w-[89px] h-[94px]' src={whiteLogo} alt='Logo' />
			</div>
			<div className='flex w-full justify-center space-x-[16px] mt-[60px] z-10 relative '>
				<Button onClick={() => alert('hola')}>Iniciar Sesión</Button>
				<Button onClick={() => alert('hola')}>Registrarse</Button>
			</div>
		</div>
	);
}

export default ViewInitialPage;
