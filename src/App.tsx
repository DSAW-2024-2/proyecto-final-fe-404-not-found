// import './App.css'
import { useState } from 'react';
//import Prueba from './components/prueba';
import Button from './components/Buttons/Regular';
import Accept from './components/Buttons/Accept';
import Delete from './components/Buttons/Delete';

function App() {
	return (
		<div className='p-4 max-w-80'>
			<Button onClick={() => alert('hola')}>Registrarse</Button>
			<Accept
				acceptFun={() => console.log('aceptado')}
				denyFun={() => console.log('deny')}
			/>
			<Delete />
		</div>
	);
}

export default App;
