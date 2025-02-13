<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.name }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem key="setting" :text="t('menu.system.accountSetting')" icon="clarity:note-edit-line" />
        <MenuDivider />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem key="logout" :text="t('layout.header.dropdownItemLoginOut')" icon="ion:power-outline" />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="registerLockPage" />
  <AccountSettingDrawer @register="registerDrawer" />
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { defineComponent, computed } from 'vue';

  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';
  import AccountSettingDrawer from '/@/views/system/account/setting/index.vue';
  import headerImg from '/@/assets/images/header.jpg';
  import { propTypes } from '/@/utils/propTypes';
  import { useGlobSetting } from '/@/hooks/setting';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  type MenuEvent = 'logout' | 'setting' | 'lock';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      AccountSettingDrawer,
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const globSetting = useGlobSetting();
      const { getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();
      const [registerDrawer, { openDrawer }] = useDrawer();

      const getUserInfo = computed(() => {
        const { name = '', avatar } = userStore.getUserInfo || {};
        return { name, avatar: avatar ? `${globSetting.apiUrl}/sysFileInfo/preview?id=${avatar}` : headerImg };
      });

      const [registerLockPage, { openModal: openLockPageModal }] = useModal();

      function handleLock() {
        openLockPageModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'logout':
            handleLoginOut();
            break;
          case 'setting':
            openDrawer(true);
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        registerLockPage,
        getUseLockPage,
        registerDrawer,
        handleMenuClick,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
