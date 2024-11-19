import React, { FC } from 'react';
import Card from './Passenger';
interface CardProps {
	title: string;
	className?: string;
	isHovered?: boolean;
	request: boolean;
}

const Card1: FC<CardProps> = ({ title, className = '', isHovered = false }) => {
	const baseClasses = `
    ${isHovered ? 'hover:shadow-lg hover:bg-gray-100' : ''}
    transition duration-200
  `;

  

	return (
		<div className={`${baseClasses} ${className} cursor-pointer`}>
			<div className='p-4'>
				<h3 className='text-xl font-semibold'>{title}</h3>
				<Card
					title=
					description=
					additionalInfo=
					className='max-w-sm'
				/>
			</div>
		</div>
	);
};

export default Card1;
