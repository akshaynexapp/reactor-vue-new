/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-10-16 23:02:50
 * @FilePath     : \reactor-vue\src\views\system\role\role.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { changeRoleStatus } from '/@/api/system/roleManage';

import { useI18n } from '/@/hooks/web/useI18n';
import { usePermission } from '/@/hooks/web/usePermission';

const { t } = useI18n();
const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.role.label.name'),
    dataIndex: 'name',
    width: 300,
  },
  {
    title: t('common.sort'),
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: t('common.enabled'),
        unCheckedChildren: t('common.disabled'),
        disabled: !hasPermission('sysRole:changeStatus'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 0 : 1;
          changeRoleStatus({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.createUser'),
    dataIndex: 'createUsername',
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
    label: t('view.system.role.label.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: t('common.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('common.enabled'), value: 0 },
        { label: t('common.disabled'), value: 1 },
      ],
    },
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
    label: t('view.system.role.label.name'),
    required: true,
    component: 'Input',
    colProps: { span: 14 },
  },
  {
    field: 'sort',
    label: t('common.sort'),
    defaultValue: 100,
    component: 'InputNumber',
    required: true,
    colProps: { span: 10 },
  },
  {
    label: t('common.remark'),
    field: 'remark',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];

export const roleMenuSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
    colProps: { span: 20 },
  },
];

export const roleDataSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'dataScopeType',
    label: t('view.system.role.label.dataScope.name'),
    component: 'Select',
    defaultValue: 2,
    required: true,
    componentProps: {
      options: [
        { label: t('view.system.role.label.dataScope.option2'), value: 2 },
        { label: t('view.system.role.label.dataScope.option3'), value: 3 },
        { label: 'Custom Groups', value: 5 },
      ],
    },
    colProps: { span: 20 },
  },
  {
    label: '',
    field: 'grantOrgIdList',
    show: ({ values }) => values.dataScopeType === 5,
    component: 'Input',
    slot: 'dataScopeOrgIds',
    colProps: { span: 20 },
  },
];
