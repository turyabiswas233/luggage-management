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
    cssMinify: true,
    minify: "terser",
    chunkSizeWarningLimit: 4000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // server:{
  //   host: ['10.0.0.151']
  // }
});
