import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { crx } from "@crxjs/vite-plugin";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";

import manifest from "./manifest.json" with { type: "json" };

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "webextension-polyfill": [["default", "browser"]]
        }
      ]
    }),
    crx({ manifest })
  ],
  optimizeDeps: {
    include: ["vue", "webextension-polyfill"]
  }
});
