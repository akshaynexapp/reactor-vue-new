import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

import { Fflow } from '/@/utils/reactorUtil';

const { t } = useI18n();
// 设备在线率Top
export const deviceOnlineRateTOPTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.deviceOnlineRate.device'),
    dataIndex: 'devSn',
    width: 160,
  },
  {
    title: t('view.main.topRank.deviceOnlineRate.onlineRate'),
    dataIndex: 'onlineRate',
    width: 80,
    customRender: ({ record }) => {
      return !!record.onlineRate ? record.onlineRate * 100 + '%' : '';
    },
  },
];
// 分组在线率Top
export const groupOnlineRateTOPTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.groupOnlineRate.group'),
    dataIndex: 'orgName',
    width: 160,
  },
  {
    title: t('view.main.topRank.deviceOnlineRate.onlineRate'),
    dataIndex: 'onlineRate',
    width: 80,
    customRender: ({ record }) => {
      return record?.onlineRate == 0
        ? '0%'
        : !!record.onlineRate
        ? record.onlineRate * 100 + '%'
        : '';
    },
  },
];
// 信号强度Top
export const signalStrengthTOPTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.deviceTraffic.device'),
    dataIndex: 'devSn',
    width: 160,
  },
  {
    title: t('view.main.topRank.signalStrength.csq'),
    dataIndex: 'csq',
    width: 80,
  },
];

/**
 * 设备流量TOP
 */
export const deviceTrafficTOPTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.deviceTraffic.device'),
    dataIndex: 'devSn',
    width: 150,
  },
  {
    title: t('view.main.topRank.deviceTraffic.traffic'),
    dataIndex: 'flowTotal',
    width: 90,
    customRender: ({ record }) => {
      return record?.flowTotal == 0 ? '0KB' : !!record.flowTotal ? Fflow(record.flowTotal) : '';
    },
  },
];

/**
 * 分组流量TOP
 */
export const packetTrafficTOPTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.packetTrafficTOP.group'),
    dataIndex: 'orgName',
    width: 150,
  },
  {
    title: t('view.main.topRank.packetTrafficTOP.flow'),
    dataIndex: 'cntTotal',
    width: 85,
    customRender: ({ record }) => {
      return record?.cntTotal == 0 ? '0KB' : !!record.cntTotal ? Fflow(record.cntTotal) : '';
    },
  },
];
// 设备版本Top
export const VersionTopTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.versionTop.version'),
    dataIndex: 'softVer',
    width: 160,
  },
  {
    title: t('view.main.topRank.versionTop.total'),
    dataIndex: 'cnt',
    width: 80,
  },
];

// 网络类型Top
export const networkTypeTableColumns: BasicColumn[] = [
  {
    title: t('view.main.topRank.networkType.networkType'),
    dataIndex: 'netType',
    width: 150,
  },
  {
    title: t('view.main.topRank.networkType.total'),
    dataIndex: 'cnt',
    width: 85,
  },
];
