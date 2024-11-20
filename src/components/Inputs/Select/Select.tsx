import React, { useState, useEffect, useRef } from 'react';

interface SingleSelectProps {
	options: string[]; // Lista de opciones disponibles
	label: string; // Etiqueta del selector
	handleChange: (selectedOption: string) => void; // Notifica la opción seleccionada al componente padre
}

const SingleSelect: React.FC<SingleSelectProps> = ({
	options,
	label,
	handleChange,
}) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
		handleChange(option); // Notifica la selección al componente padre
	};

	// Cierra el menú al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative w-64' ref={dropdownRef}>
			<label className='block text-lg text-white font-normal mb-2'>
				{label}
			</label>
			<div
				className='border border-gray-300 w-full rounded-md p-2 cursor-pointer bg-white text-gray-700'
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOption ? selectedOption : 'Selecciona una opción'}
			</div>

			{isOpen && (
				<div className='absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10'>
					{options.map((option) => (
						<div
							key={option}
							onClick={() => handleSelectOption(option)}
							className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
						>
							<input
								type='radio'
								name='single-select'
								checked={selectedOption === option}
								onChange={() => handleSelectOption(option)}
								className='mr-2'
							/>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SingleSelect;
