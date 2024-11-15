import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ImageUpload from './ImageUpload';

describe('ImageUpload', () => {
	const mockHandleImageChange = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders correctly', () => {
		render(<ImageUpload handleImageChange={mockHandleImageChange} />);
		expect(
			screen.getByText('Click or drag to upload an image')
		).toBeInTheDocument();
	});

	it('handles file selection', () => {
		render(<ImageUpload handleImageChange={mockHandleImageChange} />);
		const input = screen.getByAcceptingFiles();
		const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
		Object.defineProperty(input, 'files', { value: [file] });
		fireEvent.change(input);
		expect(mockHandleImageChange).toHaveBeenCalledWith(file);
	});

	it('displays error for non-image files', () => {
		render(<ImageUpload handleImageChange={mockHandleImageChange} />);
		const input = screen.getByAcceptingFiles();
		const file = new File(['(⌐□_□)'], 'test.txt', { type: 'text/plain' });
		Object.defineProperty(input, 'files', { value: [file] });
		fireEvent.change(input);
		expect(
			screen.getByText('Please select an image file.')
		).toBeInTheDocument();
	});

	it('displays preview and change button after image selection', async () => {
		render(<ImageUpload handleImageChange={mockHandleImageChange} />);
		const input = screen.getByAcceptingFiles();
		const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
		Object.defineProperty(input, 'files', { value: [file] });
		fireEvent.change(input);

		// Wait for the preview to be rendered
		const preview = await screen.findByAltText('Preview');
		expect(preview).toBeInTheDocument();
		expect(screen.getByText('Change Image')).toBeInTheDocument();
	});
});
