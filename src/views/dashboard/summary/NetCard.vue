<!--
 * @Description  : 网络Card
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors: Hulw
 * @LastEditTime: 2024-03-28 00:21:06
 * @FilePath: \reactor-vue\src\views\dashboard\summary\NetCard.vue
-->
<template>
  <Card
    size="small"
    :loading="$attrs.loading"
    :title="netCard.title"
    class="md:w-1/4 w-full !md:mt-0 !mt-4 !md:mr-4"
    :canExpan="false"
  >
    <template #extra>
      <Tag :color="netCard.color">{{ netCard.action }}</Tag>
    </template>

    <div class="flex items-center justify-end px-2 py-2">
      <!-- <Icon :icon="icon" :color="color" :size="60" /> -->
      <img src="./other.png" alt="" srcset="" />
      <div class="justify-start px-4">
        <CountTo :startVal="0" :endVal="data.fiveG" class="text-2xl" />
        <CountTo prefix="/" :startVal="0" :endVal="data.fourG" class="text-2xl" />
        <CountTo prefix="/" :startVal="0" :endVal="data.other" class="text-2xl" />
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, ref } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';
  import { getNetTypeCard } from '/@/api/main/dashboardManage';

  import { netCard } from './data';

  const data = ref<any>({ fiveG: 0, fourG: 0, other: 0 });
  const getNetTypeCardData = (params: any) => {
    getNetTypeCard(params).then((res) => {
      if (!res) {
        data.value = { fiveG: 0, fourG: 0, other: 0 };
        return;
      }
      const fiveG = Number(res['5G']) || 0;
      const fourG = Number(res['4G']) || 0;
      const threeG = Number(res['3G']) || 0;
      const twoG = Number(res['2G']) || 0;
      const wan = Number(res['WAN']) || 0;
      const wlan = Number(res['WLAN']) || 0;
      const nullValue = Number(res['null']) || 0;
      const other = threeG + twoG + wan + wlan + nullValue;
      data.value = { fiveG, fourG, other };
    });
  };
  defineExpose({ loadData: getNetTypeCardData });
</script>
