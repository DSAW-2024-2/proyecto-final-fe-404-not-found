//Funcion del componente
function Button({
	children,
	onClick,
	disabled,
}: {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className='flex items-center justify-center h-12 w-[250px] bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50'
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
