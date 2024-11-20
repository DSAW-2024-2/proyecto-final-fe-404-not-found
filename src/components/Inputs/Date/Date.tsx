import { Dispatch, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de la librería

interface InputProps {
	handleInputChange: Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
	required?: boolean;
	className?: string;
}

const Input: React.FC<InputProps> = ({
	handleInputChange,
	placeholder = '',
	required = false,
	className = '',
}) => {
	const [valueDate, setValueDate] = useState<Date | null>(null);
	const [isDesktop, setIsDesktop] = useState<boolean>(false);

	const changeDate = (date: Date | null) => {
		if (date) {
			setValueDate(date);
			handleInputChange(date.toLocaleDateString());
		}
	};

	useEffect(() => {
		if (window.innerWidth > 768) {
			setIsDesktop(true);
		} else {
			setIsDesktop(false);
		}
	}, []);

	return (
		<div className={`relative w-full ${className}`}>
			{isDesktop ? (
				<DatePicker
					selected={valueDate}
					onChange={changeDate}
					required={required}
					placeholderText={placeholder}
					className='w-full py-3 px-1 bg-green-50 text-green-700 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg'
					calendarClassName='custom-calendar bg-white text-green-700 rounded-lg shadow-lg p-3'
					dropdownMode='select'
					inline
				/>
			) : (
				<input
					type='date'
					value={valueDate ? valueDate.toISOString().substring(0, 10) : ''}
					onChange={(e) => changeDate(new Date(e.target.value))}
					required={required}
					placeholder={placeholder}
					className='w-full py-3 px-4 bg-slate-50 text-black border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg'
				/>
			)}
		</div>
	);
};

/*<input
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
			/>*/

export default Input;
