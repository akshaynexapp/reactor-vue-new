<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <FoldLayout>
      <template #left>
        <OrgTree class="left-wrap" @select="handleSelect" />
      </template>
      <template #main>
        <BasicTable @register="registerTable" :searchInfo="searchInfo">
          <template #toolbar>
            <a-button v-auth="'sysUser:add'" type="primary" @click="handleCreate">{{
              t('view.system.account.button.add')
            }}</a-button>
          </template>
          <template #action="{ record }">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  tooltip: t('view.system.account.label.editAccount'),
                  auth: 'sysUser:edit',
                  onClick: handleEdit.bind(null, record),
                },
                {
                  icon: 'wpf:password1',
                  tooltip: t('view.system.account.label.resetPassword'),
                  auth: 'sysUser:resetPwd',
                  popConfirm: {
                    title: t('view.system.account.msg.confirmResetPass'),
                    confirm: handleResetPass.bind(null, record),
                  },
                },
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  tooltip: t('view.system.account.label.deleteAccount'),
                  auth: 'sysUser:delete',
                  popConfirm: {
                    title: t('common.confirmDelete'),
                    confirm: handleDelete.bind(null, record),
                  },
                },
              ]"
            />
          </template>
        </BasicTable>
      </template>
    </FoldLayout>

    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList, deleteAccount, resetPassword } from '/@/api/system/accountManage';
  import { PageWrapper } from '/@/components/Page';
  import OrgTree from './OrgTree.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';

  import { FoldLayout } from '/@/components/FoldLayout';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, OrgTree, AccountModal, TableAction, FoldLayout },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: t('view.system.account.label.accountList'),
        api: getAccountList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        actionColumn: {
          width: 120,
          title: t('common.operating'),
          dataIndex: 'action',
          auth: ['sysUser:edit', 'sysUser:resetPwd', 'sysUser:delete'],
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleResetPass(record: Recordable) {
        resetPassword(record.id);
      }

      function handleDelete(record: Recordable) {
        deleteAccount([{ id: record.id }]).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(orgId = '') {
        searchInfo.orgId = orgId;
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleResetPass,
        searchInfo,
        t,
      };
    },
  });
</script>

<style lang="less" scoped>
  .left-wrap {
    height: calc(100% - 32px);
  }
</style>
