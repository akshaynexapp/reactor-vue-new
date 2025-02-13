<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-10-16 23:01:46
 * @FilePath     : \reactor-vue\src\views\system\role\RoleMenuDrawer.vue
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('view.system.role.modal.grantMenu')"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu>
        <BasicTree
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          :checkStrictly="false"
          ref="treeRef"
          class="tree-height"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { roleMenuSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import { getI18nMenuTreeForGrant } from '/@/views/system/menu/menu.service';
  import { getOwnMenuByRole, grantMenuByRole } from '/@/api/system/roleManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  defineOptions({ name: 'RoleMenuDrawer' });

  const emit = defineEmits(['success', 'register']);

  const { t } = useI18n();
  const { createMessage } = useMessage();
  const treeRef = ref<Nullable<TreeActionType>>(null);
  let treeData = ref<TreeItem[]>([]);

  const [registerForm, { getFieldsValue, resetFields, setFieldsValue }] = useForm({
    labelCol: { span: 0 },
    schemas: roleMenuSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });

    setFieldsValue({
      ...data.record,
    });

    treeData.value = (await getI18nMenuTreeForGrant()) as any as TreeItem[];
    let checkedMenu = (await getOwnMenuByRole(data.record.id)) as string[];
    getTree().setCheckedKeys(checkedMenu);
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
      setDrawerProps({ confirmLoading: true });
      const grantMenuIdList = getTree().getCheckedKeys()['checked']
        ? getTree().getCheckedKeys()['checked']
        : getTree().getCheckedKeys();
      if (grantMenuIdList.length === 0) {
        createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
        return;
      }
      await grantMenuByRole({
        id: getFieldsValue()['id'],
        grantMenuIdList: grantMenuIdList,
      });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  .tree-height {
    height: fit-content;
  }
</style>
