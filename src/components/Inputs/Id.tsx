import { Dispatch, useState } from 'react';

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
	const [isFocused, setIsFocused] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [valueId, setValueId] = useState('');

	const changeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		const formattedInput = input
			.replace(/\D/g, '') // Eliminar todo lo que no sea un dígito
			.replace(/(\d{6})/, '0000$1'); // Formatear el número de teléfono

		if (input.length < 11) {
			handleInputChange(formattedInput);
			setValueId(formattedInput);
			setIsValid(formattedInput.length === 10);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			const formattedInput = valueId
				.replace(/\D/g, '') // Eliminar todo lo que no sea un dígito
				.replace(/(\d{4})(\d{6})/, '$2');
			handleInputChange(formattedInput);
			setValueId(formattedInput);
		}
	};

	return (
		<div className='relative'>
			<input
				type='text'
				value={valueId}
				required={required}
				onChange={changeId}
				onKeyDown={handleKeyDown}
				placeholder={placeholder || '123456'}
				className={`mt-1 mx-5 block w-[250px] py-2 px-3 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${
					isFocused
						? 'focus:ring-2 focus:ring-green-700'
						: 'focus:ring-2 focus:ring-blue-500'
				} ${!isValid ? 'border-red-500' : 'border-gray-300'} ${className}`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
}

export default Input;
