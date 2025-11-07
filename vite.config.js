import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use repository name for GitHub Pages, root path for other deployments (Vercel, local)
  base: process.env.GITHUB_ACTIONS ? '/hiragana-writing-prompts/' : '/',
})
