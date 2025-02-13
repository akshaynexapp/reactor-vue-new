<template>
  <Card hoverable class="inner">
    <div class="flex flex-direction jusitify-center align-center">
      <CountTo :startVal="0" :endVal="cardData?.value" class="value" />
      <Tooltip placement="top" :title="cardData.label">
        <!-- <template slot="title">
          <span>{{ cardData.label }}</span>
        </template> -->
        <div class="title">{{ cardData.label }}</div>
      </Tooltip>
    </div>
    <img class="bg" :src="cardData.icon" :alt="cardData.label" />
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { Card, Tooltip } from 'ant-design-vue';
import { CountTo } from '/@/components/CountTo/index';
export default defineComponent({
  name: 'CardItem',
  inheritAttrs: false,
  components: {
    Card,
    CountTo,
    Tooltip,
  },
  props: ['data'],
  setup(props, ctx) {
    const { t } = useI18n();
    const { data } = props;
    const cardData = reactive(data);

    return {
      t,
      cardData,
    };
  },
});
</script>

<style lang="less" scoped>
.inner {
  position: relative;
  height: 130px;
  .bg {
    // width: 80px;
    // height: 80px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.3;
  }
  .value {
    font-weight: 700;
    font-size: 35px;
    color: #ff4500;
  }
  .title {
    font-size: 13px;
    color: #aaa;
  }
}
.inner.ant-card {
  height: inherit;
  :deep(.ant-card-body) {
    padding: 24px 10px;
  }
}
</style>
