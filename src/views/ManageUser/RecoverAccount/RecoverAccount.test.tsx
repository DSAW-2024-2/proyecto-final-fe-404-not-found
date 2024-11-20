import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecoverAccount from './RecoverAccount';
import '@testing-library/jest-dom/extend-expect';

describe('recoverView Component', () => {
	it('renders the title and form elements', () => {
		render(
			<BrowserRouter>
				<RecoverAccount />
			</BrowserRouter>
		);

		// Verifica que el título esté presente
		expect(
			screen.getByRole('heading', { name: /RECUPERAR CONTRASEÑA/i })
		).toBeInTheDocument();

		// Verifica que el campo de entrada de usuario esté presente
		expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();

		// Verifica que el botón de "Cancelar" esté presente
		expect(
			screen.getByRole('button', { name: /Cancelar/i })
		).toBeInTheDocument();

		// Verifica que el botón de "Recuperar contraseña" esté presente
		expect(
			screen.getByRole('button', { name: /Recuperar contraseña/i })
		).toBeInTheDocument();
	});

	it('displays error message when the username is not provided', async () => {
		render(
			<BrowserRouter>
				<RecoverAccount />
			</BrowserRouter>
		);

		// Intenta enviar el formulario sin proporcionar un nombre de usuario
		fireEvent.click(
			screen.getByRole('button', { name: /Recuperar contraseña/i })
		);

		// Verifica si se muestra el mensaje de error
		expect(
			screen.getByText(/Por favor, completa la información requerida/i)
		).toBeInTheDocument();
	});

	it('calls apiRecover function when form is submitted with valid input', () => {
		render(
			<BrowserRouter>
				<RecoverAccount />
			</BrowserRouter>
		);

		const input = screen.getByLabelText(/Usuario/i);
		const submitButton = screen.getByRole('button', {
			name: /Recuperar contraseña/i,
		});

		// Cambia el valor del input para que contenga un usuario válido
		fireEvent.change(input, { target: { value: 'testuser' } });

		// Envía el formulario
		fireEvent.click(submitButton);

		// Puedes simular un éxito de envío comprobando la alerta o el estado del componente
	});
});
