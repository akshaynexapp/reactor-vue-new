/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-01-04 13:50:58
 * @FilePath     : \reactor-vue\src\views\log\access\accessLog.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.accessLog.label.name'),
    dataIndex: 'name',
    width: 80,
    defaultHidden: true,
  },
  {
    title: t('view.system.accessLog.label.visType'),
    dataIndex: 'visType',
    width: 100,
    customRender: ({ record }) => {
      const visType = record.visType;
      const text = ~~visType === 1 ? t('common.loginText') : t('common.logoutText');
      return text;
    },
  },
  {
    title: t('view.system.accessLog.label.success'),
    dataIndex: 'success',
    width: 80,
    customRender: ({ record }) => {
      const success = record.success;
      const enable = ~~success === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.yesText') : t('common.noText');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('view.system.accessLog.label.ip'),
    dataIndex: 'ip',
    width: 80,
  },
  {
    title: t('view.system.accessLog.label.browser'),
    dataIndex: 'browser',
    width: 120,
  },
  {
    title: t('view.system.accessLog.label.account'),
    dataIndex: 'account',
    width: 100,
  },
  {
    title: t('view.system.accessLog.label.visTime'),
    dataIndex: 'visTime',
    width: 120,
  },
];
