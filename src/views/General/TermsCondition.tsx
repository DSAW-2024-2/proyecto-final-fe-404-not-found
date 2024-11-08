import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ViewTermsAndConditions() {
	return (
		<div className='container p-4 pl-5 max-w-80'>
			<div className='flex gap-5'>
				<Link to='/user/register'>
					<FaArrowLeft className='h-5 w-5 cursor-pointer text-gray-500 hover:text-black' />
				</Link>
				<h1 className='text-3xl font-bold'>
					Términos y Condiciones para UniHop
				</h1>
			</div>
			<br />
			<h2 className='text-2xl font-semibold'>
				Fecha de entrada en vigor: 23/10/2024
			</h2>
			<p>
				¡Bienvenido a UniHop! Al acceder o utilizar nuestra aplicación móvil
				("App"), aceptas cumplir con estos Términos y Condiciones ("Términos").
				Por favor, léelos atentamente. Si no estás de acuerdo con estos
				Términos, no debes utilizar nuestra App.
			</p>
			<h3 className='text-2xl font-semibold'>1. Introducción</h3>
			<p>
				UniHop es un servicio de transporte compartido exclusivamente para
				estudiantes de la Universidad de la Sabana. Nuestra App conecta a los
				estudiantes para viajes hacia y desde la universidad y otros lugares
				cercanos.
			</p>
			<h3 className='text-2xl font-semibold'>2. Elegibilidad</h3>
			<p>
				Para utilizar UniHop, debes: • Ser un estudiante registrado de la
				Universidad de la Sabana. • Tener al menos 18 años o contar con el
				consentimiento de un tutor. • Crear una cuenta y proporcionar
				información precisa durante el registro.
			</p>
			<h3 className='text-2xl font-semibold'>3. Registro de Cuenta</h3>
			<p>
				Al registrarte para una cuenta, aceptas: • Proporcionar información
				precisa y completa. • Mantener la confidencialidad de tus credenciales
				de cuenta. • Notificarnos inmediatamente sobre cualquier uso no
				autorizado de tu cuenta. Eres responsable de todas las actividades que
				ocurran bajo tu cuenta.
			</p>
			<h3 className='text-2xl font-semibold'>4. Conducta del Usuario</h3>
			<p>
				Al usar la App de UniHop, aceptas: • Tratar a otros usuarios con respeto
				y cortesía. • No participar en acoso, abuso o cualquier comportamiento
				ilegal. • No utilizar la App para fines fraudulentos o ilegales.
			</p>
			<h3 className='text-2xl font-semibold'>5. Disponibilidad del Servicio</h3>
			<p>
				UniHop no es responsable por interrupciones del servicio debido a: •
				Problemas técnicos. • Desastres naturales. • Cualquier otra
				circunstancia fuera de nuestro control.
			</p>
			<h3 className='text-2xl font-semibold'>6. Tarifas y Pagos</h3>
			<p>
				• Las tarifas por los viajes se calculan es fija y fue calculada
				previamente a la creación de la aplicación. • Los pagos deben realizarse
				directamente con el conductor, seleccionando un método de pago aceptado.
				• Todas las tarifas son no reembolsables, a menos que se especifique lo
				contrario.
			</p>
			<h3 className='text-2xl font-semibold'>
				7. Responsabilidades del Usuario
			</h3>
			<p>
				Como usuario, eres responsable de: • Llegar puntualmente al lugar de
				recogida designado. • Asegurarte de que tus pertenencias personales
				estén aseguradas durante el viaje. • Cumplir con cualquier ley y
				regulación local.
			</p>
			<h3 className='text-2xl font-semibold'>
				8. Responsabilidades del Conductor
			</h3>
			<p>
				Como conductor, eres responsable de: • Llegar puntualmente al lugar de
				recogida designado. • Asegurarte de cumplir las normas de tránsito
				vigentes. • Llevar todos los documentos pertinentes para conducir tu
				vehículo. • Cumplir con cualquier ley y regulación local.
			</p>
			<h3 className='text-2xl font-semibold'>
				9. Limitación de Responsabilidad
			</h3>
			<p>
				UniHop no se hace responsable de ningún daño indirecto, incidental o
				consecuente que resulte de tu uso de la App o de los servicios
				proporcionados. No garantizamos la disponibilidad, calidad o seguridad
				de los viajes.
			</p>
			<h3 className='text-2xl font-semibold'>
				10. Modificaciones a los Términos
			</h3>
			<p>
				UniHop se reserva el derecho de modificar estos Términos en cualquier
				momento. Cualquier cambio será efectivo de inmediato al publicarse en la
				App. Tu uso continuo de la App después de cualquier cambio constituye tu
				aceptación de los nuevos Términos.
			</p>
		</div>
	);
}

export default ViewTermsAndConditions;
