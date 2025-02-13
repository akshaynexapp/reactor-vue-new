<!--
 * @Description  : 
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:45:22
 * @FilePath     : \reactor-vue\src\views\dashboard\analysis\OnlineTrend.vue
-->
<template>
  <Card :title="t('view.main.dashboard.onlineTrend.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getOnlineTrend } from '/@/api/main/dashboardManage';

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

  const drawBarChart = (params) => {
    const { date, onlineData, totalData } = params;
    setOptions({
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        data: [
          t('view.main.dashboard.onlineTrend.legend_1'),
          t('view.main.dashboard.onlineTrend.legend_2'),
        ],
      },
      xAxis: {
        type: 'category',
        data: date,
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: t('view.main.dashboard.onlineTrend.legend_1'),
          type: 'bar',
          color: 'green',
          data: onlineData,
        },
        {
          name: t('view.main.dashboard.onlineTrend.legend_2'),
          type: 'bar',
          color: '#15ACE6',
          data: totalData,
        },
      ],
    });
  };
  const getOnlineTrendData = (params: any) => {
    getOnlineTrend(params).then((res) => {
      const { date, online, total } = res;
      drawBarChart({ date: date, onlineData: online, totalData: total });
    });
  };
  defineExpose({ loadData: getOnlineTrendData });
</script>
