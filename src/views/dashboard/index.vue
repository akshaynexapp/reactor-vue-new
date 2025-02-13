<!--
 * @Description  : 
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:51:43
 * @FilePath     : \reactor-vue\src\views\dashboard\index.vue
-->
<template>
  <!-- <PageWrapper dense contentFullHeight fixedHeight contentClass="flex"> -->
  <FoldLayout>
    <template #left>
      <OrgTree class="left-wrap" @select="handleSelect" />
    </template>
    <template #main>
      <div class="p-4">
        <!-- Summary -->
        <div class="flex mb-4">
          <DeviceCard ref="deviceCardRef" @click="handleJumpDeviceDetail" class="enter-y" />
          <NetCard ref="netCardRef" @click="handleJumpDeviceDetail" class="enter-y" />
          <AlertCard ref="alertCardRef" @click="handleJumpAlertDetail" class="enter-y" />
          <TaskCard ref="taskCardRef" @click="handleJumpTaskCard" class="enter-y" />
        </div>
        <!-- analysis -->
        <div class="flex flex-col mt-4 enter-y">
          <a-space>
            <a-range-picker
              style="width: 300px"
              v-model:value="dateMode.value"
              :format="dateMode.format"
              :picker="dateMode.picker"
              :ranges="dateMode.ranges"
              @panel-change="handleRangePickerPanelChange"
              @open-change="handleRangePickerOpenChange"
            />
          </a-space>
          <div class="online-trand mt-2 flex flex-sub align-center">
            <OnlineTrend ref="onlineTrendRef" height="200px" class="w-full" :params="params" />
          </div>
          <div class="mt-2 md:flex enter-y">
            <SignalStrength ref="signalStrengthRef" height="200px" class="w-full md:w-1/3" />
            <TrafficTrend
              ref="trafficTrendRef"
              height="200px"
              class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full"
              :params="params"
            />
            <NetworkType ref="networkTypeRef" height="200px" class="w-full md:w-1/3" />
          </div>

          <div class="mt-2 md:flex enter-y">
            <!-- <DeviceLocation height="200px" class="w-full md:w-1/3" /> -->
            <Firmware ref="firmwareRef" height="200px" class="md:w-1/3 w-full" />
            <!-- <ModeNo ref="modeNoRef" height="200px" class="w-full md:w-1/3 !md:mx-4 !md:my-0 !my-4" /> -->
            <!-- 占位 -->
            <div height="200px" class="w-full md:w-1/3 !md:mx-4 !md:my-0 !my-4"></div>
            <!-- 占位 -->
            <div height="200px" class="w-full md:w-1/3"></div>
          </div>
        </div>
      </div>
    </template>
  </FoldLayout>
  <!-- </PageWrapper> -->
</template>
<script lang="ts" setup>
  import dayjs, { Dayjs } from 'dayjs';
  import { useGo } from '/@/hooks/web/usePage';
  import { reactive, ref, nextTick, unref, onMounted } from 'vue';

  import DeviceCard from './summary/DeviceCard.vue';
  import NetCard from './summary/NetCard.vue';
  import AlertCard from './summary/AlertCard.vue';
  import TaskCard from './summary/TaskCard.vue';

  import OnlineTrend from './analysis/OnlineTrend.vue';

  import SignalStrength from './analysis/SignalStrength.vue';
  import TrafficTrend from './analysis/TrafficTrend.vue';
  import NetworkType from './analysis/NetworkType.vue';

  import Firmware from './analysis/Firmware.vue';
  import ModeNo from './analysis/ModelNo.vue';

  import { FoldLayout } from '/@/components/FoldLayout';
  import OrgTree from './OrgTree.vue';

  defineOptions({ name: 'StatisticsOverview' });

  const deviceCardRef = ref();
  const netCardRef = ref();
  const alertCardRef = ref();
  const taskCardRef = ref();

  const onlineTrendRef = ref();
  const signalStrengthRef = ref();
  const trafficTrendRef = ref();
  const networkTypeRef = ref();
  const firmwareRef = ref();
  const modeNoRef = ref();
  // 查询参数
  const params = ref<{ beginDate: string; endDate: string; orgId: string }>({
    beginDate: dayjs().add(-6, 'days').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    orgId: '',
  });

  console.log(params);
  const dateMode = reactive<{
    type: string;
    picker: string;
    format: string;
    ranges: any;
    value: Dayjs[];
  }>({
    // 日期类型
    type: 'date',
    // RangePicker类型
    picker: 'date',
    // 显示日期
    format: 'YYYY-MM-DD',
    // 预设时间范围
    ranges: {
      'Last 7 Days': [dayjs().add(-6, 'day'), dayjs()],
      'Last 30 Days': [dayjs().add(-29, 'day'), dayjs()],
    },
    // 选择的时间范围,Dayjs类型
    value: [dayjs().add(-6, 'day'), dayjs()],
  });
  const go = useGo();

  // 此方法用于赋值
  const handleRangePickerPanelChange = (val: Dayjs[]) => {
    dateMode.value = val;
  };
  const handleRangePickerOpenChange = async (status: boolean) => {
    // 打开状态直接返回
    if (status || dateMode.value.length !== 2) return;
    await nextTick();
    params.value = {
      beginDate: dateMode.value[0].format(dateMode.format),
      endDate: dateMode.value[1].format(dateMode.format),
      orgId: unref(params).orgId ? unref(params).orgId : '',
    };
    loadData();
  };
  const handleSelect = (orgId = '') => {
    params.value = {
      beginDate: dateMode.value[0].format(dateMode.format),
      endDate: dateMode.value[1].format(dateMode.format),
      orgId: orgId,
    };
    console.log(params.value);
    loadData();
  };

  onMounted(() => {
    loadData();
  });

  const loadData = () => {
    deviceCardRef.value.loadData(params.value);
    netCardRef.value.loadData(params.value);
    alertCardRef.value.loadData(params.value);
    taskCardRef.value.loadData(params.value);

    onlineTrendRef.value.loadData(params.value);
    signalStrengthRef.value.loadData(params.value);
    trafficTrendRef.value.loadData(params.value);
    networkTypeRef.value.loadData(params.value);
    firmwareRef.value.loadData(params.value);
    // modeNoRef.value.loadData(params.value);
  };

  console.log(loadData);
  //关联跳转设备详情页
  const handleJumpDeviceDetail = () => {
    go(`/device/online-devices`);
  };

  const handleJumpAlertDetail = () => {
    go(`/alarm/record`);
  };
  const handleJumpTaskCard = () => {
    go(`/device-task`);
  };
</script>

<style lang="less" scoped></style>
