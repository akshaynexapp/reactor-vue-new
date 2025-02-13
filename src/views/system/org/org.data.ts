/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-04-29 00:01:53
 * @FilePath     : \reactor-vue\src\views\system\org\org.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.org.label.name'),
    dataIndex: 'name',
    width: 300,
    align: 'left',
  },
  {
    title: t('view.system.org.label.secret'),
    dataIndex: 'secret',
    width: 150,
  },
  {
    title: t('common.sort'),
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: t('common.createUser'),
    dataIndex: 'createUserName',
    width: 180,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: t('common.remark'),
    dataIndex: 'remark',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('view.system.org.label.name'),
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
    label: t('view.system.org.label.name'),
    component: 'Input',
    required: true,
    colProps: { span: 14 },
  },
  {
    field: 'sort',
    label: t('common.sort'),
    component: 'InputNumber',
    required: true,
    defaultValue: 100,
    componentProps: {
      min: 1,
    },
    colProps: { span: 10 },
  },
  {
    field: 'pid',
    label: t('view.system.org.label.parent'),
    component: 'TreeSelect',
    defaultValue: 0,
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    colProps: { span: 24 },
  },
  {
    label: t('common.remark'),
    field: 'remark',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];
