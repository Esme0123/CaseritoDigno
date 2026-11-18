import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración base de Vite para la campaña Caserito Digno.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
