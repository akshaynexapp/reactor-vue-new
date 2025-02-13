<template>
  <div class="fold-left-box">
    <div class="fold-left-box-left" :style="{ width: asideWidth + 'px' }">
      <div class="h-full" v-show="asideWidth > 0">
        <slot name="left"></slot>
      </div>

      <div
        class="fold-left-box-line"
        :style="{ cursor: asideWidth === 0 ? '' : 'col-resize' }"
        ref="drag"
      ></div>

      <span :title="toolTip(asideWidth)" class="mini" @click="foldLeft">
        <i :class="foldIcon(asideWidth)"></i>
      </span>
    </div>

    <div class="fold-left-box-main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, unref, defineComponent, computed, onMounted } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'FoldLayout',
    inheritAttrs: false,
    setup() {
      const { t } = useI18n();
      const asideWidth = ref<number>(280);
      const backAsideWidth = ref<number>(280);
      const drag = ref<any>(null);

      const foldIcon = computed(() => {
        return (asideWidth) =>
          asideWidth > 0 ? 'icon iconfont icon-zuojiantou' : 'icon iconfont icon-youjiantou';
      });

      const toolTip = computed(() => {
        return (asideWidth) => (asideWidth > 0 ? t('common.fold') : t('common.expand'));
      });

      const foldLeft = () => {
        asideWidth.value = unref(asideWidth) === 0 ? unref(backAsideWidth) : 0;
      };

      onMounted(() => {
        bindDrop();
      });

      const bindDrop = () => {
        // const drag = this.$refs.drag;
        drag.value.onmousedown = function (e) {
          document.onmousemove = function (e) {
            asideWidth.value += e.movementX;
            backAsideWidth.value += e.movementX;
            if (unref(asideWidth) < 20) {
              document.onmousemove = null;
              document.onmouseup = null;
              asideWidth.value = 0;
              backAsideWidth.value = 0;
            }
          };
          return false;
        };
      };

      return {
        asideWidth,
        backAsideWidth,
        foldIcon,
        foldLeft,
        toolTip,
        drag,
        t,
      };
    },
  });
</script>

<style lang="less" scoped>
  .fold-left-box {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-left {
      position: relative;
      height: 100%;
      padding-right: 10px;
      overflow: hidden;

      .fold-left-box-line {
        position: absolute;
        top: 0;
        right: 8px;
        width: 4px;
        height: 100%;
        // border-left: 1px solid #e6e6e6;

        &-button {
          position: absolute;
          top: 50%;
          right: -10px;
        }
      }

      .mini {
        position: absolute;
        // top: calc(50vh - 60px);
        top: 25%;
        right: -15px;
        box-sizing: content-box;
        width: 0;
        height: 64px;
        transform: translateY(-50%);
        transition: right 0.1s ease-in-out, border 0.1s ease;
        border: 15px solid transparent;
        border-left: 10px solid #15ace6b0;
        color: #aaa;
        line-height: 64px;
        cursor: pointer;

        > i {
          margin-left: -13px;
          font-size: 14px;
        }
      }
    }

    &-main {
      flex: 1;
      height: 100%;
      // padding-left: 12px;
      overflow: hidden;
    }

    .overflow-hiddenn{
      height: 200px !important;
      overflow: scroll !important                                                                                                   ;


    }
  }                                                                                    
</style>
