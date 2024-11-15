import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileUser from './ProfileUser';

test('renders ProfileUser component', () => {
	render(<ProfileUser />);
	const profileElement = screen.getByText(/Perfil/i);
	expect(profileElement).toBeInTheDocument();
});
