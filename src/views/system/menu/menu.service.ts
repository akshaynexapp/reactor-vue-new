/*
 * @Description  :
 * @Date         : 2021-06-10 17:01:05
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-18 17:08:06
 * @FilePath     : \reactor-vue\src\views\system\menu\menu.service.ts
 */
import { getMenuTree, getMenuTreeForGrant } from '/@/api/system/menuManage';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

/**
 * 翻译菜单title
 * @param menu
 */
export function setI18nTitle(menu) {
  if (menu && Array.isArray(menu)) {
    menu.forEach((item) => {
      item['title'] = t(item['title']);
      item['children'] && setI18nTitle(item['children']);
    });
  }
}

/**
 * 获取国际化菜单树
 * @returns
 */
export async function getI18nMenuTree() {
  const treeData = await getMenuTree();
  setI18nTitle(treeData);
  return treeData;
}

/**
 * 获取国际化菜单树
 * @returns
 */
export async function getI18nMenuTreeForGrant() {
  const treeData = await getMenuTreeForGrant();
  setI18nTitle(treeData);
  return treeData;
}
