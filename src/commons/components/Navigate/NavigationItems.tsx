import {
  FolderOutlined,
  PieChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    // key,
    key: `/admin${key ? `/${key}` : ''}`,
    icon,
    children,
    label,
  } as MenuItem;
}

export const NavigationItems: MenuItem[] = [
  getItem('Dashboard', '', <PieChartOutlined />),
  // getItem('Product', 'product', <ProductOutlined />),
  getItem('Catalog', 'catalog', <FolderOutlined />, [
    // getItem('Employee', 'master-employee', null, [
    //     getItem('Employee', 'employee', null),
    //     getItem('Division', 'division', null),
    // ]),
    getItem('Product', 'products', null),
    getItem('Category', 'categories', null),
    getItem('Attribute', 'attributes', null),
  ]),
  getItem('Order', 'orders', <ShoppingCartOutlined />, [
    getItem('Order', 'orders', null),
    getItem('Shipment', 'shipments', null),
  ]),
  getItem('User', 'users', <UserOutlined />),
  getItem('Setting', 'setting', <SettingOutlined />),
];
