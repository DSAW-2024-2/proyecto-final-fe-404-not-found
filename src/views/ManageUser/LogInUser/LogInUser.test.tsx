import React from 'react';
import { render, screen } from '@testing-library/react';
import LogInUser from './LogInUser';
import '@testing-library/jest-dom';

test('renders LogInUser component', () => {
	render(<LogInUser />);
	const loginElement = screen.getByText(/Iniciar Sesión/i);
	expect(loginElement).toBeInTheDocument();

	// Additional checks
	const usernameField = screen.getByLabelText(/Username/i); // Assuming labels are accessible
	const passwordField = screen.getByLabelText(/Password/i); // Replace with the actual label text if different
	const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

	expect(usernameField).toBeInTheDocument();
	expect(passwordField).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
});
