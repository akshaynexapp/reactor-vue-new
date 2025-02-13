/*
 * @Description  : 任务管理接口
 * @Date         : 2021-06-20 12:26:50
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 14:07:02
 * @FilePath     : \reactor-vue\src\api\system\timedTaskManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 分页查询定时任务
 * @param params
 * @returns
 */
export const sysTimersPage = (params: any) => defHttp.get<any>({ url: '/sysTimers/page', params });

/**
 * 获取全部定时任务
 * @param params
 * @returns
 */
export const sysTimersList = (params: any) => defHttp.get<any>({ url: '/sysTimers/list', params });

/**
 * 查看详情定时任务
 * @param params
 * @returns
 */
export const sysTimersDetail = (params: any) =>
  defHttp.get<any>({ url: '/sysTimers/detail', params });

/**
 * 添加定时任务
 * @param params
 * @returns
 */
export const sysTimersAdd = (params: any) => defHttp.post<any>({ url: '/sysTimers/add', params });

/**
 * 删除定时任务
 * @param params
 * @returns
 */
export const sysTimersDelete = (params: any) =>
  defHttp.post<any>({ url: '/sysTimers/delete', params });

/**
 * 编辑定时任务
 * @param params
 * @returns
 */
export const sysTimersEdit = (params: any) => defHttp.post<any>({ url: '/sysTimers/edit', params });

/**
 * 获取系统的所有任务列表
 * @param params
 * @returns
 */
export const sysTimersGetActionClasses = (params: any) =>
  defHttp.get<any>({ url: '/sysTimers/getActionClasses', params });

/**
 * 启动定时任务
 * @param params
 * @returns
 */
export const sysTimersStart = (params: any) =>
  defHttp.post<any>({ url: '/sysTimers/start', params });

/**
 * 停止定时任务
 * @param params
 * @returns
 */
export const sysTimersStop = (params: any) => defHttp.post<any>({ url: '/sysTimers/stop', params });
