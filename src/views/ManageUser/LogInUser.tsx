import { Dispatch, useState } from 'react';
import InputForm from '../../components/InputForm';

interface signInForms {
	type: 'email' | 'password';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function Page() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const listForms: signInForms[] = [
		{
			type: 'email',
			label: 'Correo',
			handleInputChange: setEmail,
			value: email,
			required: true,
			placeholder: '',
		},
		{
			type: 'password',
			label: 'Contraseña',
			handleInputChange: setPassword,
			value: password,
			required: true,
			placeholder: 'Ingresa tu Contraseña',
		},
	];

	return (
		<div className='container'>
			<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
				UNIHOP
			</h1>
			<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-2'></div>

			<form>
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
			</form>
		</div>
	);
}

export default Page;
