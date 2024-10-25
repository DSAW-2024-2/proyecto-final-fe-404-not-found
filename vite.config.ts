import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/proyecto-final-fe-404-not-found/', // Cambia esto si es necesario
	build: {
		outDir: 'dist', // El directorio donde se generará el build
		sourcemap: true, // Genera un archivo sourcemap
	},
});
