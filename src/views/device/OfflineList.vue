<!--
 * @Description  : 
 * @Date         : 2021-06-18 16:36:45
 * @LastEditors  : Hu
 * @LastEditTime : 2023-09-03 23:35:10
 * @FilePath     : \reactor-vue\src\views\device\OfflineList.vue
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <FoldLayout>
      <template #left>
        <OrgTree class="left-wrap" @select="handleSelect" />
      </template>
      <template #main>
        <BasicTable @register="registerTable" @edit-end="handleEditEnd" :searchInfo="searchInfo">
          <template #toolbar>
            <TableAction
              :actions="[
                {
                  icon: 'mdi:monitor-edit',
                  tooltip: t('view.main.device.button.sdlan'),
                  auth: 'devTask:proxy',
                  onClick: handleGUI,
                },
                {
                  icon: 'ant-design:environment',
                  tooltip: t('view.main.device.button.location'),
                  onClick: handleJumpDeviceLocation,
                },
                {
                  icon: 'tabler:replace',
                  tooltip: t('view.main.device.button.adjustOrg'),
                  onClick: openAdjustOrgForm,
                },
                {
                  icon: 'carbon:cloud-download',
                  loading: exportLoadingFlag,
                  tooltip: t('menu.button.export'),
                  onClick: handleExport,
                },
              ]"
              :dropDownActions="[
                // {
                //   label: t('menu.button.detail'),
                //   auth: 'dev:detail',
                //   onClick: handleDetail,
                // },
                {
                  label: t('view.main.device.button.reboot'),
                  auth: 'devTask:reboot',
                  onClick: handleReboot,
                },
                {
                  label: t('view.main.device.button.syncConfig'),
                  auth: 'devTask:syncConfig',
                  onClick: handleSyncConfig,
                },
                {
                  label: t('view.main.device.button.config'),
                  auth: 'devTask:config',
                  onClick: openConfigForm,
                },
                {
                  label: t('view.main.device.button.upgrade'),
                  auth: 'devTask:upgrade',
                  onClick: openUpgradeForm,
                },
                {
                  label: t('menu.button.delete'),
                  // icon: 'ant-design:delete-outlined',
                  // color: 'error',
                  auth: 'dev:delete',
                  onClick: handleDelete,
                },
              ]"
            />
          </template>
          <template #devSn="{ record }">
            <span
              ><Icon :icon="getSignalIcon(record)" />
              <a href="#" @click="handleDetail(record)">&nbsp;{{ record.devSn }}</a></span
            >
          </template>
        </BasicTable>
      </template>
    </FoldLayout>
    <DeviceAdjustOrgModal @register="registerAdjustOrgModal" @success="reload" />
    <DeviceConfigModal @register="registerDeviceConfigModal" />
    <DeviceUpgradeModal @register="registerDeviceUpgradeModal" />
    <DeviceDetailDrawer @close="handleCloseDetailDrawer" @register="registerDetailDrawer" />
    <DeviceAppDrawer @register="registerDevAppDrawer" />
  </PageWrapper>
