import useAuthStore from '@/commons/store/useAuthStore';
import { me } from '@/services/api/auth.service';
import { useEffect, type ReactElement } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const res = await me();
        const roles = res.data?.roles?.map((role: string) => role.toLowerCase());

        if (roles.includes('superadmin') || roles.includes('admin')) {
          if (location.pathname === '/login' || location.pathname === '/register') {
            navigate('/admin');
          }
          // disable this becuase no roles with name 'user'
          // } else if (roles.includes('user')) {
          //   navigate('/');
        } else {
          navigate('/'); // Redirect to login if no role matches
        }
      } catch (err) {
        console.log('PrivateRoute Err: ', err);
        navigate('/login'); // Redirect to login on error
      }
    };

    if (isAuthenticated) {
      checkUserRole();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
