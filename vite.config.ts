import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/proxy": {
        target:
          "http://dictionar-backend-env.eba-suiz9hnj.eu-north-1.elasticbeanstalk.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ""),
      },
    },
  },
});
