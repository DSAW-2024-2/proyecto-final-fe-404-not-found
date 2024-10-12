import { Dispatch, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

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
	//-----CONTRASEÑA-------
	const [valuePassword, setValuePassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		const input = e.target.value;

		//Verifica la longitud del input y los caracteres utilizados
		if (input.length < 20) {
			setValuePassword(input);
			handleInputChange(regex.test(input) ? valuePassword : ''); // Actualizar el estado con el valor del input
			setIsValid(regex.test(input));
		} else {
			e.target.value.slice(0, 20); //La corta a 20 en caso de que sea superior
		}
	};

	return (
		<div className={'relative ' + className}>
			<input
				type={showPassword ? 'text' : 'password'}
				value={valuePassword}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				className={`w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
					isFocused ? 'focus:ring-green-700' : 'focus:ring-blue-500'
				} ${!isValid ? 'border-red-500' : 'border-gray-300'} transition duration-200 `}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<button
				type='button'
				onClick={togglePasswordVisibility}
				className='absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none'
			>
				{showPassword ? (
					<AiFillEyeInvisible className='h-5 w-5 text-gray-500' />
				) : (
					<AiFillEye className='h-5 w-5 text-gray-500' />
				)}
			</button>
		</div>
	);
}

export default Input;
