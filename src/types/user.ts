import { BaseModel } from '@/types/base';

export interface IUser extends BaseModel {
  firstName: string;
  lastName?: string;
  email: string;
  emailVerifiedAt: Date;
  googleId?: null;
  avatar: null;
  roles?: string[];
  permissions?: string[];
}

export interface CreateUserDto extends IUser {}
export interface UpdateUserDto extends IUser {}
