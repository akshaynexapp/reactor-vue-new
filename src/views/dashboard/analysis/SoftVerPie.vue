<!--
 * @Description  : 
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:40:13
 * @FilePath     : \reactor-vue\src\views\dashboard\analysis\SoftVerPie.vue
-->
<template>
  <Card :title="t('view.main.dashboard.softVer.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getSoftVerPie } from '/@/api/main/dashboardManage';

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
  const getSoftVerPieData = (params: any) => {
    getSoftVerPie(params).then((res) => {
      setOptions({
        tooltip: {
          trigger: 'item',
          extraCssText: 'z-index: 999',
        },
        series: [
          {
            name: t('view.main.device.label.softVer'),
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: res,
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
    });
  };
  defineExpose({ loadData: getSoftVerPieData });
</script>
