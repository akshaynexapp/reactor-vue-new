/*
 * @Description  : 文件管理接口
 * @Date         : 2021-06-18 16:44:43
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 14:03:46
 * @FilePath     : \reactor-vue\src\api\system\fileManage.ts
 */

import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { downloadByUrl } from '/@/utils/file/download';

const globSetting = useGlobSetting();

/**
 * 分页查询文件信息表
 * @param params
 * @returns
 */
export const sysFileInfoPage = (params: any) =>
  defHttp.get<any>({ url: '/sysFileInfo/page', params });

/**
 * 获取全部文件信息表
 * @param params
 * @returns
 */
export const sysFileInfoList = (params: any) =>
  defHttp.get<any>({ url: '/sysFileInfo/list', params });

/**
 * 上传文件
 * @param params
 * @returns
 */
export const sysFileInfoUpload = (params: any) =>
  defHttp.post<any>({
    url: '/sysFileInfo/upload',
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 10 * 60 * 1000,
    params,
  });

/**
 * 下载文件
 * @param params
 * @returns
 */
export const sysFileInfoDownload = (id: string) =>
  downloadByUrl({ url: `${globSetting.apiUrl}/sysFileInfo/download?id=${id}` });

/**
 * 查看图片
 * @param params
 * @returns
 */
export const sysFileInfoPreview = (params: any) =>
  defHttp.get<any>({ url: '/sysFileInfo/preview', responseType: 'arraybuffer', params });

/**
 * 查看详情文件信息表
 * @param params
 * @returns
 */
export const sysFileInfoDetail = (params: any) =>
  defHttp.get<any>({ url: '/sysFileInfo/detail', params });

/**
 * 删除文件信息表
 * @param id
 * @returns
 */
export const sysFileInfoDelete = (id: string) =>
  defHttp.post<any>({ url: '/sysFileInfo/delete', params: { id: id } });
