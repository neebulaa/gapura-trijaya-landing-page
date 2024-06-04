import { BaseModel } from '@/types/base';

export interface IProductImage extends BaseModel {
  productId: string;
  path: string;
  secondary: number;
  extraLarge: null;
  large: string;
  medium: string;
  small: string;
}
