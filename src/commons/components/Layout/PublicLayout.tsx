import { Outlet } from 'react-router-dom';
import LayoutNavbar from './HomeLayout/LayoutNavbar';

export default function PublicLayout() {
  return (
    <>
      <LayoutNavbar />
      <Outlet />
    </>
  );
}
