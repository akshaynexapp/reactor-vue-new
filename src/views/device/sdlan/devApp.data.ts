/*
 * @Description  :
 * @Date         : 2022-06-28 14:53:55
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-06 20:29:06
 * @FilePath     : \reactor-vue\src\views\device\sdlan\devApp.data.ts
 */
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
    colProps: { span: 12 },
  },
  {
    field: 'devSn',
    label: t('view.main.sdlan.modal.devSn'),
    component: 'Input',
    show: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'protocol',
    label: t('view.main.sdlan.modal.protocol'),
    component: 'RadioButtonGroup',
    defaultValue: 'http',
    componentProps: {
      options: [
        { label: 'HTTP', value: 'http' },
        { label: 'SSH', value: 'ssh' },
        { label: 'TELNET', value: 'telnet' },
        // { label: 'other', value: 'other' },
      ],
    },
    required: true,
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    component: 'Input',
    label: t('view.main.sdlan.modal.name'),
    required: true,
  },
  {
    field: 'ip',
    label: t('view.main.sdlan.modal.ip'),
    helpMessage: t('view.main.sdlan.modal.ip-tooltip'),
    component: 'Input',
    componentProps: {
      placeholder: '127.0.0.1',
    },
    required: true,
  },
  {
    field: 'port',
    label: t('view.main.sdlan.modal.port'),
    helpMessage: t('view.main.sdlan.modal.port-tooltip'),
    component: 'InputNumber',
    componentProps: {
      placeholder: '80',
      min: 1,
      max: 65535,
    },
    required: true,
  },
  {
    field: 'target',
    label: t('view.main.sdlan.modal.target'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    required: true,
    componentProps: {
      options: [
        { label: t('view.main.sdlan.option.target-0'), value: '0' },
        { label: t('view.main.sdlan.option.target-1'), value: '1' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
];
