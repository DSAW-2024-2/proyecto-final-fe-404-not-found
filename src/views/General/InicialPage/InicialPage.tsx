import { Link } from 'react-router-dom';
import Button from '../../../components/Buttons/Regular';
import whiteLogo from '../../../components/pictures/whiteLogo.png';
import { Navigate } from 'react-router-dom';
import { prefix, searchRoute } from '../../../utils/Routes';

function ViewInitialPage() {
	if (localStorage.getItem('token')) {
		return <Navigate to={searchRoute('HomePage')?.path || prefix} />;
	}
	return (
		<div className='container sm:p-4 md:w-screen lg:w-screen h-full'>
			<div className='absolute inset-0 overflow-hidden'>
				{/* Circles */}
				<div className='absolute w-[320px] h-[338px] border border-[#6D9773] rounded-full top-[-150px] left-[160px] opacity-40 z-0 md:w-[480px] md:h-[508px] md:top-[-250px] md:left-[200px]'></div>
				<div className='absolute w-[320px] h-[338px] border border-[#6D9773] rounded-full top-[25px] left-[-190px] opacity-40 z-0 md:w-[480px] md:h-[508px] md:top-[50px] md:left-[-250px]'></div>
				<div className='absolute w-[320px] h-[338px] border border-[#6D9773] rounded-full top-[-250px] right-[100px] opacity-40 z-0 md:w-[480px] md:h-[508px] md:top-[-300px] md:right-[150px]'></div>
				<div className='absolute w-[320px] h-[338px] border border-[#6D9773] rounded-full bottom-[-220px] left-[170px] opacity-40 z-0 md:w-[480px] md:h-[508px] md:bottom-[-250px] md:left-[200px]'></div>
				<div className='absolute w-[320px] h-[338px] border border-[#6D9773] rounded-full bottom-0 left-3/4 opacity-40 z-0 md:w-[480px] md:h-[508px] md:bottom-[-100px] md:left-3/4'></div>
				<div className='absolute w-[320px] h-[338px] border border-[#6D9773] rounded-full bottom-[-150px] right-1/3 opacity-40 z-0 md:w-[480px] md:h-[508px] md:bottom-[-200px] md:right-[150px]'></div>
			</div>

			{/* Logo */}
			<div className='w-[156px] h-[156px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300 z-10 relative mt-[80px] mx-auto md:w-[160px] md:h-[160px] md:mt-[140px]'>
				<img
					className='w-[89px] h-[94px] md:w-[120px] md:h-[130px]'
					src={whiteLogo}
					alt='Logo'
				/>
			</div>

			{/* Buttons */}
			<div className='flex w-full justify-center p-5 mt-[60px] space-x-[10px] z-10 relative md:space-x-[52px] md:mt-[80px] md:pr-[220px]'>
				<Button onClick={() => {}}>
					<Link to={searchRoute('Login')?.path || prefix}>Iniciar Sesión</Link>
				</Button>
				<Button onClick={() => {}}>
					<Link to={searchRoute('Register')?.path || prefix}>Registrarse</Link>
				</Button>
			</div>
		</div>
	);
}

export default ViewInitialPage;
