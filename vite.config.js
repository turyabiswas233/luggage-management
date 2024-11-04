import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: [
  //     {
  //       find: /^~.+/,
  //       replacement: (val) => {
  //         return val.replace(/^~/, "");
  //       },
  //     },
  //   ],
  // },
  build: {
    cssMinify: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 5000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
