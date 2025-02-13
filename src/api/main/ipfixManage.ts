/*
 * @Description  : 任务管理接口
 * @Date         : 2021-06-20 12:26:50
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-16 09:06:19
 * @FilePath     : \reactor-vue\src\api\main\deviceTaskManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询设备任务
 * @param params
 * @returns
 */
export const ipfixMessagePage = (params: any) =>
  defHttp.get<any>({ url: '/ipfixMessage/page', params });