</template>
<script lang="ts" setup name="OfflineDevices">
  import Icon from '@/components/Icon/Icon.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { devPage, devEdit, devExport, devDelete } from '/@/api/main/deviceManage';
  import { devReboot, syncConfig } from '/@/api/main/deviceTaskManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns, searchFormSchema } from './device.data';
  import { getSignalIcon } from './device.service';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import DeviceConfigModal from './DeviceConfigModal.vue';
  import DeviceUpgradeModal from './DeviceUpgradeModal.vue';
  import DeviceAdjustOrgModal from './DeviceAdjustOrgModal.vue';
  import DeviceDetailDrawer from './detail/index.vue';
  import DeviceAppDrawer from './sdlan/DevAppDrawer.vue';
  import { downloadByData } from '/@/utils/file/download';
  import { toRaw, reactive, ref, h } from 'vue';
  import dayjs from 'dayjs';
  import { useGo } from '/@/hooks/web/usePage';
  import { FoldLayout } from '/@/components/FoldLayout';
  import OrgTree from './OrgTree.vue';
  import { PageWrapper } from '/@/components/Page';

  const go = useGo();
  const { t } = useI18n();
  const { createMessage, createConfirm } = useMessage();
  const [registerAdjustOrgModal, { openModal: openAdjustOrgModal }] = useModal();
  const [registerDeviceConfigModal, { openModal: openDeviceConfigModal }] = useModal();
  const [registerDeviceUpgradeModal, { openModal: openDeviceUpgradeModal }] = useModal();
  const [registerDetailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [registerDevAppDrawer, { openDrawer: openAppDrawer }] = useDrawer();
  const [registerTable, { reload, getForm, getSelectRows, getSelectRowKeys }] = useTable({
    title: t('view.main.device.label.deviceList'),
    api: devPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    striped: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: false,
    showIndexColumn: true,
    clickToRowSelect: false,
    rowSelection: { type: 'checkbox' },
    rowKey: 'id',
  });

  // 导出loading状态
  const exportLoadingFlag = ref<boolean>();

  const searchInfo = reactive<Recordable>({ online: false });

  function handleDelete() {
    const devIds: string[] = getSelectRowKeys();
    if (devIds.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: () => h('span', t('sys.app.logoutTip')),
      content: () => t('common.confirmDelete'),
      onOk: async () => {
        devDelete({ idArr: devIds }).then(() => reload());
      },
    });
  }

  // 编辑
  function handleEditEnd({ record, index, key, value }: Recordable) {
    devEdit({ id: record.id, [key]: value }).then(() => reload());
  }

  // 打开SDLAN
  function handleGUI() {
    const record = getOneRecord();
    if (record === undefined) {
      return;
    }
    if (!record.online) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }
    openAppDrawer(true, { record });
    return;
  }

  // 设备重启
  function handleReboot() {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    // 只保留在线设备
    const onlineRows: Recordable<any>[] = selectRows.filter((v) => {
      return v.online;
    });
    if (onlineRows.length == 0) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }

    // 生成最终的sn数组
    const devSnArr = onlineRows.map((item: any) => {
      return item.devSn;
    });
    devReboot({ devSnArr: devSnArr });
  }

  // 同步设备参数
  function handleSyncConfig() {
    const record = getOneRecord();
    if (record === undefined) {
      return;
    }
    if (!record.online) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }
    syncConfig({ devSn: record.devSn }).then(() => createMessage.success(t('common.success')));
  }

  // 打开调整分组表单
  function openAdjustOrgForm() {
    const devIds: string[] = getSelectRowKeys();
    if (devIds.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    openAdjustOrgModal(true, { record: { devIds: devIds } });
  }

  // 打开设备配置表单
  function openConfigForm() {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    openDeviceConfigModal(true, { selectRows });
  }

  // 打开升级表单
  function openUpgradeForm() {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    openDeviceUpgradeModal(true, { selectRows });
  }

  // 打开设备详情
  function handleDetail(record) {
    openDetailDrawer(true, { record });
  }

  const handleJumpDeviceLocation = () => {
    const record = getOneRecord();
    if (record === undefined) {
      return;
    }
    if (!record.online) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }
    const { longitude, latitude, id } = record;
    if (record === undefined) {
      return;
    }
    if (longitude === undefined || latitude === undefined) {
      createMessage.warn(t('view.main.common.msg.noLocableDevices'));
      return;
    }
    go(`/device/gis/index?longitude=${longitude}&latitude=${latitude}&id=${id}`);
  };

  // 导出设备数据
  async function handleExport() {
    exportLoadingFlag.value = true;
    const params: any = getForm().getFieldsValue();
    const res = await devExport(
      toRaw({
        ...params,
        orgId: searchInfo.orgId,
        online: false,
      }),
    );
    downloadByData(res.data, 'offline_device_' + dayjs().format('YYYY-MM-DD') + '.xls');
    exportLoadingFlag.value = false;
  }

  function handleSelect(orgId = '') {
    searchInfo.orgId = orgId;
    reload();
  }

  const handleCloseDetailDrawer = () => {
    reload();
  };
  const getOneRecord = () => {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    if (selectRows.length > 1) {
      createMessage.warn(t('view.main.common.msg.selectOneOnly'));
      return;
    }
    return selectRows[0];
  };
</script>

<style lang="less" scoped>
  .left-wrap {
    height: calc(100% - 32px);
  }

  a {
    color: black;
    text-decoration: none;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }
</style>
