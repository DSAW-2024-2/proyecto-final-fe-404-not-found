import { Dispatch, useEffect, useState } from 'react';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import { Link, useNavigate } from 'react-router-dom';
import { prefix, searchRoute } from '../../../utils/Routes';
import { FaArrowLeft } from 'react-icons/fa';

interface itemForms {
	type: 'text' | 'number' | 'image';
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
	const [soat, setSoat] = useState<string>('');
	const [license, setLicense] = useState<string>('');
	const [vehiclePhoto, setVehiclePhoto] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const createCar = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setErrorMessage(null);

		if (!brand || !model || !plate || !capacity) {
			setErrorMessage('Please fill all the fields');
			setLoading(false);
			return;
		}
		if (capacity === '0' || capacity > '7') {
			setErrorMessage('The capacity must be between 1 and 7');
			setLoading(false);
			return;
		}

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
				navigate(searchRoute('HomeDriver')?.path || prefix); // Programmatic navigation
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
			type: 'image',
			label: 'Foto del vehículo',
			handleInputChange: setVehiclePhoto,
			value: vehiclePhoto,
			required: true,
			placeholder: 'cuadrado',
		},
		{
			type: 'image',
			label: 'Foto de la licencia',
			handleInputChange: setLicense,
			value: license,
			required: true,
			placeholder: 'cuadrado',
		},
		{
			type: 'image',
			label: 'Foto del SOAT',
			handleInputChange: setSoat,
			value: soat,
			required: true,
			placeholder: 'cuadrado',
		},
		{
			type: 'number',
			label: 'Capacidad',
			handleInputChange: setCapacity,
			value: capacity,
			required: true,
			placeholder: ' ',
		},
	];

	return (
		<div className='container p-4 max-w-full bg-white h-lvh'>
			<Link
				to={searchRoute('HomePage')?.path || prefix}
				className='absolute top-5 left-5 text-lg font-bold text-gray-800'
			>
				<FaArrowLeft className='h-7 w-7 cursor-pointer text-gray-500 hover:text-black' />
			</Link>
			<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
				VEHÍCULO
			</h1>
			<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-7'></div>

			<form
				onSubmit={createCar}
				className='max-w-screen-lg w-screen flex justify-center flex-col items-center mx-auto md:w-3/4 md:mx-auto pb-10'
			>
				{/* Contenedor para las columnas */}
				<div className='md:flex md:flex-wrap md:justify-center md:items-center gap-6'>
					{listForms.map((data, index) => (
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
				</div>

				{/* Mensaje de error */}
				{errorMessage && (
					<p className='text-red-500 text-center mt-3'>{errorMessage}</p>
				)}

				{/* Botón de guardar */}
				<div className='text-center mt-5 flex justify-center w-scren'>
					<Button onClick={() => {}} disabled={loading}>
						{loading ? 'Guardando...' : 'Guardar'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default ViewRegisterCar;
