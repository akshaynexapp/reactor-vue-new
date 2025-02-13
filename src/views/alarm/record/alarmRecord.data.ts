/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-02-08 01:01:50
 * @FilePath     : \reactor-vue\src\views\alarm\record\alarmRecord.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { useI18n } from '/@/hooks/web/useI18n';
import { getPopupContainer } from '/@/utils';
import { alarmRuleList } from '/@/api/main/alarmManage';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.main.alarm.rule.label.name'),
    dataIndex: 'ruleName',
    width: 200,
  },
  {
    title: t('view.main.alarm.record.label.alarmKey'),
    dataIndex: 'alarmKey',
    width: 200,
  },
  {
    title: t('view.main.alarm.record.label.alarmObject'),
    dataIndex: 'alarmObject',
    width: 200,
  },
  {
    title: t('view.main.alarm.record.label.alarmValue'),
    dataIndex: 'alarmValue',
    width: 150,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return ~~record.status == 1
        ? t('view.main.alarm.record.label.status-1')
        : t('view.main.alarm.record.label.status-0');
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ruleId',
    label: t('view.main.alarm.rule.label.name'),
    component: 'ApiSelect',
    componentProps: {
      api: alarmRuleList,
      labelField: 'name',
      valueField: 'id',
      getPopupContainer: getPopupContainer,
    },
    show: false,
    colProps: { span: 8 },
  },
  {
    field: 'dates',
    label: t('common.createTime'),
    component: 'RangePicker',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: t('common.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('view.main.alarm.record.label.status-0'), value: 0 },
        { label: t('view.main.alarm.record.label.status-1'), value: 1 },
      ],
    },
    colProps: { span: 6 },
  },
];
