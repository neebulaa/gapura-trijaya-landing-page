import IconCart from '@/commons/assets/icons/IconCart';
import IconChevronDown from '@/commons/assets/icons/IconChevronDown';
import IconSearch from '@/commons/assets/icons/IconSearch';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function LayoutNavbar() {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openCartPopup, setOpenCartPopup] = useState<boolean>(false);
  const [openNavProfileDropdown, setOpenNavProfileDropdown] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth <= 768;
  });

  const user = null;

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('scroll', handleScroll);
    addEventListener('resize', handleResize);

    return () => {
      removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section id="navbar-container" className={`${scrolled ? 'scrolled' : ''}`}>
        <section
          className="container"
          style={{
            paddingBlock: 0,
          }}
        >
          <nav className="navbar">
            <img
              src={`${import.meta.env.VITE_APP_URL}./images/logo.png`}
              alt={`${import.meta.env.VITE_APP_NAME} - logo`}
            />
            <div className="nav-info">
              <ul className="nav-links">
                <li>
                  <NavLink to="/" onClick={() => setOpenSidebar(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop" onClick={() => setOpenSidebar(false)}>
                    Shop
                  </NavLink>
                </li>
                {user && (
                  <li>
                    <NavLink to="my-poin" onClick={() => setOpenSidebar(false)}>
                      My poin
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/contact" onClick={() => setOpenSidebar(false)}>
                    Contact
                  </NavLink>
                </li>
              </ul>

              <ul className="nav-action">
                <li>
                  <IconSearch width={'20'} height={'20'} />
                </li>
                <li>
                  {!isMobile && (
                    <div onClick={() => setOpenCartPopup(true)}>
                      <IconCart width={'20'} height={'20'} />
                    </div>
                  )}

                  {openCartPopup}
                  {/* {openCartPopup && <CartPopup close={() => setOpenCartPopup(false)} />} */}

                  {isMobile && (
                    <Link to="/cart" onClick={() => setOpenSidebar(false)}>
                      <IconCart width={'20'} height={'20'} />
                    </Link>
                  )}
                </li>
                {!user && (
                  <li>
                    <Link to="/login" onClick={() => setOpenSidebar(false)}>
                      <button className="btn">Login</button>
                    </Link>
                  </li>
                )}
                {user && (
                  <li
                    className="nav-profile"
                    onClick={() => setOpenNavProfileDropdown((prev) => !prev)}
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_URL}./images/people/people1.png`}
                      alt={`${import.meta.env.VITE_APP_NAME} - people 1`}
                    />
                    <p>{`Username`}</p>
                    <IconChevronDown width="20" height="20" />

                    {openNavProfileDropdown && (
                      <div
                        className="nav-profile-dropdown"
                        style={{
                          top: isMobile ? '-500%' : '120%',
                          left: '0',
                        }}
                      >
                        <Link to="/profile">Profile</Link>
                        <a href="">Dashboard</a> {/* for admin */}
                        <button onClick={() => console.log('logout')}>Logout</button>
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>
            <div
              className={`burger ${openSidebar ? 'open' : ''}`}
              onClick={() => setOpenSidebar((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </section>
      </section>
    </>
  );
}
