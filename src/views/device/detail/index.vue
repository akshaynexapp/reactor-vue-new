<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-12 01:55:44
 * @FilePath     : \reactor_web_3.0\src\views\device\detail\index.vue
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    @close="handleClose"
    :destroyOnClose="true"
    :isDetail="true"
    :closable="false"
    :title="t('view.main.device.modal.detail')"
  >
    <!-- 基础信息 -->
    <a-card title="Base Info">
      <BaseInfo :record="record" />
    </a-card>
    <!-- 离线设备不显示sim卡信息，屏蔽credo设备上报china mobile的异常问题 -->
    <div v-if="record?.online">
      <!-- SIM1信息 -->
      <a-card v-if="record?.simType == 'sim1'" title="SIM1 Info" class="!mt-4">
        <SimInfo :record="record?.sim1" />
      </a-card>
      <!-- SIM2信息 -->
      <a-card v-else title="SIM2 Info" class="!mt-4">
        <SimInfo :record="record?.sim2" />
      </a-card>
    </div>
    <div class="flex mt-4">
      <!-- 日流量 -->
      <a-card title="Day Flow" class="!w-1/2 !mr-2">
        <DayFlowChart :params="{ id: record?.id }" />
      </a-card>
      <!-- 月流量 -->
      <a-card title="Month Flow" class="!w-1/2 !ml-2">
        <MonthFlowChart :params="{ id: record?.id }" />
      </a-card>
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import BaseInfo from './BaseInfo.vue';
  import SimInfo from './SimInfo.vue';
  import DayFlowChart from './DayFlowChart.vue';
  import MonthFlowChart from './MonthFlowChart.vue';

  export default defineComponent({
    name: 'DeviceDetailDrawer',
    components: { BasicDrawer, BaseInfo, SimInfo, DayFlowChart, MonthFlowChart },
    emits: ['register', 'close'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const record = ref<any>();

      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        record.value = data.record;
      });
      const handleClose = () => {
        emit('close');
      };
      return {
        registerDrawer,
        t,
        record,
        handleClose,
      };
    },
  });
</script>
