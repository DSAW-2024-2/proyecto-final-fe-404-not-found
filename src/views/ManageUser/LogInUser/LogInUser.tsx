import { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import { Link } from 'react-router-dom';
import { prefix, searchRoute } from '../../../utils/Routes';
import { FaExchangeAlt } from 'react-icons/fa';

interface signInForms {
	type: 'email' | 'password' | 'text';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function ViewLogInUser() {
	const [user, setUser] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [userPreference, setUserPreference] = useState<string>('email');
	const navigate = useNavigate();

	const ApiLogIn = async () => {
		if (!user || !password) {
			setErrorMessage(
				'Por favor, ingresa un correo o nombre de usuario y una contraseña.'
			);
			return;
		}

		setLoading(true);

		try {
			const url = localStorage.getItem('API') + '/user/login';

			const body =
				userPreference === 'email'
					? { email: user, password: password }
					: { userName: user, password: password };

			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (data.token) {
				localStorage.setItem('token', data.token);
				return navigate(searchRoute('HomePage')?.path || prefix);
			} else {
				setErrorMessage('Usuario o contraseña incorrectos.');
			}
		} catch (error) {
			setErrorMessage('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		ApiLogIn();
	};

	const listForms: signInForms[] = [
		{
			type: userPreference === 'email' ? 'email' : 'text',
			label: 'Usuario',
			handleInputChange: setUser,
			value: user,
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
		<div className='flex justify-center items-center h-dvh bg-[#6D9773] '>
			<div className='bg-white p-8 rounded-lg shadow-lg w-lvw max-w-[420px] '>
				<h1 className='text-[22px] leading-[28px] font-normal text-center text-gray-800 pt-5'>
					UNIHOP
				</h1>

				<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-12'></div>

				<form onSubmit={handleSubmit} onClick={() => setErrorMessage(null)}>
					{/* Campos del formulario */}
					{listForms.map((data: signInForms, index) => (
						<div key={index} className='w-full max-w-[290px] ml-8'>
							<InputForm
								key={index}
								type={data.type}
								label={data.label}
								handleInputChange={data.handleInputChange}
								placeholder={data.placeholder}
								value={data.value}
								required={data.required}
							/>
						</div>
					))}

					{/* Mensaje de error */}
					{errorMessage && (
						<p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
					)}

					{/* Enlace para recuperar la contraseña */}
					<div className='text-right text-xs mt-4 mr-12'>
						<Link
							to={searchRoute('RecoverPassword')?.path || prefix}
							className='text-green-600 hover:underline'
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>

					{/* Botón Iniciar Sesión centrado */}
					<div className='mt-6 flex justify-center'>
						<Button onClick={() => {}} disabled={loading}>
							{loading ? 'Cargando...' : 'Iniciar Sesión'}
						</Button>
					</div>

					{/* Enlace para registro */}
					<div className='text-center text-xs mt-4'>
						<p className='text-gray-700'>
							¿No estás registrado?{' '}
							<Link
								to={searchRoute('Register')?.path || prefix}
								className='text-green-600 hover:underline'
							>
								Haz click aquí
							</Link>
						</p>
					</div>

					{/* Cambio entre Email/Username */}
					<div className='flex items-center justify-center mt-6 space-x-2'>
						<p className='text-xs text-center text-gray-500 mt-2'>
							Haz clic para cambiar a{' '}
							{userPreference === 'email' ? 'Username' : 'Email'}
						</p>
						<FaExchangeAlt
							className='text-gray-700 cursor-pointer text-xl hover:text-green-500'
							onClick={() =>
								setUserPreference((prev) =>
									prev === 'email' ? 'username' : 'email'
								)
							}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

/*
<div className='sm:bg-white md:w-screen md:h-screen md:bg-[#6D9773] flex justify-center items-center'>
			<div className='container p-4 max-w-80 md:w-[50%] md:h-[70%] md:bg-white'>
				<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
					UNIHOP
				</h1>
				<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-12'></div>

				<form
					className='mb-0'
					onSubmit={handleSubmit}
					onClick={() => setErrorMessage(null)}
				>
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

					{errorMessage && (
						<p className='text-red-500 text-sm'>{errorMessage}</p>
					)}

					<div className='mb-5 mr-5 text-right text-xs cursor-pointer'>
						<Link to={searchRoute('RecoverPassword')?.path || prefix}>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<div className='pl-5'>
						<Button onClick={() => {}} disabled={loading}>
							{loading ? 'Cargando...' : 'Iniciar Sesión'}
						</Button>
					</div>
					<div className='text-left ml-5 mt-2 text-xs cursor-pointer'>
						¿No estás registrado?{' '}
						<Link
							to={searchRoute('Register')?.path || prefix}
							className='text-blue-500'
						>
							Haz click aquí
						</Link>
					</div>
					<div className='text-left ml-5 mt-2 text-xs cursor-pointer'>
						Log in con {userPreference}{' '}
						<FaExchangeAlt
							className='inline'
							onClick={() =>
								setUserPreference((prev) =>
									prev === 'email' ? 'username' : 'email'
								)
							}
						/>
					</div>
				</form>
			</div>
		</div>
		*/

export default ViewLogInUser;
