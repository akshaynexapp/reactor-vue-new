<!--
 * @Description  : 
 * @Date         : 2021-08-05 11:02:20
 * @LastEditors  : Hu
 * @LastEditTime : 2023-01-10 20:33:37
 * @FilePath     : \reactor-vue\src\views\system\account\setting\BaseSetting.vue
-->
<template>
  <CollapseContainer :title="t('view.system.setting.baseSetting')" :canExpan="false">
    <a-row :gutter="4">
      <a-col :span="18">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="6">
        <div class="change-avatar">
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            :showBtn="false"
            @change="changeAvatar"
            width="120"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> {{ t('common.okText') }} </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useI18n } from '/@/hooks/web/useI18n';

  import headerImg from '/@/assets/images/header.jpg';
  import { getLoginUserInfo } from '/@/api/base/user';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/base/upload';
  import { updateAvatar, updateInfo } from '/@/api/system/accountManage';
  import { useGlobSetting } from '/@/hooks/setting';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { t } = useI18n();
      const globSetting = useGlobSetting();
      const userStore = useUserStore();

      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 80,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await getLoginUserInfo();
        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar ? `${globSetting.apiUrl}/sysFileInfo/preview?id=${avatar}` : headerImg;
      });

      function changeAvatar(fileId: number) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = fileId;
        userStore.setUserInfo(userinfo);
        // 更新用户头像
        updateAvatar({ id: userinfo.id, avatar: fileId });
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        changeAvatar,
        t,
        handleSubmit: async () => {
          const values = await validate();
          updateInfo(values);
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
