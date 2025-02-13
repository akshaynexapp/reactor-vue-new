<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-13 10:52:43
 * @FilePath     : \reactor-vue\src\views\device\DeviceAdjustOrgModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.main.device.modal.adjustOrg')"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { adjustOrgFormSchema } from './device.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { devAdjustOrg } from '../../api/main/deviceManage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'DeviceAdjustOrgModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const devIds = ref<String[]>();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: adjustOrgFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        const record = data.record;

        devIds.value = record.devIds;
        setFieldsValue({ orgId: record?.orgId });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          await devAdjustOrg({ idArr: devIds.value, orgId: values.orgId });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        registerForm,
        handleSubmit,
        t,
      };
    },
  });
</script>
