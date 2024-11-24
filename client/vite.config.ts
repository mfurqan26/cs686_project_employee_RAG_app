import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "api-access": path.resolve(__dirname, "../api-access/src"),
    },
  },
});
