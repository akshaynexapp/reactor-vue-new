<!--
 * @Description  : 
 * @Date         : 2022-04-14 15:07:45
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-06 20:30:09
 * @FilePath     : \reactor-vue\src\views\device\sdlan\DevAppEditModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="600px"
    :title="t('view.main.sdlan.modal.title')"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { devAppAdd, devAppEdit } from '/@/api/main/deviceManage';
  import { formSchema } from './devApp.data';

  const { t } = useI18n();
  const isUpdateFlag = ref(true);
  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    labelAlign: 'right',
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    let { isUpdate, record } = data;
    isUpdateFlag.value = !!isUpdate;
    if (unref(isUpdateFlag)) {
      // 转换成字符串，否则按钮组无法赋值。
      record.target = record.target == 1 ? '1' : '0';
      setFieldsValue({
        ...data.record,
      });
    } else {
      setFieldsValue({
        devSn: data.record.devSn,
      });
    }
  });

  // 保存记录
  async function handleSubmit() {
    try {
      const values = await validate();
      if (!unref(isUpdateFlag)) {
        delete values.id;
      }
      setModalProps({ confirmLoading: false });
      unref(isUpdateFlag) ? await devAppEdit(values) : await devAppAdd(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
