<template>
  <div>
    <Row type="flex" :gutter="{ xs: 4, sm: 6, md: 8, lg: 12 }">
      <Col
        :xs="option.xs"
        :sm="option.sm"
        :md="option.md"
        :lg="option.lg"
        :xl="option.xl"
        :xxl="option.xxl"
        v-for="(item, index) in panelData"
        :key="index"
      >
        <CardItem :data="item"></CardItem>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
  import { ref, unref, defineComponent, computed, onMounted } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Row, Col, Card } from 'ant-design-vue';
  import CardItem from './CardItem.vue';
  export default defineComponent({
    name: 'CardPanel',
    inheritAttrs: false,
    components: {
      Row,
      Col,
      CardItem,
    },
    props: ['data', 'option'],
    setup(props, ctx) {
      const { t } = useI18n();
      const { data } = props;
      const panelData = ref<any[]>(data || []);

      return {
        t,
        panelData,
      };
    },
  });
</script>

<style lang="less" scoped></style>
