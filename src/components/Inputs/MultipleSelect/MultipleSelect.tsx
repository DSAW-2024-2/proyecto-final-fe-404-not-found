import React, { useState, useEffect, useRef } from 'react';

interface MultiSelectProps {
	options: string[]; // Lista de opciones
	label: string; // Etiqueta para el MultiSelect
	handleChange: (selectedOptions: string[]) => void; // Notifica al padre las opciones seleccionadas
}

const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	label,
	handleChange,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Manejo de selección/deselección de opciones
	const handleToggleOption = (option: string) => {
		const updatedSelections = selectedOptions.includes(option)
			? selectedOptions.filter((item) => item !== option)
			: [...selectedOptions, option];

		setSelectedOptions(updatedSelections);
		handleChange(updatedSelections); // Notifica al padre
	};

	// Cerrar el menú al hacer clic fuera del componente
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
			<label className='block text-white text-lg font-normal mb-2'>
				{label}
			</label>
			<div
				className='border w-full border-gray-300 rounded-md p-2 cursor-pointer bg-white text-gray-700'
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOptions.length > 0
					? selectedOptions.join(', ')
					: 'Seleccionar opciones'}
			</div>

			{isOpen && (
				<div className='absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto'>
					{options.map((option) => (
						<label
							key={option}
							className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
						>
							<input
								type='checkbox'
								checked={selectedOptions.includes(option)}
								onChange={() => handleToggleOption(option)}
								className='mr-2'
							/>
							{option}
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export default MultiSelect;
