import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface UserData {
	firstName: string;
	lastName: string;
	phone: string;
	password?: string;
}

interface EditProfileModalProps {
	userData: UserData;
	onSave: (changedData: Partial<UserData & { password: string }>) => void;
}

const MySwal = withReactContent(Swal);

const EditProfileModal: React.FC<EditProfileModalProps> = ({
	userData,
	onSave,
}) => {
	const [formData, setFormData] = useState({
		firstName: userData.firstName,
		lastName: userData.lastName,
		phone: userData.phone,
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const showModal = () => {
		MySwal.fire({
			title: 'Edit Profile',
			html: (
				<div className='space-y-4'>
					<Input
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						placeholder='First Name'
					/>
					<Input
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						placeholder='Last Name'
					/>
					<Input
						name='phone'
						value={formData.phone}
						onChange={handleChange}
						placeholder='Phone'
					/>
					<Input
						name='password'
						type='password'
						value={formData.password}
						onChange={handleChange}
						placeholder='New Password'
					/>
				</div>
			),
			showCancelButton: true,
			confirmButtonText: 'Save',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#6D9773',
			cancelButtonColor: '#374151',
			preConfirm: () => {
				const changedData: Partial<typeof formData> = {};
				(Object.keys(formData) as Array<keyof typeof formData>).forEach(
					(key) => {
						if (
							formData[key] !== userData[key as keyof UserData] &&
							formData[key] !== ''
						) {
							changedData[key] = formData[key];
						}
					}
				);
				return changedData;
			},
		}).then((result) => {
			if (result.isConfirmed && Object.keys(result.value).length > 0) {
				onSave(result.value);
			}
		});
	};

	return (
		<button
			onClick={showModal}
			className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300'
		>
			Edit Profile
		</button>
	);
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => (
	<input
		{...props}
		className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
	/>
);

export default EditProfileModal;
