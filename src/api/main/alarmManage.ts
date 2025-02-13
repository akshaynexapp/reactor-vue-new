/*
 * @Description  : 告警管理接口
 * @Date         : 2021-06-20 12:26:50
 * @LastEditors  : Hu
 * @LastEditTime : 2023-02-08 01:38:00
 * @FilePath     : \reactor-vue\src\api\main\alarmManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询告警模板
 * @param params
 * @returns
 */
export const alarmTemplateList = (params: any) =>
  defHttp.get<any>({ url: '/alarmTemplate/list', params });

/**
 * 添加告警模板
 * @param params
 * @returns
 */
export const alarmTemplateAdd = (params: any) =>
  defHttp.post<any>({ url: '/alarmTemplate/add', params });

/**
 * 删除告警模板
 * @param params
 * @returns
 */
export const alarmTemplateDelete = (params: any) =>
  defHttp.post<any>({ url: '/alarmTemplate/delete', params });

/**
 * 编辑告警模板
 * @param params
 * @returns
 */
export const alarmTemplateEdit = (params: any) =>
  defHttp.post<any>({ url: '/alarmTemplate/edit', params });

/**
 * 查询告警规则
 * @param params
 * @returns
 */
export const alarmRulePage = (params: any) => defHttp.get<any>({ url: '/alarmRule/page', params });

/**
 * 查询告警规则列表
 * @param params
 * @returns
 */
export const alarmRuleList = (params: any) => defHttp.get<any>({ url: '/alarmRule/list', params });

/**
 * 查询告警规则
 * @param params
 * @returns
 */
export const alarmRuleDetail = (params: any) =>
  defHttp.get<any>({ url: '/alarmRule/detail', params });

/**
 * 新增告警规则
 * @param params
 * @returns
 */
export const alarmRuleAdd = (params: any) => defHttp.post<any>({ url: '/alarmRule/add', params });

/**
 * 删除告警规则
 * @param params
 * @returns
 */
export const alarmRuleDelete = (params: any) =>
  defHttp.post<any>({ url: '/alarmRule/delete', params });

/**
 * 编辑告警规则
 * @param params
 * @returns
 */
export const alarmRuleEdit = (params: any) => defHttp.post<any>({ url: '/alarmRule/edit', params });

/**
 * 启动告警规则
 * @param params
 * @returns
 */
export const alarmRuleStart = (params: any) =>
  defHttp.post<any>({ url: '/alarmRule/start', params });

/**
 * 关闭告警规则
 * @param params
 * @returns
 */
export const alarmRuleStop = (params: any) => defHttp.post<any>({ url: '/alarmRule/stop', params });

/**
 * 查询告警记录
 * @param params
 * @returns
 */
export const alarmRecordPage = (params: any) =>
  defHttp.get<any>({ url: '/alarmRecord/page', params });

/**
 * 邮件发送测试
 * @param params
 * @returns
 */
export const alarmEmailTest = (params: any) =>
  defHttp.post<any>({ url: '/email/sendEmailHtml', params });

/**
 * 清空告警记录
 * @param params
 * @returns
 */
export const alarmRecordEmpty = (params: any) =>
  defHttp.post<any>({ url: '/alarmRecord/empty', params });
