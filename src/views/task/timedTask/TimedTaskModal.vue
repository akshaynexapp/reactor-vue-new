<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 14:03:30
 * @FilePath     : \reactor-vue\src\views\task\timedTask\TimedTaskModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    width="600px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './timedTask.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { sysTimersAdd, sysTimersEdit } from '/@/api/system/timedTaskManage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'RoleModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('view.system.timedTask.modal.add')
          : t('view.system.timedTask.modal.edit')
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          unref(isUpdate) ? await sysTimersEdit(values) : await sysTimersAdd(values);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        t,
      };
    },
  });
</script>
