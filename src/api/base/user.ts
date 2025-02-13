/*
 * @Description  :
 * @Date         : 2021-05-07 09:51:04
 * @LastEditors  : Hu
 * @LastEditTime : 2022-11-30 19:54:21
 * @FilePath     : \reactor-vue\src\api\base\user.ts
 */
import { defHttp } from '/@/utils/http/axios';
import { LoginParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetLoginUserInfo = '/getLoginUserInfo',
}

/**
 * 用户登录
 * @param params
 * @param mode
 * @returns
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<string>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 用户登出
 * @param params
 * @param mode
 * @returns
 */
export function doLogout() {
  return defHttp.get<any>({ url: Api.Logout });
}

/**
 * 获取登录用户信息
 * @returns
 */
export function getLoginUserInfo() {
  return defHttp.get<any>({
    url: Api.GetLoginUserInfo,
  });
}
