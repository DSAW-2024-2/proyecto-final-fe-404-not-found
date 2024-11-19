import React, { FC } from 'react';
import Swal from 'sweetalert2';
import Accept from '../../Buttons/Accept';

interface CardProps {
	title: string;
	description: string;
	additionalInfo: string;
	className?: string;
	isHovered?: boolean;
	request: boolean;
}

const Card: FC<CardProps> = ({
	title,
	description,
	additionalInfo,
	className = '',
	isHovered = false,
	request,
}) => {
	const baseClasses = `
    ${isHovered ? 'hover:shadow-lg hover:bg-gray-100' : ''}
    transition duration-200
  `;

	const handleClick = () => {
		Swal.fire({
			title: `<strong>${title}</strong>`,
			html: `<p>${description}</p><p>${additionalInfo}</p>`,
			icon: 'info',
			confirmButtonText: 'Close',
		});
	};

	return (
		<div
			className={`${baseClasses} ${className} cursor-pointer`}
			onClick={handleClick}
		>
			<div className='p-4'>
				<h3 className='text-xl font-semibold'>{title}</h3>
				<p className='text-gray-600'>{description}</p>
				{request && <Accept></Accept>}
			</div>
		</div>
	);
};

export default Card;
