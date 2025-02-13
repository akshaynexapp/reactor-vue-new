/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-11-22 21:56:28
 * @FilePath     : \reactor-vue\src\views\system\file\file.data.ts
 */
import { h } from 'vue';
import { Tag, Image } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useGlobSetting } from '/@/hooks/setting';

const globSetting = useGlobSetting();

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.file.label.fileBucket'),
    dataIndex: 'fileBucket',
    width: 120,
    align: 'left',
    ifShow: false,
  },
  {
    title: t('view.system.file.label.fileObjectName'),
    dataIndex: 'fileObjectName',
    width: 200,
  },
  {
    title: t('view.system.file.label.fileOriginName'),
    dataIndex: 'fileOriginName',
    width: 300,
  },
  {
    title: t('menu.button.preview'),
    dataIndex: '',
    width: 80,
    customRender: ({ record }) => {
      if (
        record.fileSuffix === 'png' ||
        record.fileSuffix === 'jpeg' ||
        record.fileSuffix === 'jpg' ||
        record.fileSuffix === 'gif' ||
        record.fileSuffix === 'tif' ||
        record.fileSuffix === 'bmp'
      ) {
        return h(Image, {
          width: 30,
          src: `${globSetting.apiUrl}/sysFileInfo/preview?id=${record.id}`,
        });
      }
      return '';
    },
  },
  {
    title: t('view.system.file.label.fileSuffix'),
    dataIndex: 'fileSuffix',
    customRender: ({ record }) => {
      return h(Tag, { color: 'blue' }, () => record.fileSuffix);
    },
    width: 100,
  },
  {
    title: t('view.system.file.label.fileSizeInfo'),
    dataIndex: 'fileSizeInfo',
    width: 100,
  },
  {
    title: t('common.createUser'),
    dataIndex: 'createUserName',
    width: 100,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fileOriginName',
    label: t('view.system.file.label.fileOriginName'),
    component: 'Input',
    colProps: { span: 16 },
  },
];
