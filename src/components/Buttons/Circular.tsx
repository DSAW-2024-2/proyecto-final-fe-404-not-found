import { FaCar } from 'react-icons/fa';

function Button({ onClick }: { onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className='bg-green-700 text-white rounded-md py-3 px-4 hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center'
		>
			<FaCar size={24} />
		</button>
	);
}

export default Button;
