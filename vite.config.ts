import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://149.130.182.245:3001/api-wheels/v1', // Cambia esta URL por la de tu backend
				changeOrigin: true,
				secure: false, // Permite usar HTTP sin errores de certificado
			},
		},
	},
});
