/*
 * @Description  :
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-22 16:00:09
 * @FilePath     : \reactor-vue\src\components\Upload\src\typing.ts
 */
import { UploadApiResult } from '/@/api/base/model/uploadModel';

export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
}

export interface FileItem {
  thumbUrl?: string;
  name: string;
  size: string | number;
  type?: string;
  percent: number;
  file: File;
  status?: UploadResultStatus;
  responseData?: UploadApiResult;
  uuid: string;
}

export interface PreviewFileItem {
  url: string;
  name: string;
  type: string;
}

export interface FileBasicColumn {
  /**
   * Renderer of the table cell. The return value should be a VNode, or an object for colSpan/rowSpan config
   * @type Function | ScopedSlot
   */
  customRender?: Function;
  /**
   * Title of this column
   * @type any (string | slot)
   */
  title: string;

  /**
   * Width of this column
   * @type string | number
   */
  width?: number;
  /**
   * Display field of the data record, could be set like a.b.c
   * @type string
   */
  dataIndex: string;
  /**
   * specify how content is aligned
   * @default 'left'
   * @type string
   */
  align?: 'left' | 'right' | 'center';
}
