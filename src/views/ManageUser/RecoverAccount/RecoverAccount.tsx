import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { prefix, searchRoute } from '../../../utils/Routes';
import LoadingState from '../../../utils/Loader';

interface itemForms {
	type: 'text';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function RecoverView() {
	const [userName, setUser] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
			if (response.ok) {
				setErrorMessage(null);
				setLoading(false);
				// Redirect to search route
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
		<div className='bg-[#6D9773] h-lvh w-lvw flex justify-center items-center'>
			<div className='container max-w-md mx-auto px-4 py-8 bg-white rounded shadow-md'>
				{/* Header */}
				<div className='mb-8'>
					<Link
						to={searchRoute('Login')?.path || prefix}
						className='inline-flex items-center text-sm hover:opacity-80'
					>
						<ArrowLeftIcon className='w-4 h-4 mr-2' />
						<span>Volver</span>
					</Link>
					<h1 className='text-2xl font-semibold text-center mt-4'>
						Recuperar Contraseña
					</h1>
					<div className='w-full h-0.5 bg-gray-200 mt-4' />
				</div>

				{/* Formulario */}
				<form
					onSubmit={handleSubmit}
					className='space-y-6 bg-gray-50 p-6 rounded-lg'
				>
					{listForms.map((form, index) => (
						<div key={index} className='space-y-2'>
							<InputForm
								type={form.type}
								label={form.label}
								value={form.value}
								required={form.required}
								handleInputChange={form.handleInputChange}
								placeholder={form.placeholder}
							/>
						</div>
					))}
					{/* Condicional para mostrar el estado de carga */}
					{loading ? (
						<div className='flex justify-center items-center'>
							<LoadingState />
						</div>
					) : (
						<div className='flex flex-col gap-3 sm:flex-row sm:justify-between items-center'>
							<Button onClick={() => {}}>
								<Link to={searchRoute('Login')?.path || prefix}>Cancelar</Link>
							</Button>
							<Button onClick={() => {}}>Recuperar contraseña</Button>
						</div>
					)}
				</form>

				{/* Mensaje de error */}
				{errorMessage && (
					<p className='text-red-500 text-center mt-3'>{errorMessage}</p>
				)}

				{/* Mensaje de ayuda */}
				<div className='mt-8 text-center text-gray-600'>
					<p>
						Te llegará un correo con las instrucciones de cambio de contraseña.
					</p>
					<p>
						<span>¿No te llegó ningún correo? </span>
						<span
							onClick={() => {
								apiRecover();
							}}
							className='text-blue-500 hover:underline cursor-pointer'
						>
							Haz click aquí para reenviarlo.
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default RecoverView;
