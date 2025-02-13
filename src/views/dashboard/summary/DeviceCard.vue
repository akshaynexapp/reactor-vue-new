<!--
 * @Description  : 设备Card
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors: Hulw
 * @LastEditTime: 2024-03-28 00:23:02
 * @FilePath: \reactor-vue\src\views\dashboard\summary\DeviceCard.vue
-->
<template>
  <Card
    size="small"
    :loading="$attrs.loading"
    :title="deviceCard.title"
    class="md:w-1/4 w-full !md:mt-0 !mt-4 !md:mr-4"
    :canExpan="false"
  >
    <template #extra>
      <Tag :color="deviceCard.color">{{ deviceCard.action }}</Tag>
    </template>

    <div class="flex items-center justify-end px-2">
      <!-- <Icon :icon="icon" :color="color" :size="60" /> -->
      <img src="./online.png" alt="" srcset="" />
      <div class="flex-col justify-start px-4 flex-direction align-start">
        <div class="justify-start">
          <CountTo :startVal="0" :endVal="data.online" class="text-xl" />
          <CountTo prefix="/" :startVal="0" :endVal="data.offline" class="text-xl" />
          <CountTo prefix="/" :startVal="0" :endVal="data.total" class="text-xl" />
        </div>
        <span class="justify-start text-sm"
          >{{ t('view.main.dashboard.deviceCard.onlineRate') }}
          <CountTo suffix="%" :startVal="1" :endVal="data.percent"
        /></span>
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, ref } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';
  import { getDeviceCard } from '/@/api/main/dashboardManage';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { deviceCard } from './data';

  const { t } = useI18n();
  const data = ref<any>({ online: 0, offline: 0, total: 0, percent: 0 });
  const getDeviceCardData = (params: any) => {
    getDeviceCard(params).then((res) => {
      console.log('Data', res);
      if (!res) {
        data.value = { online: 0, offline: 0, total: 0, percent: 0 };
        return;
      }
      const online = Number(res?.online) || 0;
      const offline = Number(res?.offline) || 0;
      const total = online + offline;
      const percent = Number(((online / total) * 100).toFixed(2));
      console.log('Percent', percent);
      data.value = { online, offline, total, percent };
    });
  };
  defineExpose({ loadData: getDeviceCardData });
</script>

<style lang="less" scoped>
  .text-sm {
    display: inline-block;
    width: 100%;
    text-align: right;
  }
</style>
