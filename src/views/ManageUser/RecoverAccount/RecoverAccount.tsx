import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import Checkbox from '../../../components/Buttons/Checkbox';
import Button2 from '../../../components/Buttons/TextButton';
import { Navigate } from 'react-router-dom';
import {
	CheckCircleIcon,
	XCircleIcon,
	ArrowLeftIcon,
} from '@heroicons/react/16/solid';
import Input from '../../../components/InputForm';

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
		<div className='container max-w-md mx-auto px-4 py-8'>
			<div className='mb-8'>
				<Link
					to='/'
					className='inline-flex items-center text-sm hover:opacity-80'
				>
					<ArrowLeftIcon className='w-4 h-4 mr-2' />
				</Link>
				<h1 className='text-2xl font-semibold text-center mt-4'>
					RECUPERAR CONTRASEÑA
				</h1>
				<div className='w-full h-0.5 bg-border mt-4' />
			</div>

			<div>
				<div className='p-6'>
					<form className='space-y-6'>
						<div className='space-y-2'>
							<label htmlFor='username' className='text-lg'>
								Usuario
							</label>
							{listForms.map((form, index) => (
								<InputForm
									key={index}
									type={form.type}
									label={form.label}
									value={form.value}
									required={form.required}
									handleInputChange={form.handleInputChange}
									placeholder={form.placeholder}
								/>
							))}
						</div>

						<div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
							<Button onClick={() => {}}>Cancelar</Button>
							<Button onClick={() => handleSubmit}>Recuperar contraseña</Button>
						</div>
					</form>
				</div>
			</div>

			<div className='mt-8 text-center space-y-4 text-muted-foreground'>
				<p>
					Te llegará un correo con las instrucciones de cambio de contraseña.
				</p>
				<p>
					<span>¿No te llegó ningún correo? </span>
					<Link to='#' className='text-primary hover:underline'>
						Haz click aquí para reenviarlo.
					</Link>
				</p>
			</div>
		</div>
	);
}

export default recoverView;
