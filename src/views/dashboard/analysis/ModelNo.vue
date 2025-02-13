<!--
 * @Description  : 
 * @Date         : 2022-06-28 14:53:55
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:48:41
-->
<template>
  <Card :title="t('view.main.dashboard.modelNo.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });

  const { t } = useI18n();
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  setOptions({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      itemWidth: 12,
      itemHeight: 12,
      borderRadius: 3,
      data: ['RX100', 'RX200', 'RX400', 'RX500'],
    },
    series: [
      {
        name: t('view.main.device.label.softVer'),
        type: 'pie',
        radius: ['70%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        data: [
          {
            name: 'RX100',
            value: Math.round(Math.random() * 6000),
          },
          {
            name: 'RX200',
            value: Math.round(Math.random() * 6000),
          },
          {
            name: 'RX400',
            value: Math.round(Math.random() * 6000),
          },
          {
            name: 'RX500',
            value: Math.round(Math.random() * 6000),
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
</script>
