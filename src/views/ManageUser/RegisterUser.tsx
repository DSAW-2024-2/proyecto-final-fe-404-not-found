import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';
import Checkbox from '../../components/Buttons/Checkbox';
import Button2 from '../../components/Buttons/TextButton';
import { Navigate } from 'react-router-dom';

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
	const [loading, setLoading] = useState<boolean>(false); // Para manejar el estado de carga
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar mensajes de error

	const apiRegister = async () => {
		if (
			!name ||
			!lastName ||
			!id ||
			!email ||
			!phone ||
			!password ||
			!verifyPassword
		) {
			setErrorMessage('Por favor, completa la información requerida');
			return;
		} else {
			if (!isChecked) {
				setErrorMessage('Por favor, acepta Términos y Condiciones');
				return;
			}
		}

		setLoading(true);

		try {
			const url = localStorage.getItem('API') + '/user/register';
			console.log(url);

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name,
					lastName: lastName,
					id: id,
					email: email,
					phone: phone,
					password: password,
					verifyPassword: verifyPassword,
				}),
			});
			const data = await response.json();
			if (data.status === 200) {
				alert('User created successfully');
				window.location.href = '/home';
			} else {
				alert('Error creating user');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (localStorage.getItem('token')) {
		return <Navigate to='/home' />;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		apiRegister();
	};

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
		<div className='md:flex'>
			<div className='sm:hidden w-full h-full bg-[#6D9773]'></div>
			<div className='container p-4 max-w-80 md:w-full md:h-full'>
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
				<form></form>
				<form onSubmit={handleSubmit}>
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
					{/* Mostrar mensaje de error si existe */}
					{errorMessage && (
						<p className='text-red-500 text-sm'>{errorMessage}</p>
					)}

					<div className='ml-7 mt-8'>
						<Checkbox
							id='checkbox'
							label='Aceptar términos y condiciones'
							checked={isChecked}
							onChange={handleCheckboxChange}
						/>
						<div className='ml-5'>
							<Button2 onClick={() => {}}>
								<Link to={'/condiciones'}>Leer términos y condiciones</Link>
							</Button2>
						</div>
					</div>

					<div className='ml-5'>
						<Button onClick={() => {}} disabled={loading}>
							{loading ? 'Cargando...' : 'Registrarse'}
						</Button>
					</div>
				</form>
				<div className='text-left ml-5 mt-2 text-xs cursor-pointer'>
					¿Ya estás registrado?{' '}
					<Link to={'/user/login'} className='text-blue-500'>
						Haz click aquí
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ViewRegisterUser;
