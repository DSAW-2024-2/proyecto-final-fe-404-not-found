import React, { FC, useEffect, useState } from 'react';
import Card from './Passenger'; // Assuming this is the card for detailed display

interface CardProps {
	type: string; // Used for API endpoint type
	className?: string;
	isHovered?: boolean;
	request: boolean;
	users: User[];
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

const Card1: FC<CardProps> = ({
	type,
	users,
	request,
	className = '',
	isHovered = false,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [baseClasses, setBaseClasses] = useState<string>('');

	useEffect(() => {
		setBaseClasses(
			`${isHovered ? 'hover:shadow-lg hover:bg-gray-100' : ''}transition duration-200`
		);
	}, [isHovered]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className={`${baseClasses} ${className}`}>
			<div className='p-4'>
				<h3 className='text-xl font-semibold'>{type}</h3>
				<div className='grid gap-4 mt-4'>
					{users.length > 0 ? (
						users.map((user, key) => (
							<Card key={key} user={user} request={request} />
						))
					) : (
						<div>No users found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card1;
