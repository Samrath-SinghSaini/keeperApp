import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let BASEURL = 'https://keeperappbackend-ijry.onrender.com//'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    manifest:true, 
   
    outDir:"public"
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

