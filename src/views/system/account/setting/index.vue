<!--
 * @Description  : 
 * @Date         : 2021-08-05 11:02:20
 * @LastEditors  : Hu
 * @LastEditTime : 2021-08-13 10:04:57
 * @FilePath     : \reactor-vue\src\views\system\account\setting\index.vue
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :showFooter="false"
    :title="t('menu.system.accountSetting')"
    width="60%"
  >
    <ScrollContainer>
      <div ref="wrapperRef" :class="prefixCls">
        <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
          <template v-for="item in settingList" :key="item.key">
            <TabPane :tab="item.name">
              <component :is="item.component" />
            </TabPane>
          </template>
        </Tabs>
      </div>
    </ScrollContainer>
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tabs } from 'ant-design-vue';

  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ScrollContainer } from '/@/components/Container/index';
  import { settingList } from './data';
  import { useI18n } from '/@/hooks/web/useI18n';

  import BaseSetting from './BaseSetting.vue';
  import SecureSetting from './SecureSetting.vue';
  import AccountBind from './AccountBind.vue';

  export default defineComponent({
    components: {
      BasicDrawer,
      ScrollContainer,
      Tabs,
      TabPane: Tabs.TabPane,
      BaseSetting,
      SecureSetting,
      AccountBind,
    },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async () => {
        setDrawerProps({ confirmLoading: false });
      });
      return {
        prefixCls: 'account-setting',
        settingList,
        tabBarStyle: {
          width: '150px',
        },
        t,
        registerDrawer,
      };
    },
  });
</script>
<style lang="less">
  .account-setting {
    //margin: 12px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: #ef8b1e !important;
    }
  }
</style>
