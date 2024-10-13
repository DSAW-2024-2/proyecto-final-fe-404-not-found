import { FaCheck, FaTimes } from 'react-icons/fa';

function Button({
	acceptFun,
	denyFun,
}: {
	acceptFun: () => void;
	denyFun: () => void;
}) {
	return (
		<div className='flex space-x-2'>
			{' '}
			{/* Espacio más pequeño entre los botones */}
			<button
				className='flex items-center justify-center bg-green-300 text-white py-1 px-2 rounded-lg hover:bg-green-400 transition duration-200' // Ajustado padding
				onClick={acceptFun}
			>
				<FaCheck className='h-6 w-6' /> {/* Tamaño reducido */}
			</button>
			<button
				className='flex items-center justify-center bg-red-300 text-white py-1 px-2 rounded-lg hover:bg-red-400 transition duration-200' // Ajustado padding
				onClick={denyFun}
			>
				<FaTimes className='h-6 w-6' /> {/* Tamaño reducido */}
			</button>
		</div>
	);
}

export default Button;
