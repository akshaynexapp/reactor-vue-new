/*
 * @Description  :
 * @Date         : 2023-05-17 15:04:53
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 14:22:52
 */
/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { PluginOption } from 'vite';
import compressPlugin from 'vite-plugin-compression';

export function configCompressPlugin({
  compress,
  deleteOriginFile = false,
}: {
  compress: string;
  deleteOriginFile?: boolean;
}): PluginOption[] {
  const compressList = compress.split(',');

  const plugins: PluginOption[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
        // 大于10k启用压缩
        threshold: 10240,
      }),
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    );
  }
  return plugins;
}
