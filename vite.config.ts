import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://149.130.182.245:3001', // La URL base de tu backend
				changeOrigin: true,
				secure: false, // Permite usar HTTP sin errores de certificado
				rewrite: (path) => path.replace(/^\/api/, '/api-wheels/v1'), // Reemplaza el prefijo en la ruta
			},
		},
	},
});
