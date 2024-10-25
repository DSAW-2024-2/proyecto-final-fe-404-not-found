import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/Regular';
import whiteLogo from '../../components/pictures/whiteLogo.png';

function ViewInitialPage() {
	return (
		<div className='container p-4 max-w-80'>
			<div className='absolute inset-0'>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full top-0 left-1/3 opacity-40'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full top-20 right-0 opacity-40'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-0 left-0 opacity-40'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-0 left-2/4 opacity-40'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-0 left-3/4 opacity-40'></div>
				<div className='absolute w-[320px] h-[338px] border border-1 border-[#6D9773] rounded-full bottom-0 left-2/3 opacity-40'></div>
			</div>
			<div className='ml-[76px] mt-16 w-[156px] h-[156px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
				<img className='w-[89px] h-[94px]' src={whiteLogo} alt='Logo' />
			</div>
			<div className='flex space-x-[16px] mt-[60px] mr-5'>
				<Button onClick={() => alert('hola')}>Iniciar Sesión</Button>
				<Button onClick={() => alert('hola')}>Registrarse</Button>
			</div>
		</div>
	);
}

export default ViewInitialPage;
