import { Outlet } from 'react-router-dom';
import LayoutNavbar from '@/commons/components/Layout/HomeLayout/LayoutNavbar';
import '@/commons/assets/css/init.css';
import '@/commons/assets/css/utils.css';
import '@/commons/assets/css/font.css';
import '@/commons/assets/css/keyframes.css';
import '@/commons/assets/css/index.css';
import '@/commons/assets/css/responsive.css';
import Footer from '@/commons/components/Public/Footer';
import { App as AntdApp } from 'antd';
import SearchModal from '@/commons/components/SearchModal/SearchModal.tsx';

export default function PublicLayout() {
  return (
    <>
      <AntdApp>
        <LayoutNavbar />
        <section
          style={{
            marginTop: '100px', // this is how many pxs the fixed navbar is
          }}
        >
          <SearchModal />
          <Outlet />
        </section>
        <Footer />
      </AntdApp>
    </>
  );
}
