<!--
 * @Description  : 设备Card
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors: Hulw
 * @LastEditTime: 2024-03-28 00:28:13
 * @FilePath: \reactor-vue\src\views\dashboard\summary\AlertCard.vue
-->
<template>
  <Card
    size="small"
    :loading="$attrs.loading"
    :title="alertCard.title"
    class="md:w-1/4 w-full !md:mt-0 !mt-4 !md:mr-4"
    :canExpan="false"
  >
    <template #extra>
      <Tag :color="alertCard.color">{{ alertCard.action }}</Tag>
    </template>

    <div class="flex items-center justify-end px-2 py-2">
      <!-- <Icon :icon="icon" :color="color" :size="60" /> -->
      <img src="./alarm.png" alt="" srcset="" />
      <div class="justify-start px-4">
        <CountTo :startVal="0" :endVal="data?.todayCount" class="text-2xl" />
        <CountTo prefix="/" :startVal="0" :endVal="data?.totalCount" class="text-2xl" />
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, ref } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';
  import { getAlarmCard } from '/@/api/main/dashboardManage';
  import { alertCard } from './data';

  const data = ref<any>({ todayCount: 0, totalCount: 0 });
  const getAlarmCardData = (params: any) => {
    getAlarmCard(params).then((res) => {
      if (!res) {
        data.value = { todayCount: 0, totalCount: 0 };
        return;
      }
      const todayCount = Number(res['todayCount']) || 0;
      const totalCount = Number(res['totalCount']) || 0;
      data.value = { todayCount, totalCount };
    });
  };
  defineExpose({ loadData: getAlarmCardData });
</script>
