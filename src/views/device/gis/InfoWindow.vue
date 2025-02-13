<template>
  <div class="m-4">
    <p> 天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门... </p>
    <img src="/src/assets/images/tianAnMen.jpg" width="40" height="40" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    name: 'InfoWindow',
    components: {},
    setup() {
      const { t } = useI18n();
      return {
        t,
      };
    },
  });
</script>
