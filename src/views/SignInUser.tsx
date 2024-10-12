import { Dispatch, useState } from 'react';
import InputForm from '../components/InputForm';

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

function ViewSignInUser() {
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
		{
			type: 'number',
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

	return (
		<div className='container'>
			<h1>Formulario de registro</h1>
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
		</div>
	);
}

export default ViewSignInUser;
