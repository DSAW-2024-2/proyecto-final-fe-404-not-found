import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterUser from './RegisterUser';

test('renders RegisterUser component', () => {
	render(<RegisterUser />);
	const registerElement = screen.getByText(/Registrarse/i);
	expect(registerElement).toBeInTheDocument();
});
