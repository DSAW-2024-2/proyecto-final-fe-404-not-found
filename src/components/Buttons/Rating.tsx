import { useState } from 'react';

function Button() {
	const [rating, setRating] = useState(0);

	const handleRating = (index: number) => {
		setRating(index);
		console.log(rating);
	};

	return (
		<div className='flex items-center space-x-1'>
			{Array.from({ length: 5 }, (_, index) => (
				<button
					key={index}
					onClick={() => handleRating(index + 1)}
					className={`text-2xl transition-colors duration-200 ${
						index < rating ? 'text-yellow-400' : 'text-gray-300'
					} hover:text-yellow-500`}
				>
					★
				</button>
			))}
		</div>
	);
}

export default Button;
