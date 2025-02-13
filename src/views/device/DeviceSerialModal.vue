<!--
 * @Description  : 设备串口消息弹框
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-10-09 18:51:25
 * @FilePath     : \reactor-vue\src\views\device\DeviceUpgradeModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.main.device.modal.serial') + '(' + devSn + ')'"
    :footer="null"
    :canFullscreen="false"
    destroyOnClose
    @cancel="handleCancel"
    :loading="nameLoading"
    width="800px"
  >
    <a-row :gutter="[16, 16]">
      <a-col :span="6">
        <BasicForm @register="registerForm" />
        <a-button style="float: right" @click="handleOpenSerial" type="primary">Open</a-button>
      </a-col>
      <a-col :span="18">
        <div ref="terminalRef" class="mb-2"></div>
      </a-col>
    </a-row>
  </BasicModal>
</template>
<script lang="ts" setup name="DeviceSerialModal">
  import { ref } from 'vue';
  import { Terminal } from 'xterm';
  import { FitAddon } from 'xterm-addon-fit';
  import 'xterm/css/xterm.css';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getToken } from '/@/utils/auth';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { serialFormSchema } from './device.data';
  import { getSerial, openSerial, sendSerialData } from '/@/api/main/deviceTaskManage';

  const { t } = useI18n();
  const { createMessage } = useMessage();

  // 设备SN
  const devSn = ref<string>('');
  // 选的的端口
  const selectedName = ref<string>('');
  // 查询串口loading
  const nameLoading = ref<boolean>(true);
  // 串口列表
  const nameOptions = ref<Record<string, any>[]>([]);
  // 端口连接成功
  const serialOpened = ref<boolean>(false);

  const [registerForm, { resetFields, updateSchema, validate }] = useForm({
    labelWidth: 80,
    schemas: serialFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    resetFields();
    nameLoading.value = true;
    setModalProps({ confirmLoading: false });
    devSn.value = data.record.devSn;
    // 初始化
    if (terminalRef.value) {
      initXterm();
    }
  });

  const term = ref();
  const ROWS = 20;
  const COLS = 10;
  const terminalRef = ref(null);
  // 缓存输入字符
  const storagedCode: string[] = [];
  let socket;

  /**
   * 初始化xterm
   */
  const initXterm = () => {
    term.value = new Terminal({
      allowProposedApi: true,
      rows: ROWS, //行数
      cols: COLS, // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, //启用时，光标将设置为下一行的开头
      scrollback: 50, //终端中的回滚量
      disableStdin: false, //是否应禁用输入
      tabStopWidth: 4,
      cursorStyle: 'underline', //光标样式
      cursorBlink: true, //光标闪烁
      lineHeight: 1.2,
      fontSize: 14,
      screenReaderMode: true,
      fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
      theme: {
        foreground: '#ECECEC', //字体
        background: '#000000', //背景色
        cursor: 'help', //设置光标
      },
    });
    // 创建terminal实例
    term.value.open(terminalRef.value);
    // 换行并输入起始符 #
    term.value.prompt = () => {
      term.value.write('\r\n# ');
    };
    term.value.prompt();
    // canvas背景全屏
    const fitAddon = new FitAddon();
    term.value.loadAddon(fitAddon);
    fitAddon.fit();

    window.addEventListener('resize', resizeScreen);
    function resizeScreen() {
      try {
        // 窗口大小改变时，触发xterm的resize方法使自适应
        fitAddon.fit();
      } catch (e) {
        console.log('e', e.message);
      }
    }
    setTimeout(async () => {
      handleTermEvent();
      initWebsocket();
    }, 1000);
  };

  /**
   * 初始化websocket
   */
  const initWebsocket = () => {
    const webSocketUrl =
      (location.protocol === 'http:' ? 'ws://' : 'wss://') +
      location.host +
      '/ws/websocket?clientid=web&Authorization=Bearer ' +
      getToken();
    socket = new WebSocket(webSocketUrl);
    socket.onopen = () => {
      handleTermEvent();
      // 等websocket初始化完成以后再从设备查询串口列表数据。
      handleGetSerial();
    };
    socket.onerror = handleTermEvent;
    socket.onmessage = (ev: MessageEvent) => {
      const message = ev.data;
      console.log(message);
      // 收到设备响应的消息，写入term 消息格式：type||serial||data
      if (message.startsWith('SERIAL_DATA||')) {
        const msgArr = message.split('||');
        if (selectedName.value == msgArr[1]) {
          term.value.write(msgArr[2]);
          term.value.prompt();
        }
      } else if (message.startsWith('SERIAL_SET||')) {
        // 消息格式：type||serial||result
        const msgArr = message.split('||');
        if (selectedName.value == msgArr[1]) {
          if (msgArr[2] == 'succeed') {
            serialOpened.value = true;
          } else {
            serialOpened.value = false;
          }
          term.value.write(msgArr[1] + (serialOpened.value ? ' connect succeed' : ' connect fail'));
          term.value.prompt();
        }
      } else if (message.startsWith('SERIAL_GET||')) {
        // 串口列表已经初始过
        if (nameOptions.value.length > 0) {
          return;
        }
        // 消息格式：type||serialList
        const msgArr = message.split('||');
        nameOptions.value = JSON.parse(msgArr[1]);
        // 加载串口下拉列表
        loadNameSelectList(nameOptions.value);
        term.value.write('Get serial succeed, Please select the serial and open it');
        term.value.prompt();
      }
      term.value.focus();
    };
  };

  const handleTermEvent = () => {
    term.value.focus();
    if (term.value._initialized) return;

    // 初始化
    term.value._initialized = true;
    // term.value.writeln('');
    // term.value.writeln('=================================================');
    // term.value.writeln('Welcome to \x1b[1;32mSerial Transmission\x1b[0m.');
    // term.value.writeln('=================================================');

    // 添加事件监听器，支持输入方法
    term.value.onKey((e) => {
      if (!serialOpened.value) {
        createMessage.warn('Please open serial port.');
        return;
      }
      const ev = e.domEvent;
      socket.send(ev.code);
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
      if (ev.code === 'Enter') {
        const sendCode = storagedCode.join('').trim();
        console.log(sendCode);
        // 调用http接口发送，不用websocket目的为了控制菜单权限
        // 空行也下发
        // if (sendCode) {
        handleSendSerialData(sendCode);
        storagedCode.length = 0;
        // }
        term.value.prompt();
      } else if (ev.code === 'Backspace') {
        // back 删除的情况
        if (term.value._core.buffer.x > 2) {
          term.value.write('\b \b');
          const storagedLen = storagedCode.length - 1;
          storagedCode.splice(storagedLen, 1);
        }
      } else if (printable) {
        term.value.write(e.key);
        storagedCode.push(e.key);
      }
    });

    term.value.onData((key) => {
      // 粘贴的情况
      if (key.length > 1) term.value.write(key);
    });
  };

  /**
   * 获取设备串口列表
   */
  const handleGetSerial = () => {
    getSerial(devSn.value);
  };

  /**
   * 加载串口下拉列表
   */
  const loadNameSelectList = (nameOptions: Record<string, any>[]) => {
    selectedName.value = nameOptions[0].name;
    updateSchema([
      {
        field: 'name',
        label: t('view.main.device.label.serial-name'),
        component: 'Select',
        componentProps: {
          options: nameOptions,
          fieldNames: { label: 'name', value: 'name' },
          onChange: (value: any) => {
            selectedName.value = value;
            serialOpened.value = false;
          },
        },
        defaultValue: selectedName,
        required: true,
        colProps: { span: 24 },
      },
    ]);
    nameLoading.value = false;
  };

  /**
   * 打开串口
   */
  const handleOpenSerial = async () => {
    const values = await validate();
    const { name, baudrate, databit, parity, stopbit } = values;
    openSerial(devSn.value, name, baudrate, databit, parity, stopbit);
  };

  /**
   * 发送串口数据
   */
  const handleSendSerialData = (sendCode: string) => {
    sendSerialData(devSn.value, selectedName.value, sendCode);
  };

  /**
   * 关闭Modal
   */
  const handleCancel = () => {
    if (socket != null) {
      socket.close();
    }
  };
</script>
