import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    define: {
        'process.env': process.env,
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
        dynamicImport,
        eslint(),
    ],
    build: {
        emptyOutDir: true,
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://localhost:7237/api',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
