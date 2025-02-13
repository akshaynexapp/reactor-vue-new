/*
 * @Description  : 任务管理接口
 * @Date         : 2021-06-20 12:26:50
 * @LastEditors  : Hu
 * @LastEditTime : 2023-09-25 18:58:49
 * @FilePath     : \reactor-vue\src\api\main\deviceTaskManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 查询设备任务
 * @param params
 * @returns
 */
export const devTaskPage = (params: any) => defHttp.get<any>({ url: '/devTask/page', params });

/**
 * 查询设备任务
 * @param params
 * @returns
 */
export const devTaskDetailPage = (params: any) =>
  defHttp.get<any>({ url: '/devTaskDetail/page', params });

/**
 * 启动设备任务
 * @param params
 * @returns
 */
export const devTaskStart = (params: any) =>
  defHttp.post<any>({ url: '/devTask/startTask', params });

/**
 * 重启设备任务
 * @param params
 * @returns
 */
export const devTaskRedo = (params: any) => defHttp.post<any>({ url: '/devTask/redoTask', params });

/**
 * 删除设备升级任务
 * @param params
 * @returns
 */
export const devTaskDelete = (params: any) => defHttp.post<any>({ url: '/devTask/delete', params });

// =============== 命令相关 ===============

/**
 * 远程代理
 * @param params {devSn: xxx, ip: xxx, port:xxx, protocol:xxx}
 * @returns
 */
export const devProxy = (params: any) => defHttp.get<any>({ url: '/devTask/proxy', params });

/**
 * 同步参数
 * @param params
 * @returns
 */
export const syncConfig = (params: any) => defHttp.get<any>({ url: '/devTask/syncConfig', params });

/**
 * 设备重启
 * @param params
 * @returns
 */
export const devReboot = (params: any) => defHttp.post<any>({ url: '/devTask/reboot', params });

/**
 * 下发参数, devSn或orgId
 * @param params
 * @returns
 */
export const devConfig = (params: any) => defHttp.post<any>({ url: '/devTask/config', params });

/**
 * 设备升级, devSn或orgId
 * @param params
 * @returns
 */
export const devUpgrade = (params: any) => defHttp.post<any>({ url: '/devTask/upgrade', params });

// ----------------串口通信相关接口-------------------

/**
 * 获取串口信息
 * @param devSn
 * @returns SERIAL_GET|[{"name":"serial1","baudrate":"115200","databit":"8","parity":"none","stopbit":"1","status":"1"}]
 */
export const getSerial = (devSn: string) =>
  defHttp.get<any>({ url: '/devTask/getSerial', params: { devSn } });

/**
 * 打开串口
 * @param devSn
 * @param name
 * @param baudrate
 * @param databit
 * @param parity
 * @param stopbit
 * @returns SERIAL_SET|{ "result":"succeed/fail" }

 */
export const openSerial = (
  devSn: string,
  name: string,
  baudrate: string,
  databit: string,
  parity: string,
  stopbit: string,
) =>
  defHttp.post<any>(
    {
      url: '/devTask/openSerial',
      params: { devSn, name, baudrate, databit, parity, stopbit },
    },
    { errorMessageMode: 'none' },
  );

/**
 * 关闭串口
 * @param devSn
 * @param name
 * @returns SERIAL_SET|{ "result":"succeed/fail" }

 */
export const closeSerial = (devSn: string, name: string) =>
  defHttp.post<any>(
    { url: '/devTask/closeSerial', params: { devSn, name } },
    { errorMessageMode: 'none' },
  );

/**
 * 发送串口数据
 * @param devSn
 * @param name
 * @param content
 * @returns SERIAL_DATA|xxxxxx

 */
export const sendSerialData = (devSn: string, name: string, content: string) =>
  defHttp.post<any>(
    { url: '/devTask/sendSerialData', params: { devSn, name, content } },
    { errorMessageMode: 'none' },
  );
