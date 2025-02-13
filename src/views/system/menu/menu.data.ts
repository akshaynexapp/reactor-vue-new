import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '/@/components/Icon/Icon.vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { getI18nMenuTree } from './menu.service';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.menu.label.title'),
    dataIndex: 'title',
    width: 180,
    align: 'left',
    customRender: ({ record }) => {
      return t(record.title);
    },
  },
  {
    title: t('view.system.menu.label.type'),
    dataIndex: 'type',
    slots: { customRender: 'type' },
    width: 80,
  },
  {
    title: t('view.system.menu.label.icon'),
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: t('view.system.menu.label.component'),
    dataIndex: 'component',
    align: 'left',
    width: 180,
  },
  {
    title: t('view.system.menu.label.permCode'),
    dataIndex: 'permission',
    width: 120,
    align: 'left',
  },
  {
    title: t('view.system.menu.label.weight'),
    dataIndex: 'weight',
    width: 80,
    customRender: ({ record }) => {
      return ~~record.weight === 1
        ? t('view.system.menu.label.weight-1')
        : t('view.system.menu.label.weight-0');
    },
    align: 'left',
  },
  {
    title: t('view.system.menu.label.isShow'),
    dataIndex: 'hideMenu',
    width: 80,
    customRender: ({ record }) => {
      const hideMenu = record.hideMenu;
      const enable = ~~hideMenu === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.yesText') : t('common.noText');
      return h(Tag, { color: color }, () => text);
    },
  },
];

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: t('view.system.menu.label.type'),
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('view.system.menu.label.dir'), value: 0 },
        { label: t('view.system.menu.label.menu'), value: 1 },
        { label: t('view.system.menu.label.button'), value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: t('view.system.menu.label.title'),
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: t('view.system.menu.label.name'),
    component: 'Input',
    required: ({ values }) => isMenu(values.type),
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'pid',
    label: t('view.system.menu.label.parent'),
    component: 'ApiTreeSelect',
    componentProps: {
      api: getI18nMenuTree,
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'value',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'icon',
    label: t('view.system.menu.label.icon'),
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: t('view.system.menu.label.component'),
    component: 'Input',
    defaultValue: 'LAYOUT',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'redirect',
    label: t('view.system.menu.label.redirect'),
    component: 'Input',
    ifShow: ({ values }) => isDir(values.type),
  },
  {
    field: 'path',
    label: t('view.system.menu.label.path'),
    component: 'Input',
    required: ({ values }) => !isButton(values.type),
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'frameSrc',
    label: t('view.system.menu.label.frameSrc'),
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'carryParam',
    label: t('view.system.menu.label.carryParam'),
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('common.yesText'), value: 1 },
        { label: t('common.noText'), value: 0 },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'permission',
    label: t('view.system.menu.label.permCode'),
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'ignoreKeepAlive',
    label: t('view.system.menu.label.ignoreKeepAlive'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.yesText'), value: 0 },
        { label: t('common.noText'), value: 1 },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'hideMenu',
    label: t('view.system.menu.label.isShow'),
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('common.yesText'), value: 0 },
        { label: t('common.noText'), value: 1 },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'weight',
    label: t('view.system.menu.label.weight'),
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('view.system.menu.label.weight-0'), value: 0 },
        { label: t('view.system.menu.label.weight-1'), value: 1 },
      ],
    },
  },
  {
    field: 'sort',
    label: t('common.sort'),
    component: 'InputNumber',
    defaultValue: 1,
    required: true,
  },
  {
    field: 'remark',
    label: t('common.remark'),
    component: 'InputTextArea',
    colProps: { lg: 24, md: 24 },
  },
];
