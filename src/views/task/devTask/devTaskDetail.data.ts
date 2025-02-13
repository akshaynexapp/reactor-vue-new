/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-03 13:38:46
 * @FilePath     : \reactor-vue\src\views\task\devTask\devTaskDetail.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export enum TaskStatus {
  CREATE = 0,
  START = 1,
  SUCCESS = 2,
  FAILURE = 3,
}

export const columns: BasicColumn[] = [
  {
    title: t('view.main.common.label.devSn'),
    dataIndex: 'devSn',
    width: 180,
  },
  {
    title: t('view.main.deviceTask.label.fileName'),
    dataIndex: 'fileOriginName',
    width: 250,
  },
  {
    title: t('view.main.deviceTask.label.params'),
    dataIndex: 'content',
    width: 200,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      if (TaskStatus.CREATE === record.status) {
        return h(Tag, { color: 'blue' }, () => t('view.main.deviceTask.option.status-0'));
      }
      if (TaskStatus.START === record.status) {
        return h(Tag, { color: 'blue' }, () => t('view.main.deviceTask.option.status-1'));
      }
      if (TaskStatus.SUCCESS === record.status) {
        return h(Tag, { color: 'green' }, () => t('view.main.deviceTask.option.status-2'));
      }
      if (TaskStatus.FAILURE === record.status) {
        return h(Tag, { color: 'red' }, () => t('view.main.deviceTask.option.status-3'));
      }
    },
  },
  {
    title: t('view.main.deviceTask.label.beginTime'),
    dataIndex: 'beginTime',
    width: 150,
  },
  {
    title: t('view.main.deviceTask.label.finishTime'),
    dataIndex: 'finishTime',
    width: 150,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'devSn',
    label: t('view.main.common.label.devSn'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'fileOriginName',
    label: t('view.main.deviceTask.label.fileName'),
    component: 'Input',
    colProps: { span: 7 },
  },
  {
    field: 'status',
    label: t('common.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('view.main.deviceTask.option.status-0'), value: TaskStatus.CREATE },
        { label: t('view.main.deviceTask.option.status-1'), value: TaskStatus.START },
        { label: t('view.main.deviceTask.option.status-2'), value: TaskStatus.SUCCESS },
        { label: t('view.main.deviceTask.option.status-3'), value: TaskStatus.FAILURE },
      ],
    },
    colProps: { span: 5 },
  },
];
