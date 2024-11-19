import { Dispatch, useState } from 'react';

function Input({
	handleInputChange,
	placeholder = '',
	required,
	className,
}: {
	handleInputChange: Dispatch<React.SetStateAction<string>>;
	placeholder: string;
	required?: boolean;
	className?: string;
}) {
	//-----FECHA------
	const [valueDate, setvalueDate] = useState<Date>();
	const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.valueAsDate) {
			setvalueDate(e.target.valueAsDate);
			const selectedDate = new Date(e.target.valueAsDate.toISOString());
			handleInputChange(selectedDate.toLocaleDateString());
		}
	};

	return (
		<>
			<input
				type='date'
				value={valueDate ? valueDate.toISOString().substring(0, 10) : ''}
				required={required}
				onChange={changeDate}
				placeholder={placeholder}
				maxLength={20}
				className={
					' sm:w-full py-2 px-2 bg-black text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D9773] ' +
					className
				}
			/>
		</>
	);
}

export default Input;
