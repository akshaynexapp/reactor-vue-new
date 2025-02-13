/*
 * @Description  :
 * @Date         : 2021-05-07 09:51:04
 * @LastEditors  : Hu
 * @LastEditTime : 2021-07-19 09:22:15
 * @FilePath     : \reactor-vue\src\api\system\roleManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询角色列表
 * @param params
 * @returns
 */
export const getRoleList = (params?: any) => defHttp.get<any>({ url: '/sysRole/page', params });

/**
 * 系统角色下拉
 * @param params
 * @returns
 */
export const getRoleDropDownList = (params?: any) => defHttp.get<any>({ url: '/sysRole/dropDown', params });

/**
 * 根据用户获取拥有角色
 * @param params
 * @returns
 */
export const getOwnRoleByUser = (id: string) => defHttp.get<any>({ url: '/sysUser/ownRole', params: { id: id } });

/**
 * 修改角色状态
 * @param params
 * @returns
 */
export const changeRoleStatus = (params: any) => defHttp.post<any>({ url: '/sysRole/changeStatus', params });

/**
 * 修改角色
 * @param params
 * @returns
 */
export const editRole = (params: any) => defHttp.post<any>({ url: '/sysRole/edit', params });

/**
 * 新增角色
 * @param params
 * @returns
 */
export const addRole = (params: any) => defHttp.post<any>({ url: '/sysRole/add', params });

/**
 * 删除角色
 * @param params
 * @returns
 */
export const deleteRole = (id: string) => defHttp.post<any>({ url: '/sysRole/delete', params: { id: id } });

/**
 * 根据角色编号获取拥有菜单
 * @param params
 * @returns
 */
export const getOwnMenuByRole = (id: string) => defHttp.get<any>({ url: '/sysRole/ownMenu', params: { id: id } });

/**
 * 角色授权菜单
 * @param params
 * @returns
 */
export const grantMenuByRole = (params: any) => defHttp.post<any>({ url: '/sysRole/grantMenu', params });

/**
 * 根据角色编号获取拥有数据权限
 * @param params
 * @returns
 */
export const getOwnDataByRole = (id: string) => defHttp.get<any>({ url: '/sysRole/ownData', params: { id: id } });

/**
 * 角色授权数据权限
 * @param params
 * @returns
 */
export const grantDataByRole = (params: any) => defHttp.post<any>({ url: '/sysRole/grantData', params });
