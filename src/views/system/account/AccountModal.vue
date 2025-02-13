<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-01 18:05:40
 * @FilePath     : \reactor-vue\src\views\system\account\AccountModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="800px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { addAccount, editAccount } from '/@/api/system/accountManage';
  import { getOwnRoleByUser, getRoleDropDownList } from '/@/api/system/roleManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getPopupContainer } from '/@/utils';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        // 构造表单字段
        const roleData = await getRoleDropDownList();
        let roleOptions: any = [];
        let roleLabel = '';
        let roleLabelIndex = -1;
        let roleLabelOption = {};
        roleData.forEach((role) => {
          // 创建人变化，生成一个新的label option
          if (roleLabel !== role.label) {
            // 重置变量
            roleLabelIndex++;
            roleLabel = role.label;
            roleLabelOption = { options: [] };
          }
          roleLabelOption['label'] = role.label;
          roleLabelOption['value'] = role.label;
          roleLabelOption['options'].push({ key: role.id, value: role.id, label: role.name });
          // 替换roleLabelOption
          roleOptions.splice(roleLabelIndex, 1, roleLabelOption);
        });
        updateSchema([
          {
            field: 'grantRoleIdList',
            component: 'Select',
            componentProps: {
              options: roleOptions,
              mode: 'tags',
              getPopupContainer: getPopupContainer,
            },
          },
        ]);

        // 回填表单数据
        if (unref(isUpdate)) {
          const grantRoleIdList = await getOwnRoleByUser(data.record.id);
          setFieldsValue({
            ...data.record,
            grantRoleIdList,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('view.system.account.modal.add') : t('view.system.account.modal.edit'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          unref(isUpdate) ? await editAccount(values) : await addAccount(values);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
