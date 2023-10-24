import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    manifest:true, 
    rollupOptions:{
      input:'./src/App.jsx'
    }
  },
  server: {
    proxy: {
      '/note': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, 
      }
      , 
      '/list': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, 
      }
      , 
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, 
      }
      // },
      // '/post': {
      //   target: 'http://localhost:3000/',
      //   changeOrigin: true,
      //   secure: false, 
      //   rewrite: (path) => path.replace(/^\/post/, '/post'),
      // },
      // '/delete':{
      //   target:'http://localhost:3000/', 
      //   changeOrigin: true,
      //   secure: false, 
      //   rewrite: (path) => path.replace(/^\/delete/, '/delete'),
      // },
      // Using the proxy instance
      // '/app': {
      //   target: 'http://localhost:3000/',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy will be an instance of 'http-proxy'
      //   }}
    },
  plugins: [react()],
}})

// ,
//         '/post': {
//           target: 'http://localhost:3000/',
//           changeOrigin: true,
//           configure: (proxy, options) => {
//             // proxy will be an instance of 'http-proxy'
//           },
//       }