import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';

const carInfo: React.FC = () => {
	const [vehicleData, setVehicleData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const loadVehicleData = async () => {
			const data = await fetchProfileData('vehicle', setErrorMessage);
			if (data) setVehicleData(data);
		};
		loadVehicleData();
	}, []);

	return (
		<div>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div>
					<h1>Vehicle Profile</h1>
					{vehicleData && (
						<>
							<p>Brand: {vehicleData.brand}</p>
							<p>Model: {vehicleData.model}</p>
							<p>License Plate: {vehicleData.licensePlate}</p>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default carInfo;
