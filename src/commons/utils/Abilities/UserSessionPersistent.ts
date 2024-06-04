import { removeCookie } from '@/commons/lib/cookieStorage';
import { removeItem } from '@/commons/lib/localStorage';
import useAuthStore from '@/commons/store/useAuthStore';
import useUserStore from '@/commons/store/useUserStore';

export function UserSessionPersistent() {
  const { setUserData } = useUserStore((state) => state);
  const { setIsAuthenticated } = useAuthStore((state) => state);

  const LogoutUser = () => {
    removeCookie('token');
    removeCookie('isAuthenticated');
    removeItem('userData');

    setUserData(null);
    setIsAuthenticated(false, null);
  };

  return {
    LogoutUser,
  };
}
