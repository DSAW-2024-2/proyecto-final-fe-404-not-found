import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

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
		<div className='container p-4 max-w-80'>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div>
					<div className='flex gap-x-[65px]'>
						<Link to='/home'>
							<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
						</Link>{' '}
						<div className='w-[120px] h-[120px] mt-5 border rounded-full border-black'>
							<img src='' alt='' />
						</div>
					</div>
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
