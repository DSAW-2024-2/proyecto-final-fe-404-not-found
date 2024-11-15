import { FaCar } from 'react-icons/fa';

function ViewSwitchPage() {
	return (
		<div className='container p-4 bg-black max-w-80 h-[480px]'>
			<div className='ml-[90px] mt-16 w-[113px] h-[113px] bg-white rounded-full flex items-center justify-center border border-gray-300'>
				<FaCar className='h-[50px] w-[50px] text-black' />
			</div>
			<h1 className=' mt-[60px] text-2xl text-white flex items-center justify-center'>
				UniHop
			</h1>
			<h2 className='text-white text-2xl flex items-center justify-center'>
				DRIVERS
			</h2>
		</div>
	);
}

export default ViewSwitchPage;
