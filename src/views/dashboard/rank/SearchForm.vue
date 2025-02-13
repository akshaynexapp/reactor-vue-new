<!--
 * @Description  : 
 * @Date         : 2022-02-10 13:32:37
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-11 18:31:45
 * @FilePath     : \reactor_web_3.0\src\views\dashboard\rank\SearchForm.vue
-->
<template>
  <Form layout="inline">
    <FormItem>
      <DatePicker @change="onChange" />
    </FormItem>
    <FormItem>
      <a-button type="primary" @click="handleSubmit">Search</a-button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Form, FormItem, DatePicker } from 'ant-design-vue';

  export default defineComponent({
    name: 'AccountManagement',
    components: { Form, FormItem, DatePicker },
    setup(props, { emit }) {
      const { t } = useI18n();
      const formData = reactive({
        date: '',
      });
      const onChange = (e, time) => {
        formData.date = time;
      };
      const handleSubmit = () => {
        emit('submit', formData);
      };
      return {
        t,
        onChange,
        handleSubmit,
        formData,
      };
    },
  });
</script>

<style lang="less" scoped></style>
