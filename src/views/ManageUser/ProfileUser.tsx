import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../../utils/fetchProfileData';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Button2 from '../../components/Buttons/TextButton';

const UserProfile: React.FC = () => {
	const [userData, setUserData] = useState<any | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const data = await fetchProfileData('user', setErrorMessage);
				if (data) {
					setUserData(data);
				}
			} catch (error) {
				setErrorMessage(`Failed to load data: ${error}`);
			} finally {
				setLoading(false);
			}
		};
		loadUserData();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');

		navigate('/');
	};

	return (
		<div className='container p-4 max-w-80 '>
			{errorMessage ? (
				<p className='text-red-500'>{errorMessage}</p>
			) : (
				<div className=''>
					<div className='flex gap-x-[65px]'>
						<Link to='/home'>
							<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
						</Link>{' '}
						<div className='w-[120px] h-[120px] mt-5 border rounded-full border-black'>
							<img src='' alt='' />
						</div>
					</div>

					<h1 className='text-center'>Perfil</h1>
					<br />
					{userData ? (
						<div className='ml-5'>
							<p>Name </p>
							<br />
							<p>{userData.name}</p>
							<p>Last Name </p>
							<br />
							<p>{userData.lastName}</p>
							<p>Email</p>
							<br />
							<p>{userData.email}</p>
							<p>Phone</p>
							<br />
							<p>{userData.phone}</p>
						</div>
					) : (
						<p>Loading...</p>
					)}
					<div className='ml-5'>
						<Button2 onClick={handleLogout}>Cerrar Sesión</Button2>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
