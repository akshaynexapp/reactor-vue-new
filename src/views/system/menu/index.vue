<template>
  <div class="m-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-if="isSuperAdmin" type="primary" @click="handleCreate">
          {{ t('view.system.menu.button.add') }}
        </a-button>
      </template>
      <template #type="{ text }">
        <span>
          <Tag color="cyan" v-if="text === 0"> {{ t('view.system.menu.label.dir') }} </Tag>
          <Tag color="blue" v-if="text === 1"> {{ t('view.system.menu.label.menu') }} </Tag>
          <Tag color="purple" v-if="text === 2">{{ t('view.system.menu.label.button') }}</Tag>
        </span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuList, delMenu } from '/@/api/system/menuManage';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { Tag } from 'ant-design-vue';

  import { columns } from './menu.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction, Tag },
    setup() {
      const { t } = useI18n();
      // const { createMessage } = useMessage();
      const userStore = useUserStore();
      const isSuperAdmin = userStore.getUserInfo.adminType === -1;
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.menu.label.menuList'),
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
        },
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 120,
          title: t('common.operating'),
          ifShow: isSuperAdmin,
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        delMenu(record.id).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        isSuperAdmin,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        t,
      };
    },
  });
</script>
