import useAuthStore from '@/commons/store/useAuthStore';
import { me } from '@/services/api/auth.service';
import { useEffect, type ReactElement } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '@/commons/store/useUserStore.ts';

interface Props {
  children: ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore((state) => state);
  const { userData } = useUserStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUserRole = () => {
    const roles = userData?.roles ?? [];
    const isAdmin = roles.some((role: string) =>
      ['superadmin', 'admin'].includes(role.toLowerCase()),
    );

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const isAuthPage = ['/login', '/register'].includes(location.pathname);
    const isAdminPage = location.pathname.includes('/admin');
    const targetPath = isAdmin ? '/admin' : '/';

    if (isAdminPage) {
      navigate(targetPath);
    }

    if (isAuthPage) {
      navigate(targetPath);
    }
  };

  useEffect(() => {
    checkUserRole();
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
