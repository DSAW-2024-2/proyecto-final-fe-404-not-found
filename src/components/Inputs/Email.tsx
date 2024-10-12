import { Dispatch, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

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
	const [valueEmail, setValueEmail] = useState('');

	const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		handleInputChange(inputValue);
		setValueEmail(inputValue);

		// Validar el email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setIsValid(emailRegex.test(inputValue));
	};

	return (
		<div className='relative'>
			<input
				type='email'
				value={valueEmail}
				onChange={changeEmail}
				required={required}
				placeholder={placeholder || 'ejemplo@correo.com'}
				className={`mt-1 block w-full py-2 pr-10 pl-3 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${
					isFocused
						? 'focus:ring-2 focus:ring-green-700'
						: 'focus:ring-2 focus:ring-blue-500'
				} ${!isValid ? 'border-red-500' : 'border-gray-300'} ${className}`}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<span className='absolute inset-y-0 right-0 pr-3 flex items-center'>
				<FaEnvelope className='h-5 w-5 text-gray-400' />
			</span>
		</div>
	);
}

export default Input;
