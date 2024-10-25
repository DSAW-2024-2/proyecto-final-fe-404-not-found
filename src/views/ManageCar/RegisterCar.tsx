import { Dispatch, useState } from 'react';
import InputForm from '../../components/InputForm';
import Button from '../../components/Buttons/Regular';

interface itemForms {
	type: 'text';
	placeholder: string;
	label: string;
	value: string;
	required: boolean;
	handleInputChange: Dispatch<React.SetStateAction<string>>;
}

function ViewRegisterCar() {
	const [brand, setBrand] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [plate, setPlate] = useState<string>('');
	const [capacity, setCapacity] = useState<string>('');

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
		<div className='container p-4 max-w-80'>
			<h1 className='text-[22px] leading-[28px] font-normal text-center pt-5'>
				VEHÍCULO
			</h1>
			<div className='border-t border-black border-[1.5px] w-2/3 mx-auto mt-2 mb-7'></div>
			<div className='flex flex-col items-center'>
				<div className='w-10 h-10 bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
					<span className='text-2xl text-white'>+</span>
				</div>
				<p className='text-sm text-gray-500  mb-3'>Añadir imagen</p>
			</div>
			<form>
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
			</form>
			<div className='ml-7'>SOAT+</div>
			<div className='ml-7'>Licencia de conducción+</div>
			<div className='pl-5'>
				<Button onClick={() => alert('hola')}>Guardar</Button>
			</div>
		</div>
	);
}

export default ViewRegisterCar;
