import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let BASEURL = 'https://keeperappbackend-ijry.onrender.com/'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    manifest:true, 
   
    outDir:"public"
  },
  server: {
    proxy: {
      '/api/note': {
        target: BASEURL,
        changeOrigin: true,
        secure: false, 
      }
      , 
      '/api/list': {
        target: BASEURL,
        changeOrigin: true,
        secure: false, 
      }
      , 
      '/api/user': {
        target: BASEURL ,
        changeOrigin: true,
        secure: false, 
      }
      
    },
  plugins: [react()]
}})

