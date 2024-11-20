function Button2({
	children, //Para pasar la info dentro de las etiquetas
	onClick, //Funcion que se pasa cuando haya un click
	className,
}: {
	children: React.ReactNode; //Tipo de variable
	onClick: () => void; //Definicion de funcion
	className?: string;
}) {
	return (
		<button
			onClick={onClick} //Establece que se hace la funcion
			className=' w-[250px] underline text-black text-xs py-2 px-4 hover:transition duration-300' //Diseño en tailwindcss
		>
			{children} {/*Info que se quiere pasar*/}
		</button>
	);
}

export default Button2;
