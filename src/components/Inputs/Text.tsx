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
	const [valueText, setValueText] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /^[A-Za-z0-9!@#$*_.]*$/;
		const input = e.target.value;

		//Verifica la longitud del input y los caracteres utilizados
		if (input.length < 20 && input.match(regex)) {
			handleInputChange(e.target.value); // Actualizar el estado con el valor del input
			setValueText(e.target.value);
		} else {
			e.target.value.slice(0, 20); //La corta a 20 en caso de que sea superior
		}
	};
	return (
		<input
			type='text'
			value={valueText}
			required={required}
			placeholder={placeholder}
			onChange={onChange}
			maxLength={20}
			className={`mt-1 block w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${
				isFocused
					? 'focus:ring-2 focus:ring-green-700'
					: 'focus:ring-2 focus:ring-blue-500'
			} ${className}`}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		/>
	);
}

export default Input;
