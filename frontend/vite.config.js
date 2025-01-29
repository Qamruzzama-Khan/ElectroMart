import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global funtions like 'describe', 'test'
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './src/setupTests.js',
  }
});
