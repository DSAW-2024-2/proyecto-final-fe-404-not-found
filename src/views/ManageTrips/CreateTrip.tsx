import { Dispatch, useState } from 'react';
import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';
import whiteLogo from '../../components/pictures/whiteLogo.png';
import SingleSelect from '../../components/Inputs/Select';
import MultiSelect from '../../components/Inputs/MultipleSelect';

interface itemForms {
	type: 'text' | 'date' | 'time';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
	style_label?: string;
}

function ViewCreateTrip() {
	const [startPoint, setStartPoint] = useState<string>('');
	const [endPoint, setEndPoint] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [time, setTime] = useState<string>('');
	const [route, setRoute] = useState<string>('');
	const [fare, setFare] = useState<string>('');
	const [seatCount, setSeatCount] = useState<string>('');
	const [paymentMethods, setPaymentMethods] = useState<Array<string>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const listForms: itemForms[] = [
		{
			type: 'date',
			placeholder: 'Select a date',
			label: 'Fecha',
			value: date,
			required: true,
			handleInputChange: setDate,
			style_label: 'text-white-300',
		},
		{
			type: 'time',
			placeholder: 'Select a time',
			label: 'Hora',
			value: time,
			required: true,
			handleInputChange: setTime,
		},
		{
			type: 'text',
			label: 'Punto de partida',
			handleInputChange: setStartPoint,
			value: startPoint,
			required: true,
			placeholder: ' ',
		},
		{
			type: 'text',
			label: 'Punto de llegada',
			handleInputChange: setEndPoint,
			value: endPoint,
			required: true,
			placeholder: ' ',
		},
	];

	const optionsPayment = [
		'Efectivo',
		'Nequi',
		'DaviPlata',
		'Transferencia a cuentas bancarias',
	];

	const createTrip = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setErrorMessage(null);

		try {
			const url = localStorage.getItem('API') + '/trip';
			const token = localStorage.getItem('token');
			const bodyRequest = {
				startPoint,
				endPoint,
				date,
				time,
				route,
				fare,
				seatCount,
				paymentMethods,
			};

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(bodyRequest),
			});
			const data = await response.json();

			if (response.ok) {
				console.log(data);
			} else {
				setErrorMessage('Error al crear el viaje. Inténtalo nuevamente.');
			}
		} catch (error) {
			console.error(error);
			setErrorMessage('Hubo un problema al conectar con el servidor.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container p-4 max-w-80'>
			<div className='flex mt-3 gap-x-10'>
				<div className='ml-[5px] w-[35px] h-[35px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
					<img className='w-[20px] h-[20px]' src={whiteLogo} alt='Logo' />
				</div>
				<h1 className='text-xl text-center font-bold mb-4'>NUEVO VIAJE</h1>
			</div>
			<h2 className='mt-2 text-xs font-bold text-center'>Fecha y hora</h2>
			<div className='container w-[100%] bg-[#6D9773] pt-4 pb-5 mt-7 rounded-md'>
				<h2 className=' text-white text-xs text-center mb-3 font-medium'>
					¿A dónde quieres ir hoy?
				</h2>
				<form onSubmit={createTrip}>
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

					<div className='ml-5'>
						<SingleSelect
							options={['Ruta 1', 'Ruta 2', 'Ruta 3']}
							label='Selecciona una ruta'
						/>
					</div>
					<div className='ml-5 mt-5'>
						<MultiSelect
							options={optionsPayment}
							label='Métodos de pago que recibes'
						/>
					</div>

					{errorMessage && (
						<p className='text-red-500 text-center'>{errorMessage}</p>
					)}
					<div className='ml-5'>
						<Button onClick={() => {}} disabled={loading}>
							{loading ? 'Guardando...' : 'Crear viaje'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ViewCreateTrip;
