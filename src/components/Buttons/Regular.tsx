//Funcion del componente
function Button({
	children, //Para pasar la info dentro de las etiquetas
	onClick, //Funcion que se pasa cuando haya un click
	disabled,
}: {
	children: React.ReactNode; //Tipo de variable
	onClick: () => void; //Definicion de funcion
	disabled?: boolean;
}) {
	return (
		<button
			onClick={onClick} //Establece que se hace la funcion
			className='mt-8 w-[250px] ml-auto bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300' //Diseño en tailwindcss
			disabled={disabled}
		>
			{children} {/*Info que se quiere pasar*/}
		</button>
	);
}

export default Button;
