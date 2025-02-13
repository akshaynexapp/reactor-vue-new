/*
 * @Description  :
 * @Date         : 2021-08-05 11:02:20
 * @LastEditors  : Hu
 * @LastEditTime : 2021-08-06 17:45:36
 * @FilePath     : \reactor-vue\src\views\system\account\setting\data.ts
 */
import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: t('view.system.setting.baseSetting'),
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: t('view.system.setting.secureSetting'),
    component: 'SecureSetting',
  },
  // {
  //   key: '3',
  //   name: '账号绑定',
  //   component: 'AccountBind',
  // },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('view.system.account.label.name'),
    component: 'Input',
    required: true,
    colProps: { span: 20 },
  },
  {
    field: 'sex',
    label: t('view.system.account.label.sex'),
    component: 'Select',
    required: true,
    colProps: { span: 20 },
    componentProps: {
      options: [
        {
          label: t('view.system.account.label.sex-0'),
          value: 1,
          key: '1',
        },
        {
          label: t('view.system.account.label.sex-1'),
          value: 2,
          key: '2',
        },
      ],
    },
  },
  {
    field: 'birthday',
    label: t('view.system.account.label.birthday'),
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      mode: 'date',
    },
    colProps: { span: 20 },
  },
  {
    label: t('view.system.account.label.phone'),
    field: 'phone',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    label: t('view.system.account.label.email'),
    field: 'email',
    component: 'Input',
    colProps: { span: 20 },
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];
