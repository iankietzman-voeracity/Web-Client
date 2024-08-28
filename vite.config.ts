/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: 'voeracity',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup',
        css: true,
    },
    server: {
        host: true,
        port: 3000,
    },
})
