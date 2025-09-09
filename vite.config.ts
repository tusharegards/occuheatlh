import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({

  server: {
    proxy: {
      '/api': {
        target: 'https://occuhealthdev.service-now.com/api/now/table/sn_customerservice_clinic?sysparm_fields=u_clinic_name', 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
  plugins: [react(), tailwindcss()],
});




