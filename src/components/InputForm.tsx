import React, { Dispatch, SetStateAction } from 'react';

import Password from './Inputs/Password';
import NumberInput from './Inputs/Number';
import DateInput from './Inputs/Date';
import Phone from './Inputs/Phone';
import Time from './Inputs/Time';
import Text from './Inputs/Text';
import Email from './Inputs/Email';
import Id from './Inputs/Id';
import Image from './Inputs/Image';

//Funcion de Componente
function Input({
	type = 'text', //tipo del input
	label = ' ', //titulo del input
	value, //valor que toma
	handleInputChange = () => {}, //funcion del hook que setState
	handleImageChange = () => {},
	required, //saber si es obligatorio
	placeholder = '',
	style_label = '',
}: {
	type?:
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'date'
		| 'tel'
		| 'time'
		| 'id'
		| 'image';
	placeholder?: string;
	label: string;
	value: string;
	required?: boolean;
	handleInputChange?: Dispatch<React.SetStateAction<string>>;
	handleImageChange?: Dispatch<SetStateAction<File | undefined>>;
	style_label?: string;
}) {
	const typeInput = () => {
		switch (type) {
			case 'password':
				return (
					<Password
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);

			case 'number':
				return (
					<NumberInput
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);

			case 'date':
				return (
					<DateInput
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);

			case 'time':
				return (
					<Time
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);
			case 'tel':
				return (
					<Phone
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);
			case 'text':
				return (
					<Text
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);
			case 'email':
				return (
					<Email
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);
			case 'id':
				return (
					<Id
						handleInputChange={handleInputChange}
						placeholder={placeholder}
						required={required}
					/>
				);
			case 'image':
				return (
					<Image
						handleImageChange={handleImageChange}
						placeholder={placeholder}
					/>
				);
			default:
				return (
					<input
						type={type}
						value={value}
						required={required}
						onChange={() => {}}
						maxLength={20}
						className='border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500'
					/>
				);
		}
	};

	return (
		<div className='mb-4'>
			<label
				className={
					style_label +
					' block text-lg font-normal text-gray-700 mb-1 ml-5 ' +
					style_label
				}
			>
				{label}
				{required && <span className='text-red-500'>*</span>}
			</label>
			{typeInput()}
		</div>
	);
}

export default Input;
