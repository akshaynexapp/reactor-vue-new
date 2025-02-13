/*
 * @Description  :
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Hu
 * @LastEditTime : 2021-08-29 01:56:29
 * @FilePath     : \reactor-vue\src\components\registerGlobComp.ts
 */
import type { App } from 'vue';
import { Button } from './Button';
import {
  // Need
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button as AntButton,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  Modal,
  PageHeader,
  Popover,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app
    .use(Alert)
    .use(Avatar)
    .use(Badge)
    .use(Breadcrumb)
    .use(Button)
    .use(Card)
    .use(Checkbox)
    .use(Col)
    .use(DatePicker)
    .use(Descriptions)
    .use(Divider)
    .use(Drawer)
    .use(Dropdown)
    .use(Empty)
    .use(Form)
    .use(Image)
    .use(Input)
    .use(Layout)
    .use(List)
    .use(Menu)
    .use(Modal)
    .use(PageHeader)
    .use(Popover)
    .use(Radio)
    .use(Result)
    .use(Row)
    .use(Select)
    .use(Spin)
    .use(Space)
    .use(Steps)
    .use(Switch)
    .use(Table)
    .use(Tabs)
    .use(Tag)
    .use(Tooltip)
    .use(Transfer)
    .use(Tree)
    .use(TreeSelect)
    .use(Upload)
    .use(Input)
    .use(InputNumber);
}
