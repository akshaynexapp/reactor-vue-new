/*
 * @Description  :
 * @Date         : 2023-05-17 15:04:53
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 09:41:56
 */
import yaml from '@rollup/plugin-yaml';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// @ts-ignore: type unless
import DefineOptions from 'unplugin-vue-define-options/vite';
import { type PluginOption } from 'vite';
import purgeIcons from 'vite-plugin-purge-icons';
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';

import { createAppConfigPlugin } from './appConfig';
import { configCompressPlugin } from './compress';
import { configHtmlPlugin } from './html';
import { configSvgIconsPlugin } from './svgSprite';
import { configVisualizerConfig } from './visualizer';

interface Options {
  isBuild: boolean;
  root: string;
  compress: string;
  enableMock?: boolean;
  enableAnalyze?: boolean;
}

async function createPlugins({ isBuild, root, compress, enableAnalyze }: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    DefineOptions(),
  ];

  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild });
  vitePlugins.push(appConfigPlugin);

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin({ isBuild }));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin({ isBuild }));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // @rollup/plugin-yaml
  vitePlugins.push(yaml());

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin({
        compress,
      }),
    );
  }

  // rollup-plugin-visualizer
  if (enableAnalyze) {
    vitePlugins.push(configVisualizerConfig());
  }

  return vitePlugins;
}

export { createPlugins };
