/*
 * @Description  : 设备管理接口
 * @Date         : 2021-06-22 23:07:55
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-12 01:48:36
 * @FilePath     : \reactor-vue\src\api\main\deviceManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询设备
 * @param params
 * @returns
 */
export const devPage = (params: any) => defHttp.get<any>({ url: '/dev/page', params });

/**
 * 设备详情
 * @param params
 * @returns
 */
export const devDetail = (params: any) => defHttp.get<any>({ url: '/dev/detail', params });

/**
 * 在线率报表
 * @param params
 * @returns
 */
export const getUptimeChart = (params: any) =>
  defHttp.get<any>({ url: '/stat/dev/getUptimeChart', params });

/**
 * 日流量报表
 * @param params
 * @returns
 */
export const getDayFlowChart = (params: any) =>
  defHttp.get<any>({ url: '/stat/dev/getDayFlowChart', params });

/**
 * 日流量报表
 * @param params
 * @returns
 */
export const getMonthFlowChart = (params: any) =>
  defHttp.get<any>({ url: '/stat/dev/getMonthFlowChart', params });

/**
 * 根据设备SN获取GPS列表，如果无日期条件，默认查询当天数据
 * @param {devSn:'', searchBeginTime:'', searchEndTime: ''}
 * @returns
 */
export const getGpsListByDevSn = (params: any) =>
  defHttp.get<any>({ url: '/dev/getGpsListByDevSn', params });

/**
 * 设备导出
 * @param params
 * @returns
 */
export const devExport = (params: any) =>
  defHttp.get<any>(
    { url: '/dev/export', params, responseType: 'blob', timeout: 120 * 1000 },
    { isReturnNativeResponse: true },
  );

/**
 * 根据ID查询配置文件
 * @param params
 * @returns
 */
export const devConfigFile = (params: any) => defHttp.get<any>({ url: '/dev/configFile', params });

/**
 * 添加设备
 * @param params
 * @returns
 */
export const devAdd = (params: any) => defHttp.post<any>({ url: '/dev/add', params });

/**
 * 编辑设备
 * @param params
 * @returns
 */
export const devEdit = (params: any) => defHttp.post<any>({ url: '/dev/edit', params });

/**
 * 删除设备
 * @param params
 * @returns
 */
export const devDelete = (params: any) => defHttp.post<any>({ url: '/dev/delete', params });

/**
 * 调整分组
 * @param params
 * @returns
 */
export const devAdjustOrg = (params: any) => defHttp.post<any>({ url: '/dev/adjustOrg', params });

// =============== SDLAN ===============

/**
 * 查询设备应用列表
 * @param params
 * @returns
 */
export const devAppPage = (params: any) => defHttp.get<any>({ url: '/devApp/list', params });

/**
 * 添加设备
 * @param params
 * @returns
 */
export const devAppAdd = (params: any) => defHttp.post<any>({ url: '/devApp/add', params });

/**
 * 编辑设备应用列表
 * @param params
 * @returns
 */
export const devAppEdit = (params: any) => defHttp.post<any>({ url: '/devApp/edit', params });

/**
 * 设备设备应用详情
 * @param params
 * @returns
 */
export const devAppDetail = (params: any) => defHttp.get<any>({ url: '/devApp/detail', params });

/**
 * 删除设备应用
 * @param params
 * @returns
 */
export const devAppDelete = (params: any) => defHttp.post<any>({ url: '/devApp/delete', params });

// 设备参数模板
/**
 * 查询参数模板下拉列表
 * @param params
 * @returns
 */
export const configTemplateDropDown = (params: any) =>
  defHttp.get<any>({ url: '/configTemplate/dropDown', params });

/**
 * 添加参数模板
 * @param params
 * @returns
 */
export const configTemplateAdd = (params: any) =>
  defHttp.post<any>({ url: '/configTemplate/add', params });

/**
 * 编辑参数模板
 * @param params
 * @returns
 */
export const configTemplateEdit = (params: any) =>
  defHttp.post<any>({ url: '/configTemplate/edit', params });

/**
 * 参数模板详情
 * @param params
 * @returns
 */
export const configTemplateDetail = (params: any) =>
  defHttp.get<any>({ url: '/configTemplate/detail', params });

/**
 * 删除参数模板
 * @param params
 * @returns
 */
export const configTemplateDelete = (params: any) =>
  defHttp.post<any>({ url: '/configTemplate/delete', params });
