/*
 * @Description  :
 * @Date         : 2021-05-07 09:51:04
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-13 03:08:19
 * @FilePath     : \reactor-vue\src\router\routes\index.ts
 */
import type { AppRouteRecordRaw } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/base/login/Login.vue'),
  meta: {
    title: t('menu.login'),
  },
};

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
