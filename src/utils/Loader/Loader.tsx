import React from 'react';

interface LoaderProps {
	size?: 'small' | 'medium' | 'large';
	color?: 'primary' | 'secondary' | 'white';
}

const Loader: React.FC<LoaderProps> = ({
	size = 'medium',
	color = 'primary',
}) => {
	const sizeClasses = {
		small: 'w-6 h-6',
		medium: 'w-10 h-10',
		large: 'w-16 h-16',
	};

	const colorClasses = {
		primary: 'border-green-500 border-t-green-200',
		secondary: 'border-blue-500 border-t-blue-200',
		white: 'border-white border-t-gray-200',
	};

	return (
		<div
			className={`animate-spin rounded-full border-4 ${sizeClasses[size]} ${colorClasses[color]}`}
			role='status'
		>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

export default Loader;
