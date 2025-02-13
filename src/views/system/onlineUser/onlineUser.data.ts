/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 16:21:36
 * @FilePath     : \reactor-vue\src\views\system\onlineUser\onlineUser.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.onlineUser.label.account'),
    dataIndex: 'account',
    width: 100,
  },
  {
    title: t('view.system.onlineUser.label.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('view.system.onlineUser.label.lastLoginIp'),
    dataIndex: 'lastLoginIp',
    width: 100,
  },
  {
    title: t('view.system.onlineUser.label.lastLoginBrowser'),
    dataIndex: 'lastLoginBrowser',
    width: 120,
  },
  {
    title: t('view.system.onlineUser.label.lastLoginOs'),
    dataIndex: 'lastLoginOs',
    width: 200,
  },
  {
    title: t('view.system.onlineUser.label.lastLoginTime'),
    dataIndex: 'lastLoginTime',
    width: 150,
  },
];
