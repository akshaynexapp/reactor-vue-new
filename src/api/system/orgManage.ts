/*
 * @Description  : 分组管理接口
 * @Date         : 2021-05-07 09:51:04
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-18 17:02:20
 * @FilePath     : \reactor-vue\src\api\system\orgManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 获取分组下拉树
 * @param params
 * @returns
 */
export const getOrgTree = (params?: any) => defHttp.get<any>({ url: '/sysOrg/tree', params });

/**
 * 获取分组列表(树形表格)
 * @param params
 * @returns
 */
export const getOrgList = (params?: any) => defHttp.get<any>({ url: '/sysOrg/list', params });

/**
 * 新增分组
 * @param params
 * @returns
 */
export const addOrg = (params: any) => defHttp.post<any>({ url: '/sysOrg/add', params });

/**
 * 修改分组
 * @param params
 * @returns
 */
export const editOrg = (params: any) => defHttp.post<any>({ url: '/sysOrg/edit', params });

/**
 * 删除分组
 * @param params
 * @returns
 */
export const deleteOrg = (id: string) =>
  defHttp.post<any>({ url: '/sysOrg/delete', params: { id: id } });
