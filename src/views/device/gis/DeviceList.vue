<template>
  <div class="device-list-panel flex justify-end">
    <Popover
      class="popover-wrapper"
      trigger="click"
      placement="bottomRight"
      arrow-point-at-center
      @visible-change="handleVisibleChange"
      :visible="visible"
    >
      <template #title>
        <span>{{ t('view.main.device.label.deviceList') }}</span>
      </template>
      <template #content>
        <!-- <PageWrapper dense contentFullHeight fixedHeight contentClass="flex"> -->
        <FoldLayout>
          <template #left>
            <OrgTree class="left-wrap" @select="handleSelect" />
          </template>
          <template #main>
            <BasicTable @register="registerTable" :searchInfo="searchInfo">
              <template #toolbar>
                <a-button type="primary" @click="handleMarkDevice">{{
                  t('common.okText')
                }}</a-button>
              </template>
            </BasicTable>
          </template>
        </FoldLayout>
        <!-- </PageWrapper> -->
      </template>

      <a-button type="primary" @click="handleVisible">
        {{ t('view.main.device.label.deviceList') }}
        <DownOutlined />
      </a-button>
    </Popover>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    ref,
    unref,
    reactive,
    onMounted,
    getCurrentInstance,
    nextTick,
  } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Popover } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FoldLayout } from '/@/components/FoldLayout';
  import OrgTree from '../OrgTree.vue';
  import { PageWrapper } from '/@/components/Page';
  import { devListcolumns, devSearchFormSchema } from '../device.data';
  import { devPage } from '/@/api/main/deviceManage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { DownOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'DeviceListPanel',
    components: {
      Popover,
      BasicTable,
      FoldLayout,
      OrgTree,
      PageWrapper,
      DownOutlined,
    },
    emits: ['apply'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const internalInstance = getCurrentInstance();
      const $bus = internalInstance.appContext.config.globalProperties.$bus;
      const { createMessage } = useMessage();
      const visible = ref(false);
      const searchInfo = reactive<Recordable>({
        online: true,
      });
      const [
        registerTable,
        { reload, getForm, getSelectRowKeys, clearSelectedRowKeys, getDataSource },
      ] = useTable({
        title: t('view.main.device.label.deviceList'),
        api: devPage,
        columns: devListcolumns,
        formConfig: {
          labelWidth: 100,
          schemas: devSearchFormSchema,
        },
        striped: true,
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: true,
        clickToRowSelect: false,
        isCanResizeParent: true,
        canResize: true,
        rowSelection: { type: 'checkbox' },
        rowKey: 'id',
      });
      function handleSelect(orgId = '') {
        searchInfo.orgId = orgId;
        reload();
      }
      const handleMarkDevice = () => {
        const selectRowKeys = getSelectRowKeys();
        if (!selectRowKeys || selectRowKeys.length === 0) {
          createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
          return;
        }
        const dataSource = getDataSource();
        const markList = dataSource.filter((e) =>
          selectRowKeys.some((s) => e.latitude && e.longitude && s === e.id),
        );
        if (markList.length === 0) {
          createMessage.warn(t('view.main.common.msg.noLocableDevices'));
          return;
        }
        visible.value = false;
        $bus.emit('RENDER_DEV', markList);
      };
      const handleVisibleChange = (e) => {
        if (!e) {
          // clearSelectedRowKeys();
        }
      };

      const handleVisible = () => {
        visible.value = !unref(visible);
        if (!unref(visible)) {
          clearSelectedRowKeys();
        } else {
        }
      };
      const getPopupContainer = () => document.body;
      onMounted(() => {});
      return {
        t,
        visible,
        searchInfo,
        registerTable,
        handleSelect,
        handleMarkDevice,
        handleVisibleChange,
        handleVisible,
        getPopupContainer,
      };
    },
  });
</script>

<style lang="less">
  body {
    .ant-popover {
      width: 1000px;

      .ant-popover-content {
        .ant-popover-inner {
          height: 540px;

          .ant-popover-inner-content {
            height: calc(100% - 32px);
          }
        }
      }
    }
  }

  .device-list-panel {
    // width: 930px;
    // height: 600px;
  }
</style>
