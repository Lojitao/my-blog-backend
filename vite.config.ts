import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imp from 'vite-plugin-imp';

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
})
