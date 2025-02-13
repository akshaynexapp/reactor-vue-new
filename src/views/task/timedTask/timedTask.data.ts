/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-03 10:31:38
 * @FilePath     : \reactor-vue\src\views\task\timedTask\timedTask.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import {
  sysTimersGetActionClasses,
  sysTimersStart,
  sysTimersStop,
} from '/@/api/system/timedTaskManage';

import { useI18n } from '/@/hooks/web/useI18n';
import { usePermission } from '/@/hooks/web/usePermission';
import { getPopupContainer } from '/@/utils';

const { t } = useI18n();
const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.timedTask.label.timerName'),
    dataIndex: 'timerName',
    width: 200,
  },
  {
    title: t('view.system.timedTask.label.actionClass'),
    dataIndex: 'actionClass',
    width: 300,
  },
  {
    title: t('view.system.timedTask.label.cron'),
    dataIndex: 'cron',
    width: 120,
  },
  {
    title: t('common.status'),
    dataIndex: 'jobStatus',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.jobStatus === 1,
        checkedChildren: t('common.enabled'),
        unCheckedChildren: t('common.disabled'),
        disabled: !hasPermission(['sysTimers:start', 'sysTimers:stop']),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          if (checked) {
            sysTimersStart({ id: record.id })
              .then(() => {
                record.jobStatus = 1;
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          } else {
            sysTimersStop({ id: record.id })
              .then(() => {
                record.jobStatus = 2;
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          }
        },
      });
    },
  },
  {
    title: t('common.updateTime'),
    dataIndex: 'updateTime',
    width: 120,
  },
  {
    title: t('common.remark'),
    dataIndex: 'remark',
    width: 200,
    defaultHidden: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'timerName',
    label: t('view.system.timedTask.label.timerName'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'jobStatus',
    label: t('common.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('common.enabled'), value: 1 },
        { label: t('common.disabled'), value: 2 },
      ],
    },
    colProps: { span: 6 },
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
    field: 'timerName',
    label: t('view.system.timedTask.label.timerName'),
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'actionClass',
    label: t('view.system.timedTask.label.actionClass'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: sysTimersGetActionClasses,
      labelField: 'name',
      valueField: 'id',
      getPopupContainer: getPopupContainer,
    },
    colProps: { span: 24 },
  },
  {
    field: 'cron',
    label: t('view.system.timedTask.label.cron'),
    defaultValue: 100,
    component: 'Input',
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
