/*
 * @Description  :
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Hu
 * @LastEditTime : 2021-07-13 06:15:07
 * @FilePath     : \reactor-vue\src\views\dashboard\summary\data.ts
 */

import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export interface CardItem {
  icon: string;
  title: string;
  color: string;
  action: string;
}

export const deviceCard: CardItem = {
  title: t('view.main.dashboard.deviceCard.title'),
  icon: 'ic:baseline-router',
  color: 'green',
  action: t('view.main.dashboard.deviceCard.action'),
};

export const netCard: CardItem = {
  title: t('view.main.dashboard.netCard.title'),
  icon: 'mdi:web',
  color: 'blue',
  action: t('view.main.dashboard.netCard.action'),
};

export const alertCard: CardItem = {
  title: t('view.main.dashboard.alertCard.title'),
  icon: 'fluent:alert-urgent-16-regular',
  color: 'orange',
  action: t('view.main.dashboard.alertCard.action'),
};

export const taskCard: CardItem = {
  title: t('view.main.dashboard.taskCard.title'),
  icon: 'bx:bx-task',
  color: 'purple',
  action: t('view.main.dashboard.taskCard.action'),
};
