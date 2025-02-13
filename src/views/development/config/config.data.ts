/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-02 02:39:52
 * @FilePath     : \reactor-vue\src\views\development\config\config.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.config.label.name'),
    dataIndex: 'name',
    width: 150,
    align: 'left',
  },
  {
    title: t('view.system.config.label.code'),
    dataIndex: 'code',
    width: 200,
    align: 'left',
  },
  {
    title: t('view.system.config.label.value'),
    dataIndex: 'value',
    width: 200,
    align: 'left',
  },
  {
    title: t('common.remark'),
    dataIndex: 'remark',
    width: 150,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('view.system.config.label.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: t('view.system.config.label.code'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('view.system.config.label.name'),
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'code',
    label: t('view.system.config.label.code'),
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'value',
    label: t('view.system.config.label.value'),
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'sysFlag',
    label: t('view.system.config.label.sysFlag'),
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 'N',
    componentProps: {
      options: [
        { label: t('common.yesText'), value: 'Y' },
        { label: t('common.noText'), value: 'N' },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: t('common.remark'),
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];
