import { Dispatch, useEffect, useState } from 'react';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import { Navigate, useNavigate } from 'react-router-dom';
import { prefix, searchRoute } from '../../../utils/Routes';

interface itemForms {
	type: 'text';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function ViewRegisterCar() {
	const navigate = useNavigate();

	const [car, setCar] = useState<boolean>(false);
	const [brand, setBrand] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [plate, setPlate] = useState<string>('');
	const [capacity, setCapacity] = useState<string>('');
	const [soat, setSoat] = useState<string>(
		'https://example.com/soat-photo.jpg'
	);
	const [license, setLicense] = useState<string>(
		'https://example.com/license-photo.jpg'
	);
	const [vehiclePhoto, setVehiclePhoto] = useState<string>(
		'https://example.com/vehicle-photo.jpg'
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const createCar = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setErrorMessage(null);

		const url = localStorage.getItem('API') + '/car';
		const token = localStorage.getItem('token');

		const bodyRequest = {
			brand,
			model,
			licensePlate: plate,
			capacity,
			licensePhoto: license,
			vehiclePhoto,
			soatPhoto: soat,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(bodyRequest),
			});
			const data = await response.json();

			if (data._id) {
				console.log(data);
				setCar(true);
				localStorage.setItem('car', 'true');
				alert('Car created successfully');
			} else {
				setErrorMessage(
					'Error al crear el vehículo. Inténtalo nuevamente.\n' + data.message
				);
			}
		} catch (error) {
			console.error(error);
			setErrorMessage('Hubo un problema al conectar con el servidor.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (car) {
			navigate(searchRoute('HomeDriver')?.path || prefix); // Programmatic navigation
		}
	}, [car, navigate]);

	const listForms: itemForms[] = [
		{
			type: 'text',
			label: 'Marca',
			handleInputChange: setBrand,
			value: brand,
			required: true,
			placeholder: ' ',
		},
		{
			type: 'text',
			label: 'Modelo',
			handleInputChange: setModel,
			value: model,
			required: true,
			placeholder: ' ',
		},
		{
			type: 'text',
			label: 'Placa',
			handleInputChange: setPlate,
			value: plate,
			required: true,
			placeholder: ' ',
		},
		{
			type: 'text',
			label: 'Capacidad',
			handleInputChange: setCapacity,
			value: capacity,
			required: true,
			placeholder: ' ',
		},
	];

	return (
		<div className='container p-4 max-w-80 bg-white'>
			<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
				VEHÍCULO
			</h1>
			<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-7'></div>
			<div className='flex flex-col items-center'>
				<div className='w-10 h-10 bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
					<span className='text-2xl mb-[5px] text-white'>+</span>
				</div>
				<p className='text-sm text-gray-500 mb-3'>Añadir imagen</p>
			</div>
			<form onSubmit={createCar}>
				{listForms.map((data: itemForms, index) => (
					<InputForm
						key={index}
						type={data.type}
						label={data.label}
						handleInputChange={data.handleInputChange}
						placeholder={data.placeholder}
						value={data.value}
						required={data.required}
					/>
				))}
				<div className='ml-7'>SOAT+</div>
				<div className='ml-7'>Licencia de conducción+</div>

				{errorMessage && (
					<p className='text-red-500 text-center'>{errorMessage}</p>
				)}
				<div className='ml-5'>
					<Button onClick={() => {}} disabled={loading}>
						{loading ? 'Guardando...' : 'Guardar'}
					</Button>{' '}
				</div>
			</form>
		</div>
	);
}

export default ViewRegisterCar;
