import React, { useState } from 'react';

interface MultiSelectProps {
	options: string[]; // Define the type for options
	label: string; // Define the type for the label
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, label }) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleOption = (option: string) => {
		if (selectedOptions.includes(option)) {
			setSelectedOptions(selectedOptions.filter((item) => item !== option));
		} else {
			setSelectedOptions([...selectedOptions, option]);
		}
	};

	return (
		<div className='relative w-64'>
			<label className='block text-white text-lg font-normal mb-2'>
				{label}
			</label>
			<div
				className='border w-[250px] border-gray-300 rounded-md p-2 cursor-pointer bg-white'
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOptions.length > 0
					? selectedOptions.join(', ')
					: 'Select options'}
			</div>

			{isOpen && (
				<div className='absolute w-[250px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
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
