import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import Checkbox from '../../../components/Buttons/Checkbox';
import Button2 from '../../../components/Buttons/TextButton';
import { prefix, searchRoute } from '../../../utils/Routes';

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
	handleInputChange?: Dispatch<React.SetStateAction<string>>;
}

function ViewRegisterUser() {
	const [name, setName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [userName, setUser] = useState<string>('');
	const [id, setId] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [verifyPassword, setVerifyPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false); // Para manejar el estado de carga
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar mensajes de error
	const [file, setFile] = useState<File>();
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const apiRegister = async () => {
		if (
			!name ||
			!lastName ||
			!userName ||
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
			const url =
				localStorage.getItem('API') ===
				'https://proyecto-final-be-404-not-found.vercel.app/api-wheels/v1'
					? localStorage.getItem('API') + '/user/backup/register'
					: localStorage.getItem('API') + '/email/validate';

			const formData = new FormData();
			let responseImage;
			if (file) {
				formData.append('image', file);
				const urlImage = localStorage.getItem('API') + '/firebase/upload';
				responseImage = await fetch(urlImage, {
					method: 'POST',
					headers: {
						Authorization:
							'Bearer ' +
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIxIiwiaWQiOiI2NzEyNWYzMTYyZTljOTA3ZmQ1MzU0MWEiLCJpYXQiOjE3Mjk0NzMwODB9.yJIBDgnomJzNrFyc_NpEZ_zC0wvsG2d5mfNJ2nlT8F8',
					},
					body: formData,
				});
				console.log(responseImage);
			}
			const imageProfile = responseImage || '';
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					imageProfile,
					firstName: name,
					lastName: lastName,
					userName: userName,
					idUniversidad: id,
					email: email,
					phone: phone,
					password: password,
					verifyPassword: verifyPassword,
				}),
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		apiRegister();
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
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
			type: 'text',
			label: 'Usuario',
			handleInputChange: setUser,
			value: userName,
			required: true,
			placeholder: 'Ingresa tu usuario',
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
		<div className='md:flex md:mt-0 justify-center items-center min-h-dvh bg-[#6D9773]'>
			{/* Fondo del lado izquierdo en pantallas pequeñas */}
			<div className='sm:hidden w-full h-full '></div>

			<div className='container block md:flex p-6 max-w-md bg-white rounded-lg shadow-xl md:max-w-full md:p-0'>
				<div className='md:bg-[#6D9773] md:p-6 md:w-2/5'>
					{/* Título */}
					<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
						UNIHOP
					</h1>
					<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-2'></div>

					{/* Imagen de perfil */}
					<div className='flex flex-col items-center mb-6 pt-3 md:justify-center md:h-2/4'>
						<InputForm
							type='image'
							handleImageChange={setFile}
							label={''}
							value={''}
						/>
						<p className='text-sm text-gray-500'>Sube una foto de perfil</p>
					</div>
				</div>

				<div className='md:p-6 md:w-3/5 md:py-10'>
					{/* Formulario */}
					<form
						onSubmit={handleSubmit}
						className='w-full max-w-[290px] mx-auto md:max-w-fit'
					>
						{/* Campos del formulario */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{listForms.map((data: itemForms, index) => (
								<div key={index}>
									<InputForm
										type={data.type}
										label={data.label}
										handleInputChange={data.handleInputChange}
										placeholder={data.placeholder}
										value={data.value}
										required={data.required}
									/>
								</div>
							))}
						</div>

						{/* Mensaje de error */}
						{errorMessage && (
							<p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
						)}

						{/* Términos y condiciones */}
						<div className='flex flex-col items-center mt-6'>
							<Checkbox
								id='checkbox'
								label='Aceptar términos y condiciones'
								checked={isChecked}
								onChange={handleCheckboxChange}
							/>
							<div className='ml-4'>
								<Button2 onClick={() => {}}>
									<Link to={searchRoute('Conditions')?.path || prefix}>
										Leer términos y condiciones
									</Link>
								</Button2>
							</div>
						</div>
						<div className='md:flex md:items-center md:gap-10 '>
							{/* Botón de registro */}
							<div className=' flex justify-center mt-8'>
								<Button onClick={() => {}} disabled={loading}>
									{loading ? 'Cargando...' : 'Registrarse'}
								</Button>
							</div>
							{/* Enlace para redirigir a login */}
							<div className='text-center mt-4 text-sm md:text-base md:flex md:items-end'>
								¿Ya estás registrado?{' '}
								<Link
									to={searchRoute('Login')?.path || prefix}
									className='text-green-600 hover:underline'
								>
									Haz click aquí
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

/*
<div className='md:flex'>
			<div className='sm:hidden w-full h-full bg-[#6D9773]'></div>
			<div className='container p-4 max-w-80 md:w-full md:h-full'>
				<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
					UNIHOP
				</h1>
				<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-2'></div>
				<div className='flex flex-col items-center'>
					<InputForm
						type='image'
						handleImageChange={setFile}
						label={'Perfil'}
						value={'Hola'}
					/>
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
								<Link to={searchRoute('Conditions')?.path || prefix}>
									Leer términos y condiciones
								</Link>
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
					<Link
						to={searchRoute('Login')?.path || prefix}
						className='text-blue-500'
					>
						Haz click aquí
					</Link>
				</div>
			</div>
		</div>
		*/

export default ViewRegisterUser;
