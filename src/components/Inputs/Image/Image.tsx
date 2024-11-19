import React, {
	useState,
	useRef,
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react';
import { FaUpload, FaImage, FaPlus } from 'react-icons/fa';

interface ImageUploadProps {
	handleImageChange: Dispatch<SetStateAction<File | undefined>>;
	className?: string;
	placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	handleImageChange,
	className,
	placeholder = 'circulo',
}) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [styleBox, setStyleBox] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = () => {
					setPreviewUrl(reader.result as string);
				};
				reader.readAsDataURL(file);
				handleImageChange(file);
				setError(null);
			} else {
				setError('Please select an image file.');
				setPreviewUrl(null);
			}
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		if (placeholder === 'cuadrado') {
			setStyleBox(
				'w-24 h-16 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition duration-300 ease-in-out'
			);
		} else {
			setStyleBox(
				'w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition duration-300 ease-in-out'
			);
		}
	}, [placeholder]);

	return (
		<div className={`flex flex-col items-center ${className}`}>
			<div onClick={handleClick} className={styleBox}>
				{previewUrl ? (
					<img
						src={previewUrl}
						alt='Preview'
						className='w-full h-full object-cover rounded-lg'
					/>
				) : placeholder === 'cuadrado' ? (
					<>
						<FaUpload className='text-2xl text-gray-400 mb-2' />
					</>
				) : (
					<>
						<FaPlus className='text-1xl text-gray-400 mb-2' />
					</>
				)}
			</div>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileChange}
				accept='image/*'
				className='hidden'
			/>
			{error && <p className='text-red-500 mt-2'>{error}</p>}
			{previewUrl && (
				<button
					onClick={handleClick}
					className='mt-4 flex items-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out'
				>
					<FaImage className='mr-2' />
					Change Image
				</button>
			)}
		</div>
	);
};

export default ImageUpload;
