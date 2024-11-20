import { FaCar } from 'react-icons/fa';

function ViewSwitchPage() {
	return (
		<div className='container p-4 bg-black max-w-full h-screen flex flex-col items-center justify-center'>
			<div className='w-28 h-28 bg-white rounded-full flex items-center justify-center border border-gray-300'>
				<FaCar className='h-12 w-12 text-black' />
			</div>
			<h1 className='mt-10 text-3xl text-white text-center'>UniHop</h1>
			<h2 className='text-white text-xl mt-2 text-center'>DRIVERS</h2>
		</div>
	);
}

export default ViewSwitchPage;
