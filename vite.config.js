import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4000,
    host: true,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
