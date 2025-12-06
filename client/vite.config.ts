import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  base: "/portfolio-website/", // Adjust this to match your repository name
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
