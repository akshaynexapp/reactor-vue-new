/*
 * @Description  :
 * @Date         : 2021-05-07 09:51:04
 * @LastEditors  : Hu
 * @LastEditTime : 2021-08-09 01:39:23
 * @FilePath     : \reactor-vue\src\api\system\accountManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询账户列表
 * @param params
 * @returns
 */
export const getAccountList = (params: any) => defHttp.get<any>({ url: '/sysUser/page', params });

/**
 * 修改用户状态
 * @param id 账户编号
 * @param status 状态
 * @returns
 */
export const changeAccountStatus = (id: string, status: number) =>
  defHttp.post<any>({ url: '/sysUser/changeStatus', params: { id: id, status: status } });

/**
 * 删除账户
 * @param id
 * @returns
 */
export const deleteAccount = (ids: any[]) => defHttp.post<any>({ url: '/sysUser/delete', params: ids });

/**
 * 添加账户
 * @param params
 * @returns
 */
export const addAccount = (params: any) => defHttp.post<any>({ url: '/sysUser/add', params });

/**
 * 修改账户
 * @param params
 * @returns
 */
export const editAccount = (params: any) => defHttp.post<any>({ url: '/sysUser/edit', params });

/**
 * 账户明细
 * @param params
 * @returns
 */
export const detailAccount = (params: any) => defHttp.get<any>({ url: '/sysUser/detail', params });

/**
 * 重置密码
 * @param id
 * @returns
 */
export const resetPassword = (id: string) => defHttp.post<any>({ url: '/sysUser/resetPwd', params: { id: id } });

/**
 * 修改密码
 * @param params
 * @returns
 */
export const updatePassword = (params: any) => defHttp.post<any>({ url: '/sysUser/updatePwd', params });

/**
 * 更新用户信息
 * @param params
 * @returns
 */
export const updateInfo = (params: any) => defHttp.post<any>({ url: '/sysUser/updateInfo', params });

/**
 * 更新头像
 * @param params
 * @returns
 */
export const updateAvatar = (params: any) =>
  defHttp.post<any>({ url: '/sysUser/updateAvatar', params }, { errorMessageMode: 'none' });
