/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-01 19:21:42
 * @FilePath     : \reactor-vue\src\views\task\devTask\devTask.data.ts
 */
import { FormSchema } from '/@/components/Table';

import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export enum TaskStatus {
  CREATE = 0,
  START = 1,
  SUCCESS = 2,
  FAILURE = 3,
}
export const taskType = [
  t('view.main.deviceTask.option.type-0'),
  t('view.main.deviceTask.option.type-1'),
  t('view.main.deviceTask.option.type-2'),
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchBeginTime',
    label: t('view.main.deviceTask.label.createTime'),
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      mode: 'date',
    },
  },
  {
    field: 'taskType',
    label: t('view.main.deviceTask.label.taskType'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('view.main.deviceTask.option.type-0'), value: '0' },
        { label: t('view.main.deviceTask.option.type-1'), value: '1' },
        { label: t('view.main.deviceTask.option.type-2'), value: '2' },
      ],
    },
    colProps: { span: 8 },
  },
];
