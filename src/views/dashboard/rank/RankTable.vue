<template>
  <a-space align="start">
    <BasicTable @register="versionTopRegisterTable" :searchInfo="searchInfo" />
    <BasicTable @register="signalStrengthRegisterTable" :searchInfo="searchInfo" />
    <BasicTable @register="deviceTrafficRegisterTable" :searchInfo="searchInfo" />
  </a-space>
  <a-space align="start">
    <BasicTable @register="groupOnlineRateRegisterTable" :searchInfo="searchInfo" />
    <BasicTable @register="packetTrafficRegisterTable" :searchInfo="searchInfo" />
    <BasicTable @register="networkTypeTopRegisterTable" :searchInfo="searchInfo" />
  </a-space>
</template>
<script lang="ts" setup name="RankTable">
  import { defineProps, defineExpose, nextTick } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    packetTrafficTOPTableColumns,
    // deviceOnlineRateTOPTableColumns,
    groupOnlineRateTOPTableColumns,
    signalStrengthTOPTableColumns,
    deviceTrafficTOPTableColumns,
    VersionTopTableColumns,
    networkTypeTableColumns,
  } from './rank.data';
  import { BasicTable, useTable } from '/@/components/Table';
  import {
    getDevDayFlowTopList,
    getGroupDayFlowTopList,
    getWorstSignalTopList,
    getSoftVersionTopList,
    getNetTypeTopList,
    getGroupOnlineRateTopList,
    // getDevOnlineRateTopList,
  } from '/@/api/main/dashboardManage';

  defineProps({
    searchInfo: { type: Object, default: null },
  });
  const { t } = useI18n();

  const handleAfterFetch = (data) => {
    if (!data) {
      data = [];
    }
    data.splice(data?.length, 1, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});
    return data.slice(0, 10);
  };

  // const [deviceOnlineRateRegisterTable, { reload: deviceOnlineRateReload }] = useTable({
  //   title: t('view.main.topRank.deviceOnlineRate.title'),
  //   api: getDevOnlineRateTopList,
  //   columns: deviceOnlineRateTOPTableColumns,
  //   bordered: true,
  //   showIndexColumn: true,
  //   striped: true,
  //   pagination: false,
  //   size: 'small',
  //   canResize: false,
  //   immediate: true,
  //   afterFetch: handleAfterFetch,
  // });

  const [groupOnlineRateRegisterTable, { reload: groupOnlineRateReload }] = useTable({
    title: t('view.main.topRank.groupOnlineRate.title'),
    api: getGroupOnlineRateTopList,
    columns: groupOnlineRateTOPTableColumns,
    bordered: true,
    showIndexColumn: true,
    striped: true,
    pagination: false,
    size: 'small',
    canResize: false,
    immediate: true,
    afterFetch: handleAfterFetch,
  });

  const [signalStrengthRegisterTable, { reload: signalStrengthReload }] = useTable({
    title: t('view.main.topRank.signalStrength.title'),
    api: getWorstSignalTopList,
    columns: signalStrengthTOPTableColumns,
    bordered: true,
    showIndexColumn: true,
    striped: true,
    pagination: false,
    size: 'small',
    canResize: false,
    immediate: true,
    afterFetch: handleAfterFetch,
  });

  const [deviceTrafficRegisterTable, { reload: deviceTrafficReload }] = useTable({
    title: t('view.main.topRank.deviceTraffic.title'),
    api: getDevDayFlowTopList,
    columns: deviceTrafficTOPTableColumns,
    bordered: true,
    showIndexColumn: true,
    striped: true,
    pagination: false,
    size: 'small',
    canResize: false,
    immediate: true,
    afterFetch: handleAfterFetch,
  });

  const [packetTrafficRegisterTable, { reload: packetTrafficReload }] = useTable({
    title: t('view.main.topRank.packetTrafficTOP.title'),
    api: getGroupDayFlowTopList,
    columns: packetTrafficTOPTableColumns,
    bordered: true,
    showIndexColumn: true,
    striped: true,
    pagination: false,
    size: 'small',
    canResize: false,
    immediate: true,
    afterFetch: handleAfterFetch,
  });

  const [versionTopRegisterTable, { reload: versionTopReload }] = useTable({
    title: t('view.main.topRank.versionTop.title'),
    api: getSoftVersionTopList,
    columns: VersionTopTableColumns,
    bordered: true,
    showIndexColumn: true,
    striped: true,
    pagination: false,
    size: 'small',
    canResize: false,
    immediate: true,
    afterFetch: handleAfterFetch,
  });

  const [networkTypeTopRegisterTable, { reload: networkTypeTopReload }] = useTable({
    title: t('view.main.topRank.networkType.title'),
    api: getNetTypeTopList,
    columns: networkTypeTableColumns,
    bordered: true,
    showIndexColumn: true,
    striped: true,
    pagination: false,
    size: 'small',
    canResize: false,
    immediate: true,
    afterFetch: handleAfterFetch,
  });

  function reloadAll() {
    nextTick(() => {
      deviceTrafficReload();
      packetTrafficReload();
      signalStrengthReload();
      versionTopReload();
      networkTypeTopReload();
      groupOnlineRateReload();
      // deviceOnlineRateReload();
    });
  }

  // 暴露方法
  defineExpose({ reloadAll });
</script>
