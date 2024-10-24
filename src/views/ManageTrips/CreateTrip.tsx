import React, { useState, useEffect } from 'react';
import whiteLogo from '../../components/pictures/whiteLogo.png';
import Button from '../../components/Buttons/Regular';

function ViewCreateTrip() {
	return (
		<div className='container p-4 max-w-80'>
			<div className='ml-[5px] mt-16 w-[156px] h-[156px] bg-[#0C3B2E] rounded-full flex items-center justify-center border border-gray-300'>
				<img className='w-[89px] h-[94px]' src={whiteLogo} alt='Logo' />
			</div>
			<div className='flex space-x-[16px] mt-[60px] mr-5'>
				<Button onClick={() => alert('hola')}>Iniciar Sesión</Button>
				<Button onClick={() => alert('hola')}>Registrarse</Button>
			</div>
		</div>
	);
}

export default ViewCreateTrip;
