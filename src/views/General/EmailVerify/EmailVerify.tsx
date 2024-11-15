import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { prefix, searchRoute } from '../../../utils/Routes';

export default function EmailConfirmationView() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const token = searchParams.get('token');

	useEffect(() => {
		const confirmEmail = async () => {
			if (!token) {
				setError('Token no proporcionado');
				setIsLoading(false);
				return;
			}

			try {
				const response = await fetch(`${localStorage.getItem('API')}/user`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log(response);
				if (!response.ok) {
					throw new Error('Error al confirmar el correo electrónico');
				}

				setIsConfirmed(true);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setIsLoading(false);
			}
		};

		confirmEmail();
	}, [token]);

	const handleRedirect = () => {
		navigate(searchRoute('Login')?.path || prefix);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='p-8 bg-white shadow-lg rounded-lg'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto'></div>
					<p className='mt-4 text-center text-gray-600'>
						Confirmando tu correo electrónico...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='p-8 bg-white shadow-lg rounded-lg max-w-md w-full'>
				{isConfirmed ? (
					<div className='text-center'>
						<CheckCircleIcon className='h-16 w-16 text-green-500 mx-auto' />
						<h1 className='text-2xl font-bold mt-4 text-gray-800'>
							¡Correo confirmado!
						</h1>
						<p className='mt-2 text-gray-600'>
							Tu cuenta ha sido verificada exitosamente.
						</p>
					</div>
				) : (
					<div className='text-center'>
						<XCircleIcon className='h-16 w-16 text-red-500 mx-auto' />
						<h1 className='text-2xl font-bold mt-4 text-gray-800'>
							Error de confirmación
						</h1>
						<p className='mt-2 text-gray-600'>
							{error || 'No se pudo confirmar tu correo electrónico.'}
						</p>
					</div>
				)}
				<button
					onClick={handleRedirect}
					className='mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200'
				>
					{isConfirmed ? 'Ir al inicio de sesión' : 'Volver al inicio'}
				</button>
			</div>
		</div>
	);
}
