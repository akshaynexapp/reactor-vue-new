/*
 * @Description  :
 * @Date         : 2023-04-22 02:49:32
 * @LastEditors: Hulw
 * @LastEditTime: 2024-03-28 23:09:45
 */
import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      https: false,
      proxy: {
        '/api': {
          //target: 'http://localhost:82',
          target: 'https://apts.instaroute.net:20180/api',
          changeOrigin: true,
          // ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          // secure: false
        },
        // '/heartbeat': {
        //   target: 'https://apts.instaroute.net:20190',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/heartbeat/, '/heartbeat'),
        // },

        '/heartbeat': {
          target: 'https://apts.instaroute.net:20190',
          changeOrigin: true,
          secure: false, // Ignore SSL certificate issues
          rewrite: (path) => path.replace(/^\/heartbeat/, '/heartbeat'),
        },
        '/ws': {
          target: 'ws://localhost:82',
          //target: 'wss://cloud.relixnetworks.com:20180/ws',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/ws`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },
  },
});
