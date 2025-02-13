<!--
 * @Description  : 
 * @Date         : 2022-03-31 11:40:05
 * @LastEditors  : Hu
 * @LastEditTime : 2022-04-05 21:27:34
 * @FilePath     : \reactor_web_3.0\src\views\device\GIS\DeviceDescription.vue
-->
<template>
  <div id="contet">
    <h4>{{ deviceInfo.devSn }}</h4>
    <div>
      <span>公司:</span> <span>{{ deviceInfo.title }}公司</span>
    </div>
    <div>
      <span>时间:</span> <span class="mr-5">{{ deviceInfo.updataTime }}</span> <span>速度:</span>
      <span>{{ deviceInfo.speed }}公里/时(西)</span>
    </div>
    <div>
      <span>里程:</span> <span class="mr-5">{{ deviceInfo.mileage }}公里</span>
      <span>今日里程:</span>
      <span>{{ deviceInfo.todayMileage }}公里</span>
    </div>
    <div>
      <span>设备号:</span> <span>{{ deviceInfo.devSn }}(在线)</span>
    </div>
    <div>
      <span>设备序列号:</span> <span>{{ deviceInfo.devSerialNo }}</span>
    </div>
    <div>
      <span>地址:</span> <span>{{ deviceInfo.address }}</span>
    </div>
    <div> <span>状态:</span> <span>在线,4G,ACC关闭,停车( 3时14分22秒),IO状态位:</span> </div>
    <div class="mb-5"> <span>休眠状态卫星数:</span> <span>15，网络信号优</span> </div>
    <div>
      <img
        @click="handleEvent('start_playback')"
        style="width: 30px; height: 30px"
        src="/src/assets/images/start_playback.png"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    name: 'DeviceDescription',
    components: {},
    props: {
      deviceInfo: {
        type: Object,
      },
    },
    emits: ['event'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const handleEvent = (event) => {
        emit('event', {
          name: event,
        });
      };
      return {
        t,
        handleEvent,
      };
    },
  });
</script>
