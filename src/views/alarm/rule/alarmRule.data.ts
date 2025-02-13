/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-03-07 16:04:36
 * @FilePath     : \reactor-vue\src\views\alarm\rule\alarmRule.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { alarmRuleStart, alarmRuleStop } from '/@/api/main/alarmManage';
import { getOrgTree } from '/@/api/system/orgManage';
import { useI18n } from '/@/hooks/web/useI18n';
import { usePermission } from '/@/hooks/web/usePermission';
import { getPopupContainer } from '/@/utils';

const { t } = useI18n();
const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: t('view.main.alarm.rule.label.name'),
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('view.main.alarm.rule.label.alarmRange'),
    dataIndex: 'alarmRangeName',
    width: 180,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.enabled'),
        unCheckedChildren: t('common.disabled'),
        disabled: !hasPermission(['alarmRule:start', 'alarmRule:stop']),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          if (checked) {
            alarmRuleStart({ id: record.id })
              .then(() => {
                record.status = 1;
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          } else {
            alarmRuleStop({ id: record.id })
              .then(() => {
                record.status = 0;
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
    title: t('common.remark'),
    dataIndex: 'remark',
    width: 180,
  },
  {
    title: t('common.updateUser'),
    dataIndex: 'updateUsername',
    width: 100,
  },
  {
    title: t('common.updateTime'),
    dataIndex: 'updateTime',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('view.main.alarm.rule.label.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: t('common.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('common.enabled'), value: 1 },
        { label: t('common.disabled'), value: 2 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const basicFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    component: 'Input',
    label: t('view.main.alarm.rule.label.name'),
    colProps: { span: 4 },
    required: true,
  },
  {
    field: 'alarmRange',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgTree,
      resultField: 'result',
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'value',
      },
      getPopupContainer: getPopupContainer,
    },
    label: t('view.main.alarm.rule.label.alarmRange'),
    colProps: { span: 6, offset: 1 },
    required: true,
  },
  {
    label: t('common.remark'),
    field: 'remark',
    component: 'Input',
    colProps: { span: 6, offset: 1 },
  },
];

export const conditionFormSchema: FormSchema[] = [
  {
    field: 'id_0',
    component: 'Input',
    label: '',
    colProps: {
      span: 4,
    },
    show: false,
  },
  {
    field: 'alarmCode_0',
    component: 'Select',
    label: '',
    colProps: {
      span: 4,
    },
  },
  {
    field: 'alarmCondition_0',
    component: 'Select',
    defaultValue: '=',
    componentProps: {
      placeholder: t('view.main.alarm.rule.placeholder-condition'),
      options: [
        {
          label: '>',
          value: '>',
          key: '0',
        },
        {
          label: '=',
          value: '=',
          key: '1',
        },
        {
          label: '<',
          value: '<',
          key: '2',
        },
      ],
    },
    label: '',
    colProps: {
      span: 4,
      offset: 1,
    },
  },
  {
    field: 'alarmThreshold_0',
    component: 'Input',
    label: '',
    defaultValue: 1,
    componentProps: {
      placeholder: t('view.main.alarm.rule.placeholder-threshold'),
    },
    colProps: {
      span: 4,
      offset: 1,
    },
  },
  {
    field: '0',
    component: 'Input',
    label: '',
    colProps: {
      span: 10,
    },
    slot: 'add',
  },
];

/**
 * 根据告警编码获取单位
 * @param alarmCode 告警编码
 * @returns 单位
 */
export const getUnitByAlarmCode = (alarmCode: String) => {
  if ('flowDay' === alarmCode) return 'GB';
  if ('flowMonth' === alarmCode) return 'GB';
  if ('onlineRate' === alarmCode) return '%';
  if ('positionOffset' === alarmCode) return 'Meter';
  if ('signal' === alarmCode) return 'dBm';
  return 'Time';
};

export const noticeFormSchema: FormSchema[] = [
  {
    field: 'alarmCycle',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 23,
    },
    defaultValue: 1,
    label: t('view.main.alarm.rule.label.alarmCycle'),
    required: true,
    colProps: {
      span: 4,
    },
  },
  {
    field: 'recipient',
    component: 'Input',
    colProps: {
      span: 16,
      offset: 1,
    },
    label: t('view.main.alarm.rule.label.recipient'),
    required: true,
  },
];
