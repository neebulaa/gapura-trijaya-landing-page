import useAuthStore from '@/commons/store/useAuthStore';
import { me } from '@/services/api/auth.service';
import { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore((state) => state);
  //   const isAuthenticated = getCookie('isAuthenticated') ? true : false;
  //   console.log(isAuthenticated, token);
  try {
    me().then((res) => {
      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
