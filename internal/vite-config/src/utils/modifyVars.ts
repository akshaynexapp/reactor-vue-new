/*
 * @Description  :
 * @Date         : 2023-05-17 15:04:53
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 10:38:24
 */
import { resolve } from 'node:path';

import { generate } from '@ant-design/colors';
// @ts-ignore: typo
import { getThemeVariables } from 'ant-design-vue/dist/theme';

// 主题颜色
export const primaryColor = '#EF8B1E';

function generateAntColors(color: string, theme: 'default' | 'dark' = 'default') {
  return generate(color, {
    theme,
  });
}

/**
 * less global variable
 */
export function generateModifyVars() {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables();
  return {
    ...modifyVars,
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa', //   Link color
  };
}
