import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Update the app in the background and switch to the new version
      // on the next launch, without asking the user anything.
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png", "share-image.png"],

      manifest: {
        name: "Newport Rising Chartist Trail",
        short_name: "Chartist Trail",
        description:
          "A self-guided walking trail through Newport, following the route of the Chartists on 4 November 1839.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ede532",
        theme_color: "#ede532",
        lang: "en-GB",
        categories: ["education", "travel", "navigation"],
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        // Precache the app itself so it opens with no connection.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,json,webmanifest}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          {
            // Trail data from the GitHub fallback. Network first, but keep
            // the last good copy in case that fails too.
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*chartist_trail\.json.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "trail-data",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Photographs and audio hosted on Wix. These never change
            // once uploaded, so serve from cache and save the data.
            urlPattern: /^https:\/\/(static|video)\.wixstatic\.com\/.*$/,
            handler: "CacheFirst",
            options: {
              cacheName: "trail-media",
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },
          {
            // Map fonts and icons for the Protomaps basemap. Small, and they
            // never change, so cache them hard.
            urlPattern: /^https:\/\/protomaps\.github\.io\/basemaps-assets\/.*$/,
            handler: "CacheFirst",
            options: {
              cacheName: "map-assets",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      devOptions: {
        // Keep the service worker out of the way while developing.
        enabled: false,
      },
    }),
  ],

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