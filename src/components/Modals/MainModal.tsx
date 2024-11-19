import { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({
	isOpen,
	onClose,
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<div className='bg-white border rounded-lg p-6 max-w-sm w-full'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-600'
				>
					<FaTimes size={30} />
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
