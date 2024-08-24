import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this matches your deployment setup
  },
  server: {
    cors: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:4050", // Your Node.js server URL
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
