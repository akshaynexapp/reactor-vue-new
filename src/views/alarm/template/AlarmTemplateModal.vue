<!--
 * @Description  : 
 * @Date         : 2021-08-17 15:59:19
 * @LastEditors  : Hu
 * @LastEditTime : 2021-09-01 11:33:26
 * @FilePath     : \reactor-vue\src\views\alarm\template\AlarmTemplateModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.main.alarm.template.modal.edit')"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { alarmTemplateEdit } from '/@/api/main/alarmManage';
  import { formSchema } from './alarmTemplate.data';

  const { createMessage } = useMessage();
  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    setFieldsValue({ ...data.record });
  });

  // 保存记录
  async function handleSubmit() {
    const values = await validate();
    if (!values.content.includes('{}')) {
      createMessage.warn(t('view.main.alarm.template.msg.msg-1'));
      return;
    }
    alarmTemplateEdit(values).then(() => {
      closeModal();
      emit('success');
    });
  }
</script>
