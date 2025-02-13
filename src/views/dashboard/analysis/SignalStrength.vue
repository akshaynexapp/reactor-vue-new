<!--
 * @Description  : 
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:52:46
 * @FilePath     : \reactor_web_3.0\src\views\dashboard\analysis\SignalStrength.vue
-->
<template>
  <Card :title="t('view.main.dashboard.signalStrength.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getSignalStrength } from '/@/api/main/dashboardManage';

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
  const getSignalStrengthData = async (params: any) => {
    let res: Recordable<any>[] = await getSignalStrength(params);
    let chartData = [0, 0, 0, 0, 0];
    if (res) {
      res.forEach((item) => {
        chartData[item['csq_level']] = item['cnt'];
      });
    }
    setOptions({
      tooltip: {},
      radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: [
          {
            name: t('common.worst'),
            min: 0,
            color: '#F56C6C',
          },
          {
            name: t('common.bad'),
            min: 0,
            color: '#EBB563',
          },
          {
            name: t('common.normal'),
            min: 0,
            color: '#909399',
          },
          {
            name: t('common.good'),
            min: 0,
            color: '#85CE61',
          },
          {
            name: t('common.best'),
            min: 0,
            color: '#409EFF',
          },
        ],
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          itemStyle: {
            color: '#ff8c00',
          },
          tooltip: {
            textStyle: {
              color: '#33a1c9',
            },
          },
          areaStyle: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          data: [
            {
              value: chartData,
              name: t('view.main.dashboard.signalStrength.title'),
            },
          ],
        },
      ],
    });
  };
  defineExpose({ loadData: getSignalStrengthData });
</script>
