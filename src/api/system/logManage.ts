/*
 * @Description  : 操作日志接口
 * @Date         : 2021-06-19 23:21:08
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-19 23:56:39
 * @FilePath     : \reactor-vue\src\api\log\logManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询操作日志
 * @param params
 * @returns
 */
export const sysOpLogPage = (params: any) => defHttp.get<any>({ url: '/sysOpLog/page', params });

/**
 * 清空操作日志
 * @param params
 * @returns
 */
export const sysOpLogDelete = (params: any) =>
  defHttp.post<any>({ url: '/sysOpLog/delete', params });

/**
 * 查询访问日志
 * @param params
 * @returns
 */
export const sysVisLogPage = (params: any) => defHttp.get<any>({ url: '/sysVisLog/page', params });

/**
 * 清空访问日志
 * @param params
 * @returns
 */
export const sysVisLogDelete = (params: any) =>
  defHttp.post<any>({ url: '/sysVisLog/delete', params });
