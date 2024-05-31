import { getItem } from '@/commons/lib/localStorage';
import { IUser } from '@/types/user';

const userData: IUser = getItem('userData')!;
// const { userData } = useUserStore.getState();

export const getCurrentUser = () => {
  return userData;
};

export const isSuperAdmin = (): boolean => {
  return userData?.roles!.includes('SuperAdmin');
};

export const isAdmin = (): boolean => {
  return userData?.roles!.includes('Admin');
};

export const isUser = (): boolean => {
  return userData?.roles!.includes('User');
};
