import whiteLogo from '../../components/pictures/whiteLogo.png';
import { Link } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { useState } from 'react';

function EmailVerify() {
	// Adjusted the name to match import
	const [loading, setLoading] = useState<boolean>(false); // Manage loading state

	const apiRegister = async () => {
		setLoading(true);
		try {
			const url = `${localStorage.getItem('API')}/user`;
			const token = localStorage.getItem('token');

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				alert('Usuario creado correctamente. Email enviado.');
				window.location.href = '/home';
			} else {
				alert('Error al crear usuario.');
			}
		} catch (error) {
			console.error('Error al conectar con el servidor:', error);
			alert('Hubo un problema al crear el usuario. Inténtalo de nuevo.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container flex items-center justify-center h-[480px]  overflow-hidden mx-auto bg-black'>
			<div className='w-[250px] p-4 pt-10 h-[300px] rounded-md bg-white'>
				<h1 className='text-center '>VERIFICACIÓN DE EMAIL</h1>
				<br />
				<div className='w-[80%] ml-5 border border-black'></div> <br />
				<div className='flex justify-center '>
					<button onClick={apiRegister} disabled={loading}>
						{loading ? 'Procesando...' : 'Verificar Correo'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default EmailVerify;
