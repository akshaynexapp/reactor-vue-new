/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 03:33:06
 * @FilePath     : \reactor-vue\src\views\log\operation\operationLog.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.operationLog.label.name'),
    dataIndex: 'name',
    width: 100,
    defaultHidden: true,
  },
  {
    title: t('view.system.operationLog.label.opType'),
    dataIndex: 'opType',
    width: 100,
    defaultHidden: true,
  },
  {
    title: t('view.system.operationLog.label.url'),
    dataIndex: 'url',
    width: 200,
    align: 'left',
  },
  {
    title: t('view.system.operationLog.label.success'),
    dataIndex: 'success',
    width: 80,
  },
  {
    title: t('view.system.operationLog.label.ip'),
    dataIndex: 'ip',
    width: 100,
  },
  {
    title: t('view.system.operationLog.label.opTime'),
    dataIndex: 'opTime',
    width: 120,
  },
  {
    title: t('view.system.operationLog.label.account'),
    dataIndex: 'account',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: t('view.system.operationLog.label.account'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dates',
    label: t('view.system.operationLog.label.opTime'),
    component: 'RangePicker',
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
    field: 'browser',
    label: t('view.system.operationLog.label.browser'),
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'os',
    label: t('view.system.operationLog.label.os'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'className',
    label: t('view.system.operationLog.label.className'),
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'message',
    label: t('view.system.operationLog.label.message'),
    component: 'Input',
    colProps: { span: 12 },
    show: false,
  },
  {
    field: 'param',
    label: t('view.system.operationLog.label.param'),
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'result',
    label: t('view.system.operationLog.label.result'),
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];
