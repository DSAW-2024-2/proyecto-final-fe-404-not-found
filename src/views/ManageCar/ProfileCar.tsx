import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';

const CarProfile: React.FC = () => {
	const [carData, setCarData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const loadCarData = async () => {
			const data = await fetchProfileData('car', setErrorMessage);
			if (data) setCarData(data);
		};
		loadCarData();
	}, []);

	return (
		<div>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div>
					<h1>Car Profile</h1>
					{carData ? (
						<>
							<p>Brand: {carData.brand}</p>
							<p>Model: {carData.model}</p>
							<p>License Plate: {carData.licensePlate}</p>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			)}
		</div>
	);
};

export default CarProfile;
