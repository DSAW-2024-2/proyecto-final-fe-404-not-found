import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { prefix, searchRoute } from '../../../utils/Routes';

function ViewTermsAndConditions() {
	return (
		<div className='container mx-auto p-6 bg-white shadow-lg rounded-lg'>
			{/* Encabezado */}
			<div className='flex items-center gap-4 mb-6'>
				<Link to={searchRoute('Register')?.path || prefix}>
					<FaArrowLeft className='h-6 w-6 text-gray-600 hover:text-gray-800' />
				</Link>
				<h1 className='text-3xl font-semibold text-gray-800'>
					Términos y Condiciones para UniHop
				</h1>
			</div>

			<div className='border-t border-gray-300 mb-6'></div>

			{/* Fecha de entrada en vigor */}
			<h2 className='text-xl font-semibold text-gray-700'>
				Fecha de entrada en vigor:{' '}
				<span className='font-normal'>23/10/2024</span>
			</h2>

			<p className='mt-4 text-gray-700'>
				¡Bienvenido a UniHop! Al acceder o utilizar nuestra aplicación móvil
				("App"), aceptas cumplir con estos Términos y Condiciones ("Términos").
				Por favor, léelos atentamente. Si no estás de acuerdo con estos
				Términos, no debes utilizar nuestra App.
			</p>

			{/* Sección de Términos */}
			<div className='mt-8'>
				<h3 className='text-2xl font-semibold text-gray-800'>
					1. Introducción
				</h3>
				<p className='text-gray-700'>
					UniHop es un servicio de transporte compartido exclusivamente para
					estudiantes de la Universidad de la Sabana. Nuestra App conecta a los
					estudiantes para viajes hacia y desde la universidad y otros lugares
					cercanos.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					2. Elegibilidad
				</h3>
				<p className='text-gray-700'>
					Para utilizar UniHop, debes: <br />
					• Ser un estudiante registrado de la Universidad de la Sabana. <br />
					• Tener al menos 18 años o contar con el consentimiento de un tutor.{' '}
					<br />• Crear una cuenta y proporcionar información precisa durante el
					registro.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					3. Registro de Cuenta
				</h3>
				<p className='text-gray-700'>
					Al registrarte para una cuenta, aceptas: <br />
					• Proporcionar información precisa y completa. <br />
					• Mantener la confidencialidad de tus credenciales de cuenta. <br />•
					Notificarnos inmediatamente sobre cualquier uso no autorizado de tu
					cuenta. Eres responsable de todas las actividades que ocurran bajo tu
					cuenta.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					4. Conducta del Usuario
				</h3>
				<p className='text-gray-700'>
					Al usar la App de UniHop, aceptas: <br />
					• Tratar a otros usuarios con respeto y cortesía. <br />
					• No participar en acoso, abuso o cualquier comportamiento ilegal.{' '}
					<br />• No utilizar la App para fines fraudulentos o ilegales.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					5. Disponibilidad del Servicio
				</h3>
				<p className='text-gray-700'>
					UniHop no es responsable por interrupciones del servicio debido a:{' '}
					<br />
					• Problemas técnicos. <br />
					• Desastres naturales. <br />• Cualquier otra circunstancia fuera de
					nuestro control.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					6. Tarifas y Pagos
				</h3>
				<p className='text-gray-700'>
					• Las tarifas por los viajes se calculan es fija y fue calculada
					previamente a la creación de la aplicación. <br />
					• Los pagos deben realizarse directamente con el conductor,
					seleccionando un método de pago aceptado. <br />• Todas las tarifas
					son no reembolsables, a menos que se especifique lo contrario.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					7. Responsabilidades del Usuario
				</h3>
				<p className='text-gray-700'>
					Como usuario, eres responsable de: <br />
					• Llegar puntualmente al lugar de recogida designado. <br />
					• Asegurarte de que tus pertenencias personales estén aseguradas
					durante el viaje. <br />• Cumplir con cualquier ley y regulación
					local.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					8. Responsabilidades del Conductor
				</h3>
				<p className='text-gray-700'>
					Como conductor, eres responsable de: <br />
					• Llegar puntualmente al lugar de recogida designado. <br />
					• Asegurarte de cumplir las normas de tránsito vigentes. <br />
					• Llevar todos los documentos pertinentes para conducir tu vehículo.{' '}
					<br />• Cumplir con cualquier ley y regulación local.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					9. Limitación de Responsabilidad
				</h3>
				<p className='text-gray-700'>
					UniHop no se hace responsable de ningún daño indirecto, incidental o
					consecuente que resulte de tu uso de la App o de los servicios
					proporcionados. No garantizamos la disponibilidad, calidad o seguridad
					de los viajes.
				</p>

				<h3 className='text-2xl font-semibold text-gray-800 mt-6'>
					10. Modificaciones a los Términos
				</h3>
				<p className='text-gray-700'>
					UniHop se reserva el derecho de modificar estos Términos en cualquier
					momento. Cualquier cambio será efectivo de inmediato al publicarse en
					la App. Tu uso continuo de la App después de cualquier cambio
					constituye tu aceptación de los nuevos Términos.
				</p>
			</div>
		</div>
	);
}

export default ViewTermsAndConditions;
