import React from 'react';
import Loader from './Loader';

const LoadingState: React.FC = () => {
	return (
		<div className='flex items-center justify-center h-full'>
			<Loader size='large' color='primary' />
		</div>
	);
};

export default LoadingState;
