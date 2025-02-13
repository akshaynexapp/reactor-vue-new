<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-02-08 02:25:52
 * @FilePath     : \reactor-vue\src\views\alarm\rule\AlarmRuleModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.main.alarm.record.modal.emailTest.title')"
    :minHeight="50"
    @ok="handleSubmit"
  >
    <a-input
      size="large"
      class="p-4"
      allowClear
      v-model:value="emailTo"
      :placeholder="t('view.main.alarm.record.modal.emailTest.emailTo')"
    >
      <template #prefix>
        <mail-outlined type="mail" />
      </template>
    </a-input>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { alarmEmailTest } from '/@/api/main/alarmManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { MailOutlined } from '@ant-design/icons-vue';

  const emit = defineEmits(['success', 'register']);
  const { t } = useI18n();

  // 收件人
  const emailTo = ref('');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      // 邮件发送测试
      alarmEmailTest({
        to: emailTo.value,
        title: t('view.main.alarm.record.emailTest.title'),
        content: t('view.main.alarm.record.emailTest.content'),
      });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
