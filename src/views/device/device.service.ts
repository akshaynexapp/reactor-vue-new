/*
 * @Description  :
 * @Date         : 2021-06-25 11:26:59
 * @LastEditors  : Hu
 * @LastEditTime : 2022-04-27 15:53:59
 * @FilePath     : \reactor_web_3.0\src\views\device\device.service.ts
 */

/**
 * 获取信号图标
 * @param record
 * @returns
 */
export function getSignalIcon(record) {
  const { online, simType, sim1, sim2 } = record;
  // SIM卡上网
  if (sim1?.status == 'connected' || sim2?.status == 'connected') {
    const csq = record[simType === undefined ? 'sim1' : simType]?.csq;
    if (!online || !csq) return 'signal_0|svg';
    if ((csq > 0 && csq <= 6) || csq < -97) {
      return 'signal_1|svg';
    } else if ((csq > 6 && csq <= 12) || (csq > -90 && csq < 0)) {
      return 'signal_2|svg';
    } else if ((csq > 12 && csq <= 18) || (csq > -83 && csq < 0)) {
      return 'signal_3|svg';
    } else if ((csq > 18 && csq <= 24) || (csq > -75 && csq < 0)) {
      return 'signal_4|svg';
    } else if (csq > 24 || (csq > -66 && csq < 0)) {
      return 'signal_5|svg';
    }
  }
  // 其他上网方式
  if (online) {
    return 'wan_online|svg';
  }
  // 默认返回
  return 'wan_offline|svg';
}
