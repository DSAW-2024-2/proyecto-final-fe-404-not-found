/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	testEnvironment: 'jest-environment-jsdom', // Cambia a jsdom para simular un entorno de navegador
	transform: {
		'^.+\\.tsx?$': ['ts-jest', {}], // Escapa el punto antes de la extensión
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignorar importaciones de CSS en las pruebas
	},
	testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Detecta archivos de prueba .test.tsx o .spec.tsx
};
