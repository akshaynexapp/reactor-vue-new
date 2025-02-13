/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-03-07 14:44:36
 * @FilePath     : \reactor-vue\src\views\alarm\template\alarmTemplate.data.ts
 */
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'alarmCode',
    component: 'Input',
    label: 'alarmCode',
    show: false,
  },
  {
    field: 'title',
    component: 'Input',
    label: t('view.main.alarm.template.label.title'),
    colProps: { span: 24 },
    rules: [{ required: true }],
  },
  {
    field: 'content',
    component: 'Input',
    label: t('view.main.alarm.template.label.content'),
    defaultValue: '{}',
    rules: [{ required: true }],
    colProps: { span: 24 },
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        showImageUpload: false,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
