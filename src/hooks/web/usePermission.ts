/*
 * @Description  :
 * @Date         : 2021-06-13 01:23:50
 * @LastEditors  : Hu
 * @LastEditTime : 2022-11-21 00:00:36
 * @FilePath     : \reactor-vue\src\hooks\web\usePermission.ts
 */
import type { RouteRecordRaw } from 'vue-router';

import { usePermissionStore } from '/@/store/modules/permission';
import { useUserStore } from '/@/store/modules/user';

import { useTabs } from './useTabs';

import { router, resetRouter } from '/@/router';
// import { RootRoute } from '/@/router/routes';

import { intersection } from 'lodash-es';
import { isArray } from '/@/utils/is';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const { closeAll } = useTabs(router);

  /**
   * Reset and regain authority resource information
   * 重置和重新获得权限资源信息
   * @param id
   */
  async function resume() {
    const tabStore = useMultipleTabStore();
    tabStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    closeAll();
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(value?: string | string[], def = true): boolean {
    // 超级用户直接跳过
    if (userStore.getUserInfo.adminType === -1) {
      return true;
    }
    // Visible by default
    if (!value) {
      return def;
    }
    const allCodeList = permissionStore.getPermCodeList as string[];
    if (!isArray(value)) {
      return allCodeList.includes(value);
    }
    return (intersection(value, allCodeList) as string[]).length > 0;
  }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  return { hasPermission, refreshMenu };
}
