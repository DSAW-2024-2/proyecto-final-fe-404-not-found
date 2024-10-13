import React, { useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
function Button() {
	const [isClicked, setIsClicked] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleClick = () => {
		setIsClicked(true);

		// Simular un breve retraso antes de mostrar el ícono de éxito
		setTimeout(() => {
			setIsClicked(false);
			setIsSuccess(true);

			// Después de mostrar el éxito, volver al estado original
			setTimeout(() => {
				setIsSuccess(false);
			}, 1500); // Aumenta el tiempo que el ícono de éxito está visible
		}, 1200); // Aumenta el tiempo antes de mostrar el ícono de éxito
	};

	return (
		<button
			onClick={handleClick}
			className={`flex items-center justify-center w-32 h-12 bg-red-500 text-white font-semibold rounded-md transition-all duration-500 ease-in-out ${
				isClicked || isSuccess ? 'w-12' : 'w-32'
			}`}
		>
			{isSuccess ? (
				<FaCheck className='text-white transition-all duration-500 ease-in-out' />
			) : (
				<>
					{isClicked ? (
						<FaTrash className='text-white transition-all duration-500 ease-in-out' />
					) : (
						<>
							<FaTrash className='mr-2 transition-all duration-500 ease-in-out' />
							<span className='transition-all duration-500 ease-in-out'>
								Eliminar
							</span>
						</>
					)}
				</>
			)}
		</button>
	);
}

export default Button;
