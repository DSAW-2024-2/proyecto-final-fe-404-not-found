import React, { useState } from 'react';

interface SingleSelectProps {
	options: string[];
	label: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ options, label }) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	return (
		<div className='relative w-64'>
			<label className='block text-lg  text-white font-normal mb-2'>
				{label}
			</label>
			<div
				className='border border-gray-300 w-[250px] rounded-md p-2 cursor-pointer bg-white'
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOption ? selectedOption : 'Selecciona una opción'}
			</div>

			{isOpen && (
				<div className='absolute mt-1 w-[250px] bg-white border border-gray-300 rounded-md shadow-lg z-10'>
					{options.map((option) => (
						<label
							key={option}
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
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export default SingleSelect;
