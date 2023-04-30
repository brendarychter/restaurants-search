import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(command)
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: env.VITE_REACT_GOOGLE_MAPS_API_KEY,
    },
  }
})

