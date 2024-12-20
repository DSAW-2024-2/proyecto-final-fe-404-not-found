import React from 'react';

interface CheckboxProps {
	label?: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	id: string;
	className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
	label,
	checked,
	onChange,
	id,
	className,
}) => {
	return (
		<div className={`flex items-center ${className}`}>
			<input
				id={id}
				type='checkbox'
				checked={checked}
				onChange={onChange}
				className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
			/>
			{label && (
				<label htmlFor={id} className='ml-2 block text-sm text-gray-900'>
					{label}
				</label>
			)}
		</div>
	);
};

export default Checkbox;
