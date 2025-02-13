/*
 * @Description  : 在线用户接口
 * @Date         : 2021-06-20 15:43:45
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 15:45:04
 * @FilePath     : \reactor-vue\src\api\system\onlineUser.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 在线用户列表
 * @param params
 * @returns
 */
export const sysOnlineUserList = (params: any) =>
  defHttp.get<any>({ url: '/sysOnlineUser/list', params });

/**
 * 强制下线
 * @param params
 * @returns
 */
export const sysOnlineUserForceExist = (params: any) =>
  defHttp.post<any>({ url: '/sysOnlineUser/forceExist', params });
