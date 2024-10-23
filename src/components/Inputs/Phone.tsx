import { Dispatch, useState } from 'react';
import { FaPhone } from 'react-icons/fa';

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
	//-------Telefono-------
	const [isFocused, setIsFocused] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [valuePhone, setValuePhone] = useState('');

	const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		const formattedInput = input
			.replace(/\D/g, '') // Eliminar todo lo que no sea un dígito
			.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'); // Formatear el número de teléfono
		if (input.length < 15) {
			setValuePhone(formattedInput);
			handleInputChange(formattedInput);
			setIsValid(formattedInput.length == 14);
		}
	};

	return (
		<div className={'relative ' + className}>
			<input
				type='tel'
				value={valuePhone}
				onChange={changePhone}
				placeholder={placeholder}
				required={required}
				className={`mt-1 mx-5 block w-[250px] py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
					isFocused ? 'focus:ring-green-700' : 'focus:ring-blue-500'
				} ${!isValid ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<span className='absolute inset-y-0 right-0 pr-7 flex items-center'>
				<FaPhone className='h-5 w-5 text-gray-400' />{' '}
			</span>
		</div>
	);
}

export default Input;
