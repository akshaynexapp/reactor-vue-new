import { changeAccountStatus } from '/@/api/system/accountManage';
import { getOrgTree } from '/@/api/system/orgManage';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { usePermission } from '/@/hooks/web/usePermission';
import { getPopupContainer } from '/@/utils';
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore();
const isSuperAdmin = userStore.getUserInfo.adminType === -1;

const { t } = useI18n();
const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: t('view.system.account.label.account'),
    dataIndex: 'account',
    width: 120,
  },
  {
    title: t('view.system.account.label.name'),
    dataIndex: 'name',
    width: 180,
  },
  /*   {
    title: t('view.system.account.label.sex'),
    dataIndex: 'sex',
    width: 120,
    customRender: ({ record }) => {
      const sex = record.sex;
      return ~~sex === 1
        ? t('view.system.account.label.sex-0')
        : t('view.system.account.label.sex-1');
    },
  }, */
  {
    title: t('view.system.account.label.adminType'),
    dataIndex: 'adminType',
    width: 120,
    customRender: ({ record }) => {
      const adminType = record.adminType;
      return ~~adminType === 1
        ? t('view.system.account.label.adminType-1')
        : t('view.system.account.label.adminType-0');
    },
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: t('common.enabled'),
        unCheckedChildren: t('common.disabled'),
        loading: record.pendingStatus,
        disabled: !hasPermission('sysUser:changeStatus'),
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 0 : 1;
          changeAccountStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('view.system.account.label.orgName'),
    dataIndex: 'orgName',
    width: 250,
  },
  {
    title: t('view.system.account.label.phone'),
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: t('view.system.account.label.email'),
    dataIndex: 'email',
    width: 180,
  },
  {
    title: t('common.createUser'),
    dataIndex: 'createUsername',
    width: 150,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: t('view.system.account.label.account'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: t('view.system.account.label.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'adminType',
    label: t('view.system.account.label.adminType'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        {
          label: t('view.system.account.label.adminType-1'),
          value: 1,
          key: '1',
        },
        {
          label: t('view.system.account.label.adminType-0'),
          value: 0,
          key: '0',
        },
      ],
    },
  },
  {
    field: 'searchStatus',
    label: t('common.status'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        {
          label: t('common.enabled'),
          value: 0,
          key: '0',
        },
        {
          label: t('common.disabled'),
          value: 1,
          key: '1',
        },
      ],
    },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
    colProps: { span: 12 },
  },
  {
    field: 'account',
    label: t('view.system.account.label.account'),
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'name',
    label: t('view.system.account.label.name'),
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  /*   {
    field: 'sex',
    label: t('view.system.account.label.sex'),
    component: 'Select',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      options: [
        {
          label: t('view.system.account.label.sex-0'),
          value: 1,
          key: '1',
        },
        {
          label: t('view.system.account.label.sex-1'),
          value: 2,
          key: '2',
        },
      ],
    },
  }, */
  /* {
    field: 'birthday',
    label: t('view.system.account.label.birthday'),
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      mode: 'date',
    },
    colProps: { span: 12 },
  }, */
  {
    field: 'pwd',
    label: t('view.system.account.label.pwd'),
    component: 'InputPassword',
    required: true,
    ifShow: false,
    colProps: { span: 12 },
  },
  {
    label: t('view.system.account.label.role'),
    field: 'grantRoleIdList',
    component: 'Select',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'orgId',
    label: t('view.system.account.label.org'),
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgTree,
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'value',
      },
      getPopupContainer: getPopupContainer,
    },
    required: true,
    colProps: { span: 12 },
  },
  {
    label: t('view.system.account.label.phone'),
    field: 'phone',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    label: t('view.system.account.label.email'),
    field: 'email',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    label: t('view.system.account.label.adminType'),
    field: 'adminType',
    component: 'RadioButtonGroup',
    colProps: { span: 12 },
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: t('view.system.account.label.adminType-1'),
          value: 1,
          key: '1',
        },
        {
          label: t('view.system.account.label.adminType-0'),
          value: 0,
          key: '0',
        },
      ],
    },
    ifShow: isSuperAdmin,
  },
];
