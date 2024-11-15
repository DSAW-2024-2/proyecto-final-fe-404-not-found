import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'https://proyecto-final-be-404-not-found.vercel.app/', // Cambia esta URL por la de tu backend
				changeOrigin: true,
				secure: false, // Permite usar HTTP sin errores de certificado
			},
		},
	},
});
