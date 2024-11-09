// UserProfile.tsx

import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';

const userData: React.FC = () => {
	const [userData, setUserData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const loadUserData = async () => {
			const data = await fetchProfileData('user', setErrorMessage);
			if (data) setUserData(data);
		};
		loadUserData();
	}, []);

	return (
		<div>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div>
					<h1>User Profile</h1>
					{userData && (
						<>
							<p>Name: {userData.name}</p>
							<p>Email: {userData.email}</p>
							<p>Phone: {userData.phone}</p>
							{/* Render more fields as needed */}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default userData;
