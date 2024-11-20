// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { routesList } from './utils/Routes';

// Importación de vistas
import ProtectedRoutes from './utils/Protection/ProtectedRoutes';
import RoutesBefore from './utils/Protection/RoutesBefore';
import ProtectedCar from './utils/Protection/ProtectedCars';
import ProtectedTrips from './utils/Protection/ProtectedTrips';

function App() {
	useEffect(() => {
		// Establece la URL de la API en el localStorage solo una vez al cargar
		localStorage.setItem(
			'API',
			'https://proyecto-final-be-404-not-found.vercel.app/api-wheels/v1'
		);
		localStorage.setItem(
			'FotoDefaultUser',
			'https://firebasestorage.googleapis.com/v0/b/wheels-b53db.firebasestorage.app/o/FotoDefaultPerfil.jpeg?alt=media&token=b7b2b015-ab6d-4fe2-bbf4-f1ffcd6c57b8'
		);
		localStorage.setItem(
			'FotoDefaultCar',
			'https://firebasestorage.googleapis.com/v0/b/wheels-b53db.firebasestorage.app/o/FotoDefaultCarro.jpeg?alt=media&token=659acc01-7680-4958-8e66-33149ab76cd2'
		);
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
					{/* Rutas protegidas */}
					<Route element={<ProtectedCar />}>
						{routesList.map((route, index) => {
							return route.filter === 'carRequire' ? (
								<Route
									key={index}
									path={route.path}
									element={<route.component />}
								/>
							) : null;
						})}
					</Route>
					<Route element={<ProtectedTrips />}>
						{routesList.map((route, index) => {
							return route.filter === 'NoTrip' ? (
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
