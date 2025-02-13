/*
 * @Description  :
 * @Date         : 2021-06-28 11:27:57
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 13:50:52
 * @FilePath     : \reactor-vue\src\api\base\upload.ts
 */
import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
