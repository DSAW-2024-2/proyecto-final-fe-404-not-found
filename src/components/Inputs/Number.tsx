import { Dispatch, useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function Input({
	handleInputChange,
	placeholder = '',
	required,
	className,
}: {
	handleInputChange: Dispatch<React.SetStateAction<string>>;
	placeholder: string;
	required?: boolean;
	className?: string;
}) {
	//------NUMERO--------
	const [valueNumber, setvalueNumber] = useState(0);
	const increment = () => {
		setvalueNumber((prev) => prev + 1);
	};
	const decrement = () => {
		setvalueNumber((prev) => (prev > 0 ? prev - 1 : 0)); // Asegura que el valor no sea menor que 0
	};
	useEffect(() => {
		handleInputChange(valueNumber + '');
	}, [valueNumber, handleInputChange]);

	return (
		<div className={'flex items-center space-x-2 ' + className}>
			<span
				onClick={decrement}
				className='bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg p-2 focus:outline-none'
			>
				<AiOutlineMinus />
			</span>
			<input
				type='text'
				value={valueNumber}
				onChange={(e) => setvalueNumber(Number(e.target.value))}
				required={required}
				placeholder={placeholder}
				className='border border-gray-300 rounded-lg py-2 px-4 w-16 text-center focus:outline-none focus:ring-2 focus:ring-green-700'
			/>
			<span
				onClick={increment}
				className='bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg p-2 focus:outline-none'
			>
				<AiOutlinePlus />
			</span>
		</div>
	);
}

export default Input;
