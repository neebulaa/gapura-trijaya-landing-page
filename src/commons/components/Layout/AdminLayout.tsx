import '@/commons/assets/css/admin.scss';
import { pageTransition, pageVariants } from '@/commons/lib/framer-motion/fade';
import useAuthStore from '@/commons/store/useAuthStore';
import { INotification } from '@/types/global/notification';
import { App, Layout } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationRender from '../Navigate/NavigationRender';
import LayoutHeader from './Partials/LayoutHeader';

const { Content, Footer, Sider } = Layout;

export default function RootLayout() {
  const { notification } = App.useApp();
  const openNotification = (notificationDto: INotification) => {
    const { type, title, message, duration = 4.5 } = notificationDto;

    notification[type]({
      message: title,
      description: message,
      duration: duration,
      placement: 'bottomRight',
    });
  };

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [index, setIndex] = useState<boolean>(true);
  const [title, setTitle] = useState<string>();
  const [prevRoute, setPrevRoute] = useState<string>();

  const handleIndex = (status: boolean) => {
    setIndex(status);
  };

  const handleTitle = (title: string) => {
    setTitle(title);
  };

  const handlePrevRoute = (data: string) => {
    setPrevRoute(data);
  };

  const { isAuthenticated, token } = useAuthStore((state) => state);

  return (
    <>
      {isAuthenticated && token && (
        <Layout style={{ minHeight: '100vh' }}>
          <LayoutHeader collapsed={collapsed} index={index} title={title!} prevRoute={prevRoute} />
          <Sider
            className={`site-layout-background sider-layout ${
              collapsed ? 'collapsed' : 'not-collapsed'
            }`}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className={`menu-wrapper overflow-y-auto`}>
              <NavigationRender />
            </div>
          </Sider>
          <Layout className={`layout-wrapper ${collapsed ? 'collapsed' : ''}`}>
            <Content
              className={`content-wrapper overflow-y-auto overflow-x-hidden ${collapsed ? 'collapsed' : ''}`}
            >
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Outlet
                  context={{
                    openNotification: (notificationDto: INotification) =>
                      openNotification(notificationDto),
                    handleIndex: (status: boolean) => handleIndex(status),
                    handleTitle: (title: string) => handleTitle(title),
                    handlePrevRoute: (data: string) => handlePrevRoute(data),
                  }}
                />
              </motion.div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              {import.meta.env.VITE_APP_NAME} v0.0.1 | ©{new Date().getFullYear()}
              <span className="text-blue-900"> Gapura Digital Indonesia</span>
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
}
