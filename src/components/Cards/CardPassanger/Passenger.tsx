import React, { FC, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../Buttons/Accept';

interface CardProps {
	user: User;
	className?: string;
	isHovered?: boolean;
	request: boolean;
}

interface User {
	idCreator: string;
	userName: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	stop: string;
	paymentMethod: string;
}

const Card: FC<CardProps> = ({
	user,
	className = '',
	isHovered = false,
	request,
}) => {
	const [baseClasses, setBaseClasses] = useState<string>('');
	useEffect(() => {
		setBaseClasses(
			`${isHovered ? 'hover:shadow-lg hover:bg-gray-100' : ''}transition duration-200`
		);
	}, [isHovered]);

	const token = localStorage.getItem('token');

	const bodyRequest = {};

	const apiBaseUrl = localStorage.getItem('API') || '';

	const acceptPassenger = async () => {
		try {
			const response = await fetch(`${apiBaseUrl}/trip/accept`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ bodyRequest }),
			});

			if (!response.ok) {
				throw new Error('Failed to accept passenger');
			}

			Swal.fire('Accepted', `El pasajero ha sido aceptado.`, 'success');
		} catch (error) {
			Swal.fire('Error', (error as Error).message, 'error');
		}
	};

	const denyPassenger = async () => {
		try {
			const response = await fetch(`${apiBaseUrl}/trip/deny`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ bodyRequest }),
			});

			if (!response.ok) {
				throw new Error('Failed to deny passenger');
			}

			Swal.fire('Denied', `El pasajero ha sido rechazado`, 'info');
		} catch (error) {
			Swal.fire('Error', (error as Error).message, 'error');
		}
	};

	const handleClick = () => {
		Swal.fire({
			title: `<strong>${user.firstName}${user.lastName}</strong>`,
			html: `<p>${user.email}</p><p>${user.phone}</p><p>${user.stop}</p><p>${user.paymentMethod}</p>`,
			icon: 'info',
			confirmButtonText: 'Close',
		});
	};

	return (
		<div
			className={`${baseClasses} ${className} cursor-pointer`}
			onClick={handleClick}
		>
			<div className='p-4 w-full flex gap-x-10'>
				<div className='flex gap-x-2'>
					<img src='https://via.placeholder.com/150' alt='user' />
					<div>
						<h3 className='text-xl font-semibold'>
							{user.firstName}
							{user.lastName}
						</h3>
						<p className='text-gray-600'>{user.stop}</p>
					</div>
				</div>
				{request && (
					<div className='flex mt-4'>
						<Button acceptFun={acceptPassenger} denyFun={denyPassenger} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
