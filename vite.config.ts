import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/_functions": {
        target: "https://www.newportrising.co.uk",
        changeOrigin: true,
        secure: true,

        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            // Strip headers that cause Wix to return empty HTML responses
            proxyReq.removeHeader("origin");
            proxyReq.removeHeader("referer");
          });
        },
      },
    },
  },
});
