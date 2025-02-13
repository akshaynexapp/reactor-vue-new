<template>
  <div class="track-playback-wrapper">
    <Form layout="vertical" :form="form" :label-col="{ span: 5 }">
      <FormItem
        :label="t('view.main.gis.label.device')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <Select :value="form.devSn" @change="handleChange">
          <SelectOption v-for="item in deviceList" :key="item.id" :value="item.devSn">
            {{ item.devSn }}
          </SelectOption>
        </Select>
      </FormItem>
      <!-- <FormItem
        label="开始时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <DatePicker format="YYYY-MM-DD HH:mm:ss" show-time> </DatePicker>
      </FormItem>
      <FormItem
        label="结束时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <DatePicker format="YYYY-MM-DD HH:mm:ss" show-time> </DatePicker>
      </FormItem> -->
      <!-- <FormItem
        label="间距"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <Select>
          <SelectOption v-for="item in deviceList" :key="item.id" :value="item.value">
            {{ item.label }}
          </SelectOption>
        </Select>
      </FormItem> -->
      <FormItem
        :label="t('view.main.gis.label.interval')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Input :value="form.interval + 'ms'" style="width: 150px" :disabled="true" />
          </Col>
          <Col>
            <InputNumber
              @change="(e) => (form.interval = e)"
              :value="form.interval"
              :min="0"
              :step="100"
            />
          </Col>
        </Row>
      </FormItem>

      <!-- <FormItem label="里程" :label-col="formItemLayout.labelCol" :wrapper-col="{ span: 24 }">
        <Row class="flex justify-between align-center">
          <Col :span="16"> <Input /></Col>
          <Col :span="6">
            <Radio>GPS</Radio>
          </Col>
        </Row>
      </FormItem> -->
      <!-- <FormItem :label-col="formItemLayout.labelCol" :wrapper-col="{ span: 24 }">
        <Row class="flex justify-between align-center">
          <RaioGroup
            :value="form.playMode"
            @change="(e) => (form.playMode = e.target.value)"
            name="radioGroup"
            :default-checked="0"
          >
            <Radio :value="0">{{ t('view.main.gis.label.normalPlayback') }}</Radio>
            <Radio :value="1">{{ t('view.main.gis.label.quickPlayback') }}</Radio>
          </RaioGroup>
        </Row>
      </FormItem> -->

      <FormItem
        :label="t('view.main.gis.label.trackMovingStep')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="{ span: 24 }"
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Input :value="form.count * 100" style="width: 150px" :disabled="true" />
          </Col>
          <Col>
            <InputNumber
              @change="(e) => (form.count = e)"
              :value="form.count"
              :precision="2"
              :step="0.1"
              :min="0.1"
            />
          </Col>
        </Row>
      </FormItem>

      <FormItem>
        <Button block type="primary" size="small" @click="handleApply">{{
          t('view.main.gis.label.apply')
        }}</Button>
      </FormItem>
      <!-- <FormItem :label-col="formItemLayout.labelCol" :wrapper-col="{ span: 24 }">
        <Row class="flex justify-between align-center">
          <CheckboxGroup :default-value="[1]">
            <Row>
              <Checkbox :value="1">显示轨迹点</Checkbox>
              <Checkbox :value="2">自动播放</Checkbox>
            </Row>
            <Row>
              <Checkbox :value="3">列表无效点/漂移点</Checkbox>
            </Row>
          </CheckboxGroup>
        </Row>
      </FormItem>
      <FormItem :label-col="formItemLayout.labelCol" :wrapper-col="{ span: 24 }">
        <Row class="flex justify-between align-center">
          <Button type="primary" size="small">GPS数据导出</Button>
          <Button type="primary" size="small">轨迹样式设置</Button>
        </Row>
      </FormItem> -->
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive, onMounted, getCurrentInstance } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { devPage } from '/@/api/main/deviceManage';
  import {
    Form,
    FormItem,
    Row,
    Col,
    DatePicker,
    Select,
    SelectOption,
    Input,
    InputNumber,
    Button,
    Radio,
    Checkbox,
  } from 'ant-design-vue';
  export default defineComponent({
    name: 'TrackPlayback',
    components: {
      Form,
      FormItem,
      Row,
      Col,
      DatePicker,
      Select,
      SelectOption,
      Input,
      InputNumber,
      Button,
      Radio,
      RaioGroup: Radio.Group,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
    },
    emits: ['apply'],
    setup(props, { emit }) {
      const { t } = useI18n();
      let form = reactive({
        devSn: '',
        interval: 200,
        playMode: 0, //0正常 1快速
        count: 10,
      });
      const deviceList = ref([]);

      const formItemLayout = ref({
        labelCol: { span: 12 },
        wrapperCol: { span: 24 },
      });

      const checkBoxOptions = ref([
        { label: '显示轨迹点', value: '1' },
        { label: '自动播放', value: '2' },
      ]);
      const internalInstance = getCurrentInstance();
      const $bus = internalInstance.appContext.config.globalProperties.$bus;

      // if (!$bus.all.get('DEV_LIST_FINISH')) {
      //   $bus.on('DEV_LIST_FINISH', (res) => {
      //     deviceList.value = res;
      //   });
      // }

      if (!$bus.all.get('SELECT_DEV')) {
        $bus.on('SELECT_DEV', (data) => {
          const { marker, deviceList: devList } = data;
          deviceList.value = devList;
          form.devSn = marker['_data'].devSn;
        });
      }

      const handleChange = (e) => {
        form.devSn = e;
        $bus.emit('SET_CENTER', form);
      };
      // const range = (start, end) => {
      //   const result = [];
      //   for (let i = start; i < end; i++) {
      //     result.push(i);
      //   }
      //   return result;
      // };

      // const disabledDate = (current) => {
      //   return current && current < moment().endOf('day');
      // };

      // const disabledDateTime = () => {
      //   return {
      //     disabledHours: () => range(0, 24).splice(4, 20),
      //     disabledMinutes: () => range(30, 60),
      //     disabledSeconds: () => [55, 56],
      //   };
      // };
      const handleApply = () => {
        $bus.emit('APPLY', form);
      };

      onMounted(() => {});
      return {
        form,
        deviceList,
        formItemLayout,
        checkBoxOptions,
        handleApply,
        handleChange,
        t,
        // disabledDate,
        // disabledDateTime,
      };
    },
  });
</script>

<style lang="less" scoped>
  .track-playback-wrapper {
    width: 100%;

    .ant-form-item {
      margin-bottom: 8px;
    }
  }
</style>
