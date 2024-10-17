import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 4500,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // server:{
  //   host: ['10.0.0.151']
  // }
});
