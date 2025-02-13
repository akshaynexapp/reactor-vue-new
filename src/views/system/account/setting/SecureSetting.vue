<!--
 * @Description  : 
 * @Date         : 2021-08-05 11:02:20
 * @LastEditors  : Hu
 * @LastEditTime : 2021-09-09 09:59:15
 * @FilePath     : \reactor-vue\src\views\system\account\setting\SecureSetting.vue
-->
<template>
  <CollapseContainer :title="t('layout.header.changePassword')" :canExpan="false">
    <BasicForm @register="registerForm" />
    <a-button type="primary" @click="handleSubmit"> {{ t('common.okText') }} </a-button>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { CollapseContainer } from '/@/components/Container/index';
  import { ref, unref } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { updatePassword } from '/@/api/system/accountManage';
  import { useUserStore } from '/@/store/modules/user';

  const { t } = useI18n();
  // 密码强度
  const passwordScore = ref<number>(0);
  const formSchema: FormSchema[] = [
    {
      field: 'passwordOld',
      label: t('view.system.account.label.passwordOld'),
      component: 'InputPassword',
      required: true,
    },
    {
      field: 'passwordNew',
      label: t('view.system.account.label.passwordNew'),
      component: 'StrengthMeter',
      componentProps: {
        placeholder: t('common.inputText'),
        onScoreChange: (score: number) => {
          passwordScore.value = score;
        },
      },
      dynamicRules: ({ values }) => {
        return [
          {
            required: true,
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(t('view.system.account.msg.notAllowNull'));
              }
              if (value === values.passwordOld) {
                return Promise.reject(t('view.system.account.msg.passNotAllowSame'));
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      field: 'confirmPassword',
      label: t('view.system.account.label.confirmPassword'),
      component: 'InputPassword',
      dynamicRules: ({ values }) => {
        return [
          {
            required: true,
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(t('view.system.account.msg.notAllowNull'));
              }
              if (value !== values.passwordNew) {
                return Promise.reject(t('view.system.account.msg.passDifferent'));
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
  ];

  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const [registerForm, { validate, resetFields }] = useForm({
    labelWidth: 150,
    showActionButtonGroup: false,
    schemas: formSchema,
  });

  async function handleSubmit() {
    const values = await validate();
    if (unref(passwordScore) < 3) {
      createMessage.error(t('view.system.account.msg.password-weak'));
      return;
    }
    const { passwordOld, passwordNew } = values;
    await updatePassword({
      id: userStore.getUserInfo.id,
      password: passwordOld,
      newPassword: passwordNew,
    }).finally(() => resetFields());
  }
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
