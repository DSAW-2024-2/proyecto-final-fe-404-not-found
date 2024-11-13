// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { routesList } from './utils/Routes';

// Importación de vistas
import ProtectedRoutes from './utils/ProtectedRoutes';
import RoutesBefore from './utils/RoutesBefore';

function App() {
	useEffect(() => {
		// Establece la URL de la API en el localStorage solo una vez al cargar
		localStorage.setItem('API', 'http://149.130.182.245:3001/api-wheels/v1');
	}, []); // Dependencia vacía para que se ejecute solo una vez

	return (
		<Router>
			{/* Contenedor principal con padding y fondo general */}
			<div className=''>
				<Routes>
					{routesList.map((route, index) => {
						return route.filter === 'General' ? (
							<Route
								key={index}
								path={route.path}
								element={<route.component />}
							/>
						) : null;
					})}

					{/* Rutas antes de autenticarse (login, registro, etc.) */}
					<Route element={<RoutesBefore />}>
						{routesList.map((route, index) => {
							return route.filter === 'notAuthenticated' ? (
								<Route
									key={index}
									path={route.path}
									element={<route.component />}
								/>
							) : null;
						})}
					</Route>
					{/* Rutas protegidas */}
					<Route element={<ProtectedRoutes />}>
						{routesList.map((route, index) => {
							return route.filter === 'authenticated' ? (
								<Route
									key={index}
									path={route.path}
									element={<route.component />}
								/>
							) : null;
						})}
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
