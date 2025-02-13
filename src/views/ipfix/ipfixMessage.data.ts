/*
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-06-14 23:18:51
 * @FilePath     : \reactor-vue\src\views\log\access\accessLog.data.ts
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
// import { useI18n } from '/@/hooks/web/useI18n';

// const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: 'Dev SN',
    dataIndex: 'devSn',
  },
  {
    title: 'Agent ID',
    dataIndex: 'agentId',
  },
  {
    title: 'Export Time',
    dataIndex: 'exportTime',
  },
  {
    title: 'Length',
    dataIndex: 'length',
  },
  {
    title: 'Sequence No',
    dataIndex: 'sequenceNo',
  },
  {
    title: 'Domain Id',
    dataIndex: 'domainId',
  },
  {
    title: 'Flow Start Time',
    dataIndex: 'flowStartTime',
  },
  {
    title: 'Flow End Time',
    dataIndex: 'flowEndTime',
  },
  {
    title: 'Flow Direction',
    dataIndex: 'flowDirection',
  },
  {
    title: 'In Bytes',
    dataIndex: 'inBytes',
  },
  {
    title: 'In Packets',
    dataIndex: 'inPackets',
  },
  {
    title: 'Out Bytes',
    dataIndex: 'outBytes',
  },
  {
    title: 'Out Packets',
    dataIndex: 'outPackets',
  },
  {
    title: 'Proto',
    dataIndex: 'proto',
  },
  {
    title: 'Src IP',
    dataIndex: 'srcIp',
  },
  {
    title: 'Src Port',
    dataIndex: 'srcPort',
  },
  {
    title: 'Src Mask',
    dataIndex: 'srcMask',
  },
  {
    title: 'Ingress Interface',
    dataIndex: 'inIf',
  },
  {
    title: 'Dst IP',
    dataIndex: 'dstIp',
  },
  {
    title: 'Dst Port',
    dataIndex: 'dstPort',
  },
  {
    title: 'Dst Mask',
    dataIndex: 'dstMask',
  },
  {
    title: 'Egress Interface',
    dataIndex: 'outIf',
  },
  {
    title: 'Next Hop Ip',
    dataIndex: 'nextHopIp',
  },
  {
    title: 'BGP Src As Num',
    dataIndex: 'bgpSrcAsNum',
  },
  {
    title: 'BGP Dst As Num',
    dataIndex: 'bgpDstAsNum',
  },
  {
    title: 'BGP Next Hop IP',
    dataIndex: 'bgpNextHopIp',
  },
  {
    title: 'Obs Domain Id',
    dataIndex: 'observationDomainId',
  },
  {
    title: 'ICMP Type',
    dataIndex: 'icmpType',
  },
  {
    title: 'Biflow Direction',
    dataIndex: 'biflowDirection',
  },
  {
    title: 'Ethernet Type',
    dataIndex: 'ethernetType',
  },
  {
    title: 'HTTP Request Target',
    dataIndex: 'httpRequestTarget',
  },
  {
    title: 'Create Time',
    dataIndex: 'createTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'tableDate',
    label: 'Table Date',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      mode: 'date',
    },
    colProps: { span: 8 },
  },
  {
    field: 'devSn',
    label: 'Dev SN',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'proto',
    label: 'Proto',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'ICMP', value: 'ICMP' },
        { label: 'TCP', value: 'TCP' },
        { label: 'UDP', value: 'UDP' },
        { label: 'ICMPv6', value: 'ICMPv6' },
        { label: 'SCTP', value: 'SCTP' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'ethernetType',
    label: 'EthernetType',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'ARP', value: 'ARP' },
        { label: 'IPv4', value: 'IPv4' },
        { label: 'IPv6', value: 'IPv6' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'srcIp',
    label: 'Src IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'srcPort',
    label: 'Src Port',
    component: 'InputNumber',
    colProps: { span: 8 },
  },
  {
    field: 'dstIp',
    label: 'Dst IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dstPort',
    label: 'Dst Port',
    component: 'InputNumber',
    colProps: { span: 8 },
  },
];
