<!--
 * @Description  : 设备Card
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors: Hulw
 * @LastEditTime: 2024-03-28 00:23:26
 * @FilePath: \reactor-vue\src\views\dashboard\summary\TaskCard.vue
-->
<template>
  <Card
    size="small"
    :loading="$attrs.loading"
    :title="taskCard.title"
    class="md:w-1/4 w-full !md:mt-0 !mt-4"
    :canExpan="false"
  >
    <template #extra>
      <Tag :color="taskCard.color">{{ taskCard.action }}</Tag>
    </template>

    <div class="flex items-center justify-end px-2 py-2">
      <!-- <Icon :icon="icon" :color="color" :size="60" /> -->
      <img src="./task.png" alt="" srcset="" />
      <div class="justify-start px-4">
        <CountTo :startVal="0" :endVal="data.start" class="text-2xl" />
        <CountTo prefix="/" :startVal="0" :endVal="data.success" class="text-2xl" />
        <CountTo prefix="/" :startVal="0" :endVal="data.fail" class="text-2xl" />
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, ref } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';
  import { getTaskCard } from '/@/api/main/dashboardManage';

  import { taskCard } from './data';

  const data = ref<any>({ start: 0, success: 0, fail: 0 });
  const getTaskCardData = (params: any) => {
    getTaskCard(params).then((res) => {
      if (!res) {
        data.value = { start: 0, success: 0, fail: 0 };
        return;
      }
      const start = Number(res['1']) || 0;
      const success = Number(res['2']) || 0;
      const fail = Number(res['3']) || 0;
      data.value = { start, success, fail };
    });
  };

  defineExpose({ loadData: getTaskCardData });
</script>
