import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationRender from '../Navigate/NavigationRender';
import LayoutHeader from './Partials/LayoutHeader';
import '@/commons/assets/css/admin.scss';
import { motion } from 'framer-motion';
import { pageTransition, pageVariants } from '@/commons/lib/framer-motion/fade';

const { Content, Footer, Sider } = Layout;

export default function RootLayout() {
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutHeader
        collapsed={collapsed}
        index={index}
        title={title!}
        prevRoute={prevRoute}
      />
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
          className={`content-wrapper overflow-y-auto ${
            collapsed ? 'collapsed' : ''
          }`}
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
                handleIndex: (status: boolean) => handleIndex(status),
                handleTitle: (title: string) => handleTitle(title),
                handlePrevRoute: (data: string) => handlePrevRoute(data),
              }}
            />
          </motion.div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Awesome App ©{new Date().getFullYear()} Created by
          <span className="text-blue-900"> BU Developer</span>
        </Footer>
      </Layout>
    </Layout>
  );
}
