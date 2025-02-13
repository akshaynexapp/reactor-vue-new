/*
 * @Description  : DASHBOARD接口
 * @Date         : 2021-06-20 12:26:50
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-11 22:46:12
 * @FilePath     : \reactor_web_3.0\src\api\main\dashboardManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/** ==================== 图表相关接口 ==================== */

/**
 * 设备在线卡片
 * @param params
 * @returns
 */
export const getDeviceCard = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getDeviceCard', params });

/**
 * 设备网络卡片
 * @param params
 * @returns
 */
export const getNetTypeCard = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getNetTypeCard', params });

/**
 * 任务卡片
 * @param params
 * @returns
 */
export const getTaskCard = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getTaskCard', params });

/**
 * 告警卡片
 * @param params
 * @returns
 */
export const getAlarmCard = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getAlarmCard', params });

/**
 * 在线趋势
 * @param params
 * @returns
 */
export const getOnlineTrend = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getOnlineTrend', params });

/**
 * 流量趋势
 * @param params
 * @returns
 */
export const getTrafficTrend = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getTrafficTrend', params });

/**
 * 软件版本分布
 * @param params
 * @returns
 */
export const getSoftVerPie = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getSoftVerPie', params });

/**
 * 信号强度分布
 * @param params
 * @returns
 */
export const getSignalStrength = (params: any) =>
  defHttp.get<any>({ url: '/stat/analysis/getSignalStrength', params });

/** ==================== TOP统计相关接口 ==================== */

/**
 * 查询设备日流量top列表
 * @param params
 * @returns
 */
export const getDevDayFlowTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getDevDayFlowTopList', params });

/**
 * 查询分组日流量top列表
 * @param params
 * @returns
 */
export const getGroupDayFlowTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getGroupDayFlowTopList', params });

/**
 * 查询最差信号top列表
 * @param params
 * @returns
 */
export const getWorstSignalTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getWorstSignalTopList', params });

/**
 * 查询设备软件版本号top列表
 * @param params
 * @returns
 */
export const getSoftVersionTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getSoftVersionTopList', params });

/**
 * 查询网络类型分布top列表
 * @param params
 * @returns
 */
export const getNetTypeTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getNetTypeTopList', params });

/**
 * 查询分组设备上线率top列表
 * @param params
 * @returns
 */
export const getGroupOnlineRateTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getGroupOnlineRateTopList', params });

/**
 * 查询设备上线率top列表
 * @param params
 * @returns
 */
export const getDevOnlineRateTopList = (params: any) =>
  defHttp.get<any>({ url: '/stat/rank/getDevOnlineRateTopList', params });
