import { BaseModel } from '@/types/base';
import { ICategory } from '@/types/category';

export interface IProduct extends BaseModel {
  parentId: null;
  userId: string;
  sku: string;
  type: string;
  name: string;
  slug: string;
  price: number;
  weight: null;
  width: null;
  height: null;
  length: null;
  shortDescription: string;
  description: string;
  status: number;
  categories: ICategory[];
  images: any[];
}

export interface CreateProductDto extends IProduct {}
export interface UpdateProductDto extends IProduct {}
