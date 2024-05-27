import {
    FolderOutlined,
    PieChartOutlined,
    UserOutlined
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
    getItem('Category', 'categories', null),
    getItem('Product', 'products', null),
  ]),
  getItem('User', 'user', <UserOutlined />),
];
