import useAuthStore from '@/commons/store/useAuthStore';
import { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

export default function PublicRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? children : <Navigate to="/dashboard" />;
}
