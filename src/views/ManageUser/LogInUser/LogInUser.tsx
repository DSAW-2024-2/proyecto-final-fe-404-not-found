import { Dispatch, useState } from 'react';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import { Link, Navigate } from 'react-router-dom';
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
	const [loading, setLoading] = useState<boolean>(false); // Para manejar el estado de carga
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar mensajes de error
	const [userPreference, setUserPreference] = useState<string>('email');

	const ApiLogIn = async () => {
		// Validación simple de que el email y password no estén vacíos
		if (!user || !password) {
			setErrorMessage('Por favor, ingresa un correo y una contraseña.');
			return;
		}

		// API call para iniciar sesión
		setLoading(true); // Desactivar el botón mientras se realiza la solicitud

		try {
			const url = localStorage.getItem('API') + '/user/login';

			const body =
				userPreference === 'email'
					? {
							email: user,
							password: password,
						}
					: {
							userName: user,
							password: password,
						};

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Indicar que el contenido es JSON
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (data.token) {
				// Guardar el token en el localStorage si el inicio de sesión fue exitoso
				localStorage.setItem('token', data.token);
			} else {
				// Si hubo un error en la respuesta de la API
				setErrorMessage('Usuario o contraseña incorrectos.');
			}
		} catch (error) {
			// Manejo de errores de red
			setErrorMessage('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
			console.error(error);
		} finally {
			setLoading(false); // Rehabilitar el botón después de la solicitud
		}
	};

	// Redireccionar si el usuario ya tiene un token
	if (localStorage.getItem('token')) {
		return <Navigate to={searchRoute('HomePage')?.path || prefix} />;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevenir el comportamiento por defecto (recarga de la página)
		ApiLogIn(); // Llamar a la API para iniciar sesión
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

					{/* Mostrar mensaje de error si existe */}
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
	);
}

export default ViewLogInUser;
