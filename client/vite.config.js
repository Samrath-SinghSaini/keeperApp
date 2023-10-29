import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let BASEURL = 'https://keeper-app-six-sigma.vercel.app/'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    manifest:true, 
    rollupOptions:{
      input:'./src/App.jsx'
    },
    outDir:"./src/public"
  },
  server: {
    proxy: {
      '/note': {
        target: BASEURL,
        changeOrigin: true,
        secure: false, 
      }
      , 
      '/list': {
        target: BASEURL,
        changeOrigin: true,
        secure: false, 
      }
      , 
      '/user': {
        target: BASEURL,
        changeOrigin: true,
        secure: false, 
      }
      
    },
  plugins: [react()]
}})

