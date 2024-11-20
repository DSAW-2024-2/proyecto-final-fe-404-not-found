import { Link } from 'react-router-dom';
import Button from '../../../components/Buttons/Regular';
import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { prefix, searchRoute } from '../../../utils/Routes';

function ViewInitialPage() {
	return (
		<div className='container mx-auto flex flex-col items-center justify-center h-dvh relative p-6'>
			{/* Background Circles */}
			<div className='absolute inset-0 overflow-hidden z-0'>
				<div className='absolute w-[320px] h-[320px] border border-[#6D9773] rounded-full top-[-150px] left-[160px] opacity-40 md:w-[480px] md:h-[480px] md:top-[-200px] md:left-[200px]'></div>
				<div className='absolute w-[320px] h-[320px] border border-[#6D9773] rounded-full top-[50px] left-[-150px] opacity-40 md:w-[480px] md:h-[480px] md:top-[80px] md:left-[-200px]'></div>
				<div className='absolute w-[320px] h-[320px] border border-[#6D9773] rounded-full top-[-200px] right-[100px] opacity-40 md:w-[480px] md:h-[480px] md:top-[-250px] md:right-[150px]'></div>
				<div className='absolute w-[320px] h-[320px] border border-[#6D9773] rounded-full bottom-[-150px] left-[170px] opacity-40 md:w-[480px] md:h-[480px] md:bottom-[-200px] md:left-[200px]'></div>
				<div className='absolute w-[320px] h-[320px] border border-[#6D9773] rounded-full bottom-0 left-3/4 opacity-40 md:w-[480px] md:h-[480px] md:bottom-[-100px] md:left-3/4'></div>
				<div className='absolute w-[320px] h-[320px] border border-[#6D9773] rounded-full bottom-[-120px] right-1/3 opacity-40 md:w-[480px] md:h-[480px] md:bottom-[-180px] md:right-[150px]'></div>
			</div>

			<h1 className='text-[22px] leading-[28px] font-normal text-center text-gray-800 pt-5'>
				Bienvenido a UNIHOP
				<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-12'></div>
			</h1>

			{/* Logo */}
			<div className='z-10 relative'>
				<div className='w-40 h-40 bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300 md:w-44 md:h-44'>
					<img
						className='w-24 h-24 md:w-32 md:h-32'
						src={whiteLogo}
						alt='Logo'
					/>
				</div>
			</div>

			{/* Buttons */}
			<div className='z-10 relative flex flex-col items-center space-y-4 mt-10 md:space-y-0 md:flex-row md:space-x-8 md:mt-14'>
				<Button onClick={() => {}}>
					<Link
						to={searchRoute('Login')?.path || prefix}
						className='flex items-center justify-center h-full w-full'
					>
						Iniciar Sesión
					</Link>
				</Button>
				<Button onClick={() => {}}>
					<Link
						to={searchRoute('Register')?.path || prefix}
						className='flex items-center justify-center h-full w-full'
					>
						Registrarse
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default ViewInitialPage;
