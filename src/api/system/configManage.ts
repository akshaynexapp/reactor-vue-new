/*
 * @Description  :
 * @Date         : 2021-06-20 21:05:58
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 21:10:42
 * @FilePath     : \reactor-vue\src\api\system\configManage.ts
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 分页查询配置列表
 * @param params
 * @returns
 */
export const sysConfigPage = (params: any) => defHttp.get<any>({ url: '/sysConfig/page', params });

/**
 * 添加系统参数配置
 * @param params
 * @returns
 */
export const sysConfigAdd = (params: any) => defHttp.post<any>({ url: '/sysConfig/add', params });

/**
 * 编辑系统参数配置
 * @param params
 * @returns
 */
export const sysConfigEdit = (params: any) => defHttp.post<any>({ url: '/sysConfig/edit', params });

/**
 * 删除系统参数配置
 * @param params
 * @returns
 */
export const sysConfigDelete = (params: any) =>
  defHttp.post<any>({ url: '/sysConfig/delete', params });

/**
 * 获取字典类型下所有字典，举例，返回格式为：[{code:"M",value:"男"},{code:"F",value:"女"}]
 * @param params
 * @returns
 */
export const sysDictTypeDropDown = (params: any) =>
  defHttp.get<any>({ url: '/sysDictType/dropDown', params });
