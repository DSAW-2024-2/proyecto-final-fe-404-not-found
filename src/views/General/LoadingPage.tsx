import whiteLogo from '../../components/pictures/whiteLogo.png';

function ViewLoadingPage() {
	return (
		<div className='container p-4 max-w-80 h-[480px] bg-[#6D9773]'>
			<img
				className='ml-[105px] mt-[185px] flex items-center justify-center w-[89px] h-[94px]'
				src={whiteLogo}
				alt='Logo'
			/>
		</div>
	);
}

export default ViewLoadingPage;
