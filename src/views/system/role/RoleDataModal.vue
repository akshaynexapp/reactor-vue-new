<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-10-16 23:20:23
 * @FilePath     : \reactor-vue\src\views\system\role\RoleDataModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.system.role.modal.grantData')"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #dataScopeOrgIds="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :tree-data="treeData"
          :check-strictly="true"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          ref="treeRef"
          toolbar
          title="Group Assignment"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { roleDataSchema } from './role.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree } from '@/components/Tree';
  import type { TreeActionType, TreeItem } from '@/components/Tree';

  import { grantDataByRole, getOwnDataByRole } from '/@/api/system/roleManage';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  defineOptions({ name: 'RoleDataModal' });

  const emit = defineEmits(['success', 'register']);

  const { t } = useI18n();
  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const treeRef = ref<Nullable<TreeActionType>>(null);
  const isSuperAdmin = userStore.getUserInfo.adminType === -1;
  const treeData = ref<TreeItem[]>([]);
  const [registerForm, { resetFields, getFieldsValue, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 90,
    schemas: roleDataSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    if (isSuperAdmin) {
      updateSchema([
        {
          field: 'dataScopeType',
          componentProps: {
            options: [
              { label: t('view.system.role.label.dataScope.option1'), value: 1 },
              { label: t('view.system.role.label.dataScope.option2'), value: 2 },
              { label: t('view.system.role.label.dataScope.option3'), value: 3 },
              { label: 'Custom Groups', value: 5 },
            ],
          },
        },
      ]);
    }

    treeData.value = await getOrgTree();
    let checkedMenu = await getOwnDataByRole(data.record.id);
    const tree = getTree();
    if (tree && checkedMenu) {
      tree.setCheckedKeys(checkedMenu);
    }

    setFieldsValue({
      ...data.record,
    });
  });

  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const grantOrgIdList = getTree().getCheckedKeys()['checked']
        ? getTree().getCheckedKeys()['checked']
        : getTree().getCheckedKeys();
      if (grantOrgIdList.length === 0) {
        createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
        return;
      }
      await grantDataByRole({
        id: getFieldsValue()['id'],
        dataScopeType: getFieldsValue()['dataScopeType'],
        grantOrgIdList: grantOrgIdList,
      });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
