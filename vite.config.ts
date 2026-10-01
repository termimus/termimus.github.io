import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        changelog: "changelog.html",
        donate: "donate.html",
      },
    },
  },
});
