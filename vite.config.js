import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_ID = "template_homstay4";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "static/manifest.xml",
          dest: TEMPLATE_ID,
        },
        {
          src: "static/vite.svg",
          dest: TEMPLATE_ID,
        },
        {
          src: "static/*",
          dest: "static",
        },
        {
          src: "static/*",
          dest: TEMPLATE_ID,
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    assetsDir: `${TEMPLATE_ID}/assets`,
    rollupOptions: {
      output: {
        entryFileNames: `${TEMPLATE_ID}/assets/[name].[hash].js`,
        chunkFileNames: `${TEMPLATE_ID}/assets/[name].[hash].js`,
        assetFileNames: `${TEMPLATE_ID}/assets/[name].[hash][extname]`,
      },
    },
  },
});
