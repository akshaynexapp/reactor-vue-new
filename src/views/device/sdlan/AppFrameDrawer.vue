<!--
 * @Description  : 远程GUI页面
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-04-24 11:03:55
 * @FilePath     : \reactor_web_3.0\src\views\device\sdlan\AppFrameDrawer.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    defaultFullscreen
    :canFullscreen="false"
    :footer="null"
    @register="registerModal"
    :title="title"
  >
    <FramePage :frameSrc="frameSrc" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import FramePage from '/@/views/base/iframe/index.vue';

  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AppFrameDrawer',
    components: { BasicModal, FramePage },
    emits: ['success', 'register'],
    setup() {
      const { t } = useI18n();
      const frameSrc = ref<string>('');
      const title = ref<string>('');
      const [registerModal] = useModalInner(async (data) => {
        frameSrc.value = data.frameSrc;
        title.value = data.title;
      });
      return {
        registerModal,
        t,
        frameSrc,
        title,
      };
    },
  });
</script>
