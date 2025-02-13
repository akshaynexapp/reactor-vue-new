/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-09-25 01:24:57
 * @FilePath     : \reactor_web_3.0\src\views\device\device.data.ts
 */
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { Fflow } from '/@/utils/reactorUtil';
import { formatDurationFromSecond } from '/@/utils/dateUtil';
import { getPopupContainer } from '/@/utils';
import { getOrgTree } from '/@/api/system/orgManage';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  // {
  //   title: t('view.main.common.label.devSn'),
  //   dataIndex: 'devSn',
  //   width: 200,
  //   align: 'left',
  //   slots: { customRender: 'devSn' },
  // },
  {
    title: 'District',
    dataIndex: 'ext02',
    width: 200,
    align: 'left',
    // slots: { customRender: 'devSn' },
  },
  {
    title: t('view.main.device.label.name'),
    dataIndex: 'name',
    edit: true,
    width: 150,
  },
  {
    title: t('view.main.device.label.netType'),
    dataIndex: 'netType',
    width: 100,
    align: 'right',
  },
  {
    title: t('view.main.device.label.simType'),
    dataIndex: 'simType',
    customRender: ({ record }) => {
      return record.simType == undefined ? 'sim1' : record.simType;
    },
    width: 150,
  },
  {
    title: t('view.main.device.label.operator'),
    dataIndex: 'operator',
    customRender: ({ record }) => {
      // �����豸����ʾsim����Ϣ������credo�豸�ϱ�china mobile���쳣����
      if (!record.online) {
        return '';
      }
      const simType = record.simType == undefined ? 'sim1' : record.simType;
      return record[simType]?.operator;
    },
    width: 150,
  },
  {
    title: 'ICCID',
    dataIndex: 'iccid',
    customRender: ({ record }) => {
      // �����豸����ʾsim����Ϣ������credo�豸�ϱ�china mobile���쳣����
      if (!record.online) {
        return '';
      }
      const simType = record.simType == undefined ? 'sim1' : record.simType;
      return record[simType]?.iccid;
    },
    width: 200,
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    edit: true,
    editComponent: 'Input',
    width: 180,
  },
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    edit: true,
    editComponent: 'Input',
    width: 180,
  },
  {
    // title: t('view.main.device.label.location'),
    title: 'School Name',
    dataIndex: 'location',
    edit: true,
    width: 300,
  },
  {
    // title: t('view.main.device.label.statusFlag'),
    title: 'School Code',
    dataIndex: 'statusFlag',
    edit: true,
    editComponent: 'Select',
    editComponentProps: {
      options: [
        { label: 'Provisioned', value: 'Provisioned' },
        { label: 'Replaced/Defected', value: 'Replaced/Defected' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
    },
    width: 250,
  },
  {
    // title: t('view.main.common.label.orgName'),
    title: 'Mandal',
    dataIndex: 'orgName',
    width: 200,
  },
  {
    title: t('view.main.device.label.hardVer'),
    dataIndex: 'hardVer',
    width: 120,
  },
  {
    title: 'Lan IP',
    dataIndex: 'lanIp',
    width: 150,
  },
  {
    title: 'Wan IP',
    dataIndex: 'wanIp',
    width: 150,
  },
  {
    title: t('view.main.device.label.softVer'),
    dataIndex: 'softVer',
    width: 350,
  },
  {
    title: t('view.main.device.label.cpuUse'),
    dataIndex: 'cpuUse',
    width: 100,
    align: 'right',
  },
  {
    title: t('view.main.device.label.memUse'),
    dataIndex: 'memUse',
    width: 100,
    align: 'right',
  },
  {
    title: t('view.main.device.label.dayFlow'),
    dataIndex: 'dayFlow',
    customRender: ({ record }) => {
      return h(Tag, { color: 'blue' }, () => Fflow(record.dayFlow));
    },
    width: 120,
    align: 'right',
  },
  {
    title: t('view.main.device.label.monthFlow'),
    dataIndex: 'monthFlow',
    customRender: ({ record }) => {
      return h(Tag, { color: 'blue' }, () => Fflow(record.monthFlow));
    },
    width: 120,
    align: 'right',
  },
  {
    title: t('view.main.device.label.loginTime'),
    dataIndex: 'loginTime',
    width: 120,
  },
  {
    title: t('view.main.device.label.heartbeat'),
    dataIndex: 'heartbeat',
    width: 120,
  },
  {
    title: t('view.main.device.label.uptime'),
    dataIndex: 'uptime',
    customRender: ({ record }) => {
      return formatDurationFromSecond(record.uptime);
    },
    width: 150,
  },
  {
    title: 'Remark',
    dataIndex: 'ext02',
    edit: true,
    width: 250,
  },
];

export const devListcolumns: BasicColumn[] = [
  {
    title: t('view.main.common.label.devSn'),
    dataIndex: 'devSn',
    width: 200,
    align: 'left',
    slots: { customRender: 'devSn' },
  },
  {
    title: t('view.main.device.label.name'),
    dataIndex: 'name',
    width: 150,
  },

  {
    title: t('view.main.device.label.location'),
    dataIndex: 'location',
    width: 300,
  },

  {
    title: t('view.main.device.label.statusFlag'),
    dataIndex: 'statusFlag',
    width: 250,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'devSn',
    label: t('view.main.common.label.devSn'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: t('view.main.device.label.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'iccid',
    label: 'ICCID',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'netType',
    label: 'NetType',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'location',
    label: 'Location',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'operator',
    label: t('view.main.device.label.operator'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'lanIp',
    label: 'Lan IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'wanIp',
    label: 'Wan IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'statusFlag',
    label: t('view.main.device.label.statusFlag'),
    component: 'Select',
    componentProps: {
      options: [
        { label: 'Provisioned', value: 'Provisioned' },
        { label: 'Replaced/Defected', value: 'Replaced/Defected' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const devSearchFormSchema: FormSchema[] = [
  {
    field: 'devSn',
    label: t('view.main.common.label.devSn'),
    component: 'Input',
    colProps: { span: 9 },
  },
  {
    field: 'name',
    label: t('view.main.device.label.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const adjustOrgFormSchema: FormSchema[] = [
  {
    field: 'orgId',
    label: t('view.system.account.label.org'),
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgTree,
      replaceFields: {
        title: 'title',
        key: 'id',
        value: 'value',
      },
      getPopupContainer: getPopupContainer,
    },
    required: true,
    colProps: { span: 24 },
  },
];

// ������������
export const serialFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('view.main.device.label.serial-name'),
    component: 'Select',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'baudrate',
    label: t('view.main.device.label.serial-baudrate'),
    component: 'Select',
    componentProps: {
      options: [
        { label: '300', value: '300' },
        { label: '600', value: '600' },
        { label: '1200', value: '1200' },
        { label: '2400', value: '2400' },
        { label: '4800', value: '4800' },
        { label: '9600', value: '9600' },
        { label: '19200', value: '19200' },
        { label: '38400', value: '38400' },
        { label: '57600', value: '57600' },
        { label: '115200', value: '115200' },
      ],
    },
    defaultValue: '115200',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'databit',
    label: t('view.main.device.label.serial-databit'),
    component: 'Select',
    componentProps: {
      options: [
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
      ],
    },
    defaultValue: '8',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'parity',
    label: t('view.main.device.label.serial-parity'),
    component: 'Select',
    componentProps: {
      options: [
        { label: 'none', value: 'none' },
        { label: 'even', value: 'even' },
        { label: 'odd', value: 'odd' },
      ],
    },
    defaultValue: 'none',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'stopbit',
    label: t('view.main.device.label.serial-stopbit'),
    component: 'Select',
    componentProps: {
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    defaultValue: '1',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'status',
    label: t('view.main.device.label.serial-status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
      ],
    },
    show: false,
    defaultValue: '1',
    required: true,
    colProps: { span: 24 },
  },
];
