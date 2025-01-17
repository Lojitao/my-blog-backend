import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imp from 'vite-plugin-imp';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`, // 自動加載樣式
        },
      ],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // 确保加载 Tailwind 插件
        autoprefixer(), // 添加 Autoprefixer
      ],
    },
  },
})
