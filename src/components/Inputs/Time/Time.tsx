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
	//-----TIME------
	const [valueTime, setValueTime] = useState('');
	const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleInputChange(e.target.value); // Actualizar el estado con la hora seleccionada
		setValueTime(e.target.value);
	};

	return (
		<input
			type='time'
			value={valueTime}
			placeholder={placeholder}
			required={required}
			onChange={changeTime}
			className={
				' w-full py-2 px-1 bg-black text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D9773] ' +
				className
			}
		/>
	);
}

export default Input;
