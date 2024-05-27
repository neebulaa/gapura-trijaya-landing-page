import { NavigationItems } from '@/commons/components/Navigate/NavigationItems';
import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// type MenuItem = Required<MenuProps>["items"][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(NavigationItems as LevelKeysProps[]);

export default function NavigationRender() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Get current path from url location
   */
  const currentPath =
    location.pathname !== '/'
      ? location.pathname.split('/').filter((path) => path)[1]
      : ['/'][1];

  /**
   * Get open keys from local storage
   */
  const localOpenKeys = localStorage.getItem('openKeys')
    ? JSON.parse(localStorage.getItem('openKeys') as string)
    : [];

  /**
   * State: open keys/active menu default from local storage
   */
  const [stateOpenKeys, setStateOpenKeys] = useState(localOpenKeys);
  // const [stateSelectedKeys, setStateSelectedKeys] = useState([]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key) {
      navigate(key);
    }
  };

  /**
   * Handle: open menu
   */
  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      const newOpenKeys = openKeys
        // remove repeat key
        .filter((_, index) => index !== repeatIndex)
        // remove current level all child
        .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]);

      setStateOpenKeys(newOpenKeys);
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    localStorage.setItem('openKeys', JSON.stringify(stateOpenKeys));
  }, [stateOpenKeys]);

  return (
    <Menu
      theme="light"
      mode="inline"
      items={NavigationItems}
      style={{ height: '100%' }}
      onClick={handleMenuClick}
      selectedKeys={[`/admin/${currentPath}`]}
      defaultSelectedKeys={[`/admin/${currentPath}`]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
    />
  );
}
