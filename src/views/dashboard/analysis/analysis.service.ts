/*
 * @Description  :
 * @Date         : 2022-06-28 14:53:55
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-11 18:30:50
 */

/**
 * 获取信号图标
 * @param record
 * @returns
 */
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
export function getSignalStrengthLeave(csq: number) {
  if (csq === undefined) throw new Error('Missing mandatory parameters【 csq 】');
  if (csq >= 0 && csq <= 6) {
    return {
      key: 5,
      icon: 'signal_1|svg',
      label: t('common.best'),
    };
  } else if (csq > 6 && csq <= 12) {
    return {
      key: 4,
      icon: 'signal_2|svg',
      label: t('common.good'),
    };
  } else if (csq > 12 && csq <= 18) {
    return {
      key: 3,
      icon: 'signal_3|svg',
      label: t('common.normal'),
    };
  } else if (csq > 18 && csq <= 24) {
    return {
      key: 2,
      icon: 'signal_4|svg',
      label: t('common.bad'),
    };
  } else if (csq > 24 && csq <= 31) {
    return {
      key: 1,
      icon: 'signal_5|svg',
      label: t('common.worst'),
    };
  } else {
    throw new Error('Parameter range error 【 csq 】');
  }
}
