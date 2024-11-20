import { Dispatch, useEffect, useState } from 'react';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Buttons/Regular';
import whiteLogo from '../../../components/pictures/whiteLogo.png';
import SingleSelect from '../../../components/Inputs/Select';
import MultiSelect from '../../../components/Inputs/MultipleSelect';
import { Link, useNavigate } from 'react-router-dom';
import { PiHouseLine } from 'react-icons/pi';
import { prefix, searchRoute } from '../../../utils/Routes';

interface itemForms {
	type: 'text' | 'date' | 'time' | 'number';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
	style_label?: string;
}

interface StationsTransmilenio {
	attributes: {
		numero_estacion: string;
		nombre_estacion: string;
		coordenada_x_estacion: number;
		coordenada_y_estacion: number;
		ubicacion_estacion: string;
		troncal_estacion: string;
		id_trazado_troncal: string;
	};
	geometry: {
		x: number;
		y: number;
	};
}

function ViewCreateTrip() {
	const [startPoint, setStartPoint] = useState<string>('');
	const [endPoint, setEndPoint] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [time, setTime] = useState<string>('');
	const [fare, setFare] = useState<string>('');
	const [route, setRoute] = useState<string>('');
	const [seatCount, setSeatCount] = useState<string>('');
	const [paymentMethods, setPaymentMethods] = useState<Array<string>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [locationStart, setLocationStart] = useState<
		Array<{ name: string; location: string }>
	>([]);
	const [locationEnd, setLocationEnd] = useState<
		Array<{ name: string; location: string }>
	>([]);
	const [showStartPointSuggestions, setShowStartPointSuggestions] =
		useState<boolean>(false);
	const [showEndPointSuggestions, setShowEndPointSuggestions] =
		useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const navigate = useNavigate();

	//peticion a la api para obtener
	const fetchLocations = async (search: string) => {
		if (!search) return [];

		const url = `https://gis.transmilenio.gov.co/arcgis/rest/services/Troncal/consulta_estaciones_troncales/FeatureServer/0/query?where=1%3D1&outFields=numero_estacion,nombre_estacion,coordenada_x_estacion,coordenada_y_estacion,ubicacion_estacion,troncal_estacion,id_trazado_troncal&outSR=4326&f=json`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			// Filtrar y limitar los resultados
			const filteredResults = data.features
				.map((item: StationsTransmilenio) => ({
					name: item.attributes.nombre_estacion,
					location: item.attributes.ubicacion_estacion,
				}))
				.filter((station: { name: string }) =>
					station.name.toLowerCase().includes(search.toLowerCase())
				)
				.slice(0, 5); // Tomar los primeros 5 resultados

			return filteredResults;
		} catch (error) {
			console.error('Error fetching information:', error);
			return [];
		}
	};

	const handlePayment = (selected: string[]) => {
		setPaymentMethods(selected.map((method) => method));
	};

	const handleMainRoute = (ruta: string) => {
		setRoute(ruta);
	};

	const createTrip = async (event: React.FormEvent) => {
		event.preventDefault();
		if (
			!startPoint ||
			!endPoint ||
			!date ||
			!time ||
			!route ||
			!fare ||
			!seatCount ||
			!paymentMethods
		) {
			setErrorMessage('Please fill in all fields');
			return;
		}
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
				paymentMethods,
				seatCount,
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
				localStorage.setItem('tripId', data._id);
				navigate(searchRoute('HomeDriver')?.path || prefix);
			} else {
				setErrorMessage(
					'Error al crear el viaje. Inténtalo nuevamente.' + data.error
				);
			}
		} catch (error) {
			console.error(error);
			setErrorMessage('Hubo un problema al conectar con el servidor.');
		} finally {
			setLoading(false);
		}
	};

	const dateForms: itemForms[] = [
		{
			type: 'date',
			placeholder: 'Select a date',
			label: 'Fecha',
			value: date,
			required: true,
			handleInputChange: setDate,
		},
		{
			type: 'time',
			placeholder: 'Select a time',
			label: 'Hora',
			value: time,
			required: true,
			handleInputChange: setTime,
		},
	];

	const listForms: itemForms[] = [
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
		{
			type: 'text',
			placeholder: 'Ingresa la tarifa',
			label: 'Tarifa',
			value: fare,
			required: true,
			handleInputChange: setFare,
		},
		{
			type: 'number',
			placeholder: 'Selecciona la cantidad de asientos',
			label: 'Asientos disponibles',
			value: seatCount,
			required: true,
			handleInputChange: setSeatCount,
		},
	];

	useEffect(() => {
		fetchLocations(startPoint).then((data) => {
			setLocationStart(data);
		});
	}, [startPoint]);

	useEffect(() => {
		fetchLocations(endPoint).then((data) => {
			setLocationEnd(data);
		});
	}, [endPoint]);

	const handleSelectLocation = (
		location: { name: string },
		setPoint: (value: string) => void,
		setShowSuggestions: (value: boolean) => void
	) => {
		setPoint(location.name); // Actualiza el valor del input
		setShowSuggestions(false); // Oculta las sugerencias
	};

	const optionsPayment = [
		'Efectivo',
		'Nequi',
		'DaviPlata',
		'Transferencia a cuentas bancarias',
	];

	const optionsRoute = [
		'NQS',
		'Cr 7-10',
		'Calle 80',
		'Caracas',
		'Suba',
		'Calle 26',
		'Americas',
		'Soacha',
		'Autonorte',
		'Eje Ambiental',
		'Tunal',
		'Calle 6',
	];

	return (
		<main className='flex justify-center'>
			<section className='container p-4 max-w-80 border-spacing-3 border-slate-400 md:shadow-2xl  md:max-w-max md:w-screen'>
				<header className='flex mt-3 gap-x-9 justify-center '>
					<div className='ml-[5px] w-[45px] h-[45px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
						<img className='w-[25px] h-[25px]' src={whiteLogo} alt='Logo' />
					</div>
					<h1 className='text-xl md:text-3xl text-center font-bold mb-4'>
						NUEVO VIAJE
					</h1>
					<Link to={searchRoute('HomeDriver')?.path || prefix}>
						<div className='w-[45px] h-[45px] bg-black rounded-full flex items-center justify-center border border-gray-300'>
							<PiHouseLine className='text-white w-[20px] h-[20px]' />
						</div>
					</Link>
				</header>
				<main className='md:grid md:grid-cols-2 md:gap-1'>
					<div className='w-full mt-4'>
						<form
							onSubmit={createTrip}
							className='flex justify-center gap-4 items-center flex-row md:flex-col md:gap-2 md:items-center'
						>
							{dateForms.map((data, index) => (
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
						</form>
					</div>

					<div className='container w-full bg-[#6D9773] pt-4 pb-5 mt-2 rounded-md'>
						<form onSubmit={createTrip}>
							<div className='w-full p-6 pt-3 rounded-lg shadow-sm '>
								{/* Título */}
								<h2 className='text-white sm:text-md font-bold md:text-xl  text-center mb-4 mr-2'>
									¿A dónde quieres ir hoy?
								</h2>

								{/* Formulario */}
								<div className='flex flex-col items-center md:grid lg:grid-cols-2 md:gap-6'>
									{listForms.map((data, index) => (
										<div key={index} className='relative'>
											<InputForm
												type={data.type}
												label={data.label}
												handleInputChange={data.handleInputChange}
												placeholder={data.placeholder}
												value={data.value}
												required={data.required}
											/>

											{/* Menú desplegable de sugerencias */}
											{data.label === 'Punto de partida' &&
												showStartPointSuggestions && (
													<DropdownMenu
														suggestions={locationStart}
														handleSelect={(location) =>
															handleSelectLocation(
																location,
																setStartPoint,
																setShowStartPointSuggestions
															)
														}
													/>
												)}

											{data.label === 'Punto de llegada' &&
												showEndPointSuggestions && (
													<DropdownMenu
														suggestions={locationEnd}
														handleSelect={(location) =>
															handleSelectLocation(
																location,
																setEndPoint,
																setShowEndPointSuggestions
															)
														}
													/>
												)}
										</div>
									))}
								</div>

								{/* Opciones Adicionales */}
								<div className='grid grid-cols-1 center lg:grid-cols-2 gap-8 mt-6 md:pl-6'>
									<SingleSelect
										handleChange={handleMainRoute}
										options={optionsRoute}
										label='Selecciona una ruta principal'
									/>
									<MultiSelect
										handleChange={handlePayment}
										options={optionsPayment}
										label='Métodos de pago que recibes'
									/>
								</div>
							</div>

							{errorMessage && (
								<p className='text-red-500 text-center'>{errorMessage}</p>
							)}
							<div className=' mt-5 flex justify-center'>
								<Button onClick={() => {}} disabled={loading}>
									{loading ? 'Guardando...' : 'Crear viaje'}
								</Button>
							</div>
						</form>
					</div>
				</main>
			</section>
		</main>
	);
}

interface DropdownMenuProps {
	suggestions: { name: string }[]; // Array de sugerencias
	handleSelect: (location: { name: string }) => void; // Función para manejar la selección
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
	suggestions,
	handleSelect,
}) => {
	return (
		<ul
			className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto'
			onWheel={(e) => e.stopPropagation()} // Detiene el scroll de la página al interactuar con el menú
		>
			{suggestions.map((suggestion, index) => (
				<li
					key={index}
					onClick={() => handleSelect(suggestion)}
					className='px-4 py-2 cursor-pointer hover:bg-green-100 text-gray-800'
				>
					{suggestion.name}
				</li>
			))}
		</ul>
	);
};

export default ViewCreateTrip;
