import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
      css: '/src/css',
      assets: '/src/assets',
      global: '/src/global',
      components: '/src/components',
      constant: '/src/constant',
      providers: '/src/providers',
      utils: '/src/utils',
      hooks: '/src/hooks',
      state: '/src/state',
      pages: '/src/pages',
      services: '/src/services',
      queries: '/src/queries',
      styled: '/src/styled',
      sounds: '/src/sounds',
      contexts: '/src/contexts',
      games: '/src/games',
    },
  },
  base: 'https://sandbox-template.antsomi.com/thanghn/demo-game1',
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  css: {
    devSourcemap: false,
  },
})
