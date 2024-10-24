import { Dispatch, useState } from 'react';
import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';

interface signInForms {
	type: 'email' | 'password';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function ViewLogInUser() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const listForms: signInForms[] = [
		{
			type: 'email',
			label: 'Usuario',
			handleInputChange: setEmail,
			value: email,
			required: false,
			placeholder: ' ',
		},
		{
			type: 'password',
			label: 'Contraseña',
			handleInputChange: setPassword,
			value: password,
			required: false,
			placeholder: 'Ingresa tu Contraseña',
		},
	];

	return (
		<div className='container p-4 max-w-80'>
			<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
				UNIHOP
			</h1>
			<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-12'></div>

			<form className='mb-0'>
				{listForms.map((data: signInForms, index) => (
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
				<div className='mb-5  mr-5 text-right text-xs'>
					¿Olvidaste tu contraseña?
				</div>
				<Button onClick={() => alert('hola')}>Iniciar Sesión</Button>
				<div className='text-left ml-5 mt-2 text-xs'>
					¿No estás registado? Haz click aquí
				</div>
			</form>
		</div>
	);
}

export default ViewLogInUser;
