/*
 * @Description  :
 * @Date         : 2021-05-07 09:51:04
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-18 17:04:26
 * @FilePath     : \reactor-vue\src\api\system\menuManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询菜单列表
 * @param params
 * @returns
 */
export const getMenuList = (params?: any) => defHttp.get<any>({ url: '/sysMenu/list', params });

/**
 * 查询菜单树，用于选择父菜单
 * @param params
 * @returns
 */
export const getMenuTree = (params?: any) => defHttp.get<any>({ url: '/sysMenu/tree', params });

/**
 * 查询菜单树，用于角色授权
 * @param params
 * @returns
 */
export const getMenuTreeForGrant = (params?: any) =>
  defHttp.get<any>({ url: '/sysMenu/treeForGrant', params });

/**
 * 查询菜单明细
 * @param params
 * @returns
 */
export const getMenuDetail = (params?: any) => defHttp.get<any>({ url: '/sysMenu/detail', params });

/**
 * 新增菜单
 * @param params
 * @returns
 */
export const addMenu = (params?: any) => defHttp.post<any>({ url: '/sysMenu/add', params });

/**
 * 编辑菜单
 * @param params
 * @returns
 */
export const editMenu = (params?: any) => defHttp.post<any>({ url: '/sysMenu/edit', params });

/**
 * 删除菜单
 * @param params
 * @returns
 */
export const delMenu = (id: string) =>
  defHttp.post<any>({ url: '/sysMenu/delete', params: { id: id } });
