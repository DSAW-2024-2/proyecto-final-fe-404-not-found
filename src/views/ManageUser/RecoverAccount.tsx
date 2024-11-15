import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';
import Checkbox from '../../components/Buttons/Checkbox';
import Button2 from '../../components/Buttons/TextButton';
import { Navigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';

interface itemForms {
	type: 'text';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function recoverView() {
	const [userName, setUser] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false); // Para manejar el estado de carga
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar mensajes de error

	const apiRecover = async () => {
		if (!userName) {
			setErrorMessage('Por favor, completa la información requerida');
			return;
		}

		setLoading(true);

		try {
			const url = localStorage.getItem('API') + '/user/info/recover';

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userName: userName,
				}),
			});
			const data = await response.json();
			if (data.status === 200) {
				alert('Email sent');
			} else {
				alert('Error creating user');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		apiRecover();
	};

	const listForms: itemForms[] = [
		{
			type: 'text',
			label: 'Usuario',
			handleInputChange: setUser,
			value: userName,
			required: true,
			placeholder: 'Ingresa tu usuario',
		},
	];

	return (
		<div className='sm:bg-white md:w-screen md:h-screen md:bg-[#6D9773] flex justify-center items-center'>
			<div className='container p-4 max-w-80 md:w-[50%] md:h-[70%] md:bg-white'>
				<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
					Recuperación de Contraseña
				</h1>
				<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-12'></div>

				<form
					className='mb-0'
					onSubmit={handleSubmit}
					onClick={() => setErrorMessage(null)}
				>
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

					<div className='mb-5 mr-5 text-right text-xs cursor-pointer'>
						<Link to='/User/Info/Recover'>¿Olvidaste tu contraseña?</Link>
					</div>
					<div className='pl-5'>
						<Button onClick={() => {}} disabled={loading}>
							{loading ? 'Cargando...' : 'Iniciar Sesión'}
						</Button>
					</div>
					<div className='text-left ml-5 mt-2 text-xs cursor-pointer'>
						¿No estás registrado?{' '}
						<Link to={'/user/register'} className='text-blue-500'>
							Haz click aquí
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default recoverView;
