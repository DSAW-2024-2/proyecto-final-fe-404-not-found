import { Dispatch, useState } from 'react';

import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';
import Checkbox from '../../components/Buttons/Checkbox';
import Button2 from '../../components/Buttons/TextButton';

interface itemForms {
	type:
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'date'
		| 'tel'
		| 'time'
		| 'id';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function ViewRegisterUser() {
	const [name, setName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [id, setId] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [verifyPassword, setVerifyPassword] = useState<string>('');

	const listForms: itemForms[] = [
		{
			type: 'text',
			label: 'Nombre',
			handleInputChange: setName,
			value: name,
			required: true,
			placeholder: 'Ingresa tu Nombre',
		},
		/*{
			type: 'image',
			handleInputChange: setName,
			value: name,
			required: true,
			placeholder: 'Ingresa tu Nombre',
		},*/
		{
			type: 'text',
			label: 'Apellido',
			handleInputChange: setLastName,
			value: lastName,
			required: true,
			placeholder: 'Ingresa tu Apellido',
		},
		{
			type: 'id',
			label: 'ID Universitario',
			handleInputChange: setId,
			value: id,
			required: true,
			placeholder: 'Ingresa tu id',
		},
		{
			type: 'email',
			label: 'Correo',
			handleInputChange: setEmail,
			value: email,
			required: true,
			placeholder: 'ejemplo@unisabana.edu.co',
		},
		{
			type: 'tel',
			label: 'Número de Teléfono',
			handleInputChange: setPhone,
			value: phone,
			required: true,
			placeholder: '(123) 456-5678',
		},
		{
			type: 'password',
			label: 'Contraseña',
			handleInputChange: setPassword,
			value: password,
			required: true,
			placeholder: 'Ingresa tu Contraseña',
		},
		{
			type: 'password',
			label: 'Confirma tu Contraseña',
			handleInputChange: setVerifyPassword,
			value: verifyPassword,
			required: true,
			placeholder: 'Confirma tu Contraseña',
		},
	];

	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
	};
	return (
		<div className='container p-4 max-w-80'>
			<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
				UNIHOP
			</h1>
			<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-2'></div>
			<div className='flex flex-col items-center'>
				<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300'>
					<span className='text-2xl'>+</span>
				</div>
				<p className='text-sm text-gray-500  mb-3'>Añadir imagen</p>
			</div>
			<form>
				{listForms.map((data: itemForms, index) => (
					<InputForm
						key={index}
						type={data.type}
						label={data.label}
						handleInputChange={data.handleInputChange}
						placeholder={data.placeholder}
						value={data.value}
						required={data.required}
					/>
				))}
			</form>
			<div className='ml-7 mt-8'>
				<Checkbox
					id='checkbox'
					label='Aceptar términos y condiciones'
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<div className='ml-5'>
					<Button2 onClick={() => alert('hola')}>
						Leer términos y condiciones
					</Button2>
				</div>
			</div>
			<Button onClick={() => alert('hola')}>Registrarse</Button>
		</div>
	);
}

export default ViewRegisterUser;
