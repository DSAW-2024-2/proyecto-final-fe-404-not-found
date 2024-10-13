import React, { useState } from 'react';
import Modal from './Modals/MainModal'; // Asegúrate de importar el componente Modal

const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div className='p-4'>
			<button
				onClick={openModal}
				className='bg-blue-500 text-white px-4 py-2 rounded-md'
			>
				Abrir Modal
			</button>

			<Modal isOpen={isOpen} onClose={closeModal}>
				<h2 className='text-lg font-semibold'>Título del Modal</h2>
				<p className='mt-2'>Este es el contenido de la ventana emergente.</p>
				<button
					onClick={closeModal}
					className='mt-4 bg-green-500 text-white px-4 py-2 rounded-md'
				>
					Cerrar
				</button>
			</Modal>
		</div>
	);
};

export default App;
