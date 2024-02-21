import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
import { minifyHtml, injectHtml } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    minifyHtml(),
    injectHtml({
      // TODO with API environment variables
      injectData: {},
    }),
    VitePWA({
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "offline.html",
      },
      srcDir: "src",
      strategies: "injectManifest",
      includeManifestIcons: false,
      includeAssets: ["world/*", "pwa/**/*", "farms/*", "offline/*", "*.svg"],
      injectManifest: {
        maximumFileSizeToCacheInBytes: 15000000,
        globPatterns: ["**/*.{js,css,html}", "assets/*.{jpg,mp3,svg,gif,png}"],
        manifestTransforms: [
          (manifestEntries) => ({
            manifest: manifestEntries.map((entry) => {
              if (entry.url.startsWith("dist/")) {
                // eslint-disable-next-line no-console
                console.log("MANIFEST: ", entry);
              }
              return entry;
            }),
          }),
        ],
      },
      filename: "sw.ts",
      manifest: {
        name: "Sunflower Land",
        id: "com.sunflower-land",
        description:
          "Plant, Chop, Mine, Craft & Collect at Sunflower Land. The MetaVerse game with endless resources.",
        short_name: "Sunflower Land",
        start_url: "/pwa/",
        theme_color: "#303443",
        display: "standalone",
        background_color: "#0099dc",
        orientation: "portrait",
        icons: [
          {
            src: "pwa/icons/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa/icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "pwa/screenshots/logo.webp",
            sizes: "780x350",
            type: "image/webp",
          },
          {
            src: "pwa/screenshots/welcome.webp",
            sizes: "780x349",
            type: "image/webp",
          },
          {
            src: "pwa/screenshots/fishing.webp",
            sizes: "780x348",
            type: "image/webp",
          },
        ],
      },
    }),
  ],
  // Addresses web3 issue
  resolve: {
    alias: {
      web3: "web3/dist/web3.min.js",
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
  css: {
    modules: {},
  },
  base: "./",
  build: {
    chunkSizeWarningLimit: 1000,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
  },
});
