import { Dispatch, useState } from 'react';
import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';
import whiteLogo from '../../components/pictures/whiteLogo.png';
import SingleSelect from '../../components/Inputs/Select';
import MultiSelect from '../../components/Inputs/MultipleSelect';

interface itemForms {
	type: 'text';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function ViewCreateTrip() {
	const [startPoint, setStartPoint] = useState<string>('');
	const [endPoint, setEndPoint] = useState<string>('');

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
	];
	const optionsPayment = [
		'Efectivo',
		'Nequi',
		'DaviPlata',
		'Transferencia a cuentas bancarias',
	];

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
				<form className=''>
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
					<Button onClick={() => alert('hola')}>Crear viaje</Button>
				</form>
			</div>
		</div>
	);
}

export default ViewCreateTrip;
