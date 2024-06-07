import IconOutlineLocation from '@/commons/assets/icons/IconOutlineLocation';
import IconPackage from '@/commons/assets/icons/IconPackage';
import IconSettings from '@/commons/assets/icons/IconSettings';
import IconTrophy from '@/commons/assets/icons/IconTrophy';
import IconUser from '@/commons/assets/icons/IconUser';
import useProfileController from '@/pages/Profile/ProfileController';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {
    if (path == '/profile') {
      navigate('/profile/personal-information');
    }
  }, [path]);

  /** Controller */
  const {} = useProfileController();

  return (
    <section className="container container-sidebar" id="my-profile">
      <div className="container-sidebar-left">
        <div
          className="flex items-center"
          style={{
            height: '43.59px',
          }}
        >
          <h2 className="container-sidebar-header-left container-sidebar-title">My Profile</h2>
        </div>
        <div className="card-bordered">
          <section className="my-profile-profile">
            <img
              src={`${import.meta.env.VITE_APP_URL}./images/people/people1.png`}
              alt={`${import.meta.env.VITE_APP_NAME} - people`}
            />
            <div className="my-profile-profile-desc">
              <p>
                Member <IconTrophy width="14" height="14" />
              </p>
              <h3 className="semibold">Edwin Hendly</h3>
            </div>
          </section>
          <section className="my-profile-navigations">
            <NavLink to="/profile/personal-information">
              <div className="flex items-center gap-05">
                <IconUser width="24" height="24" />
                Personal Information
              </div>
            </NavLink>
            <NavLink to="/profile/orders">
              <div className="flex items-center gap-05">
                <IconPackage width="24" height="24" />
                My Orders
              </div>
            </NavLink>
            <NavLink to="/profile/manage-addresses">
              <div className="flex items-center gap-05">
                <IconOutlineLocation width="24" height="24" />
                Manage Addresses
              </div>
            </NavLink>
            <NavLink to="/profile/settings">
              <div className="flex items-center gap-05">
                <IconSettings width="24" height="24" />
                Settings
              </div>
            </NavLink>
          </section>
        </div>
      </div>
      <div className="container-sidebar-right">
        <div className="flex items-center gap-1 justify-between flex-wrap">
          <h2 className="container-sidebar-title"></h2>
          <Input size="large" className="w-1/3" placeholder="Search" prefix={<SearchOutlined />} />
        </div>
        <div className="card-bordered my-profile-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
