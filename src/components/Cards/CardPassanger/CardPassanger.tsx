import React, { FC, useEffect, useState } from 'react';
import Card from './Passenger'; // Assuming this is the card for detailed display

interface CardProps {
	type: string; // Used for API endpoint type
	className?: string;
	isHovered?: boolean;
	request?: boolean;
}

interface User {
	id: string; // Add this if needed for keys
	name: string;
	lastname: string;
	startPoint: string;
}

const Card1: FC<CardProps> = ({ type, className = '', isHovered = false }) => {
	const [users, setUsers] = useState<User[]>([]); // State to store fetched data
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = async () => {
		try {
			const url = `${localStorage.getItem('API')}/${type}`;
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Error fetching data: ${response.statusText}`);
			}

			const data = await response.json();
			setUsers(data); // Assuming the API response is an array of users
			setLoading(false);
		} catch (err) {
			setError((err as Error).message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [type]);

	const baseClasses = `
    ${isHovered ? 'hover:shadow-lg hover:bg-gray-100' : ''}
    transition duration-200
  `;

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className={`${baseClasses} ${className}`}>
			<div className='p-4'>
				<h3 className='text-xl font-semibold'>Passenger List</h3>
				<div className='grid gap-4 mt-4'>
					{users.map((user) => (
						<Card
							title={`${user.name} ${user.lastname}`}
							description={`Starting Point: ${user.startPoint}`}
							additionalInfo='Click to view more details'
							className='max-w-sm'
							request={false}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Card1;
