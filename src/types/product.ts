import { BaseModel, QueryParams } from '@/types/base';
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
  qty?: null;
  shortDescription: string;
  description: string;
  status: number;
  categories: ICategory[];
  images: any[];
  variants?: IProduct[];
}

export interface CreateProductDto extends IProduct {}
export interface UpdateProductDto extends IProduct {}

export interface ProductQueryParams extends QueryParams {
  isConfigurable?: boolean;
}

export interface IProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  qty: number;
  weight: number;
  status: number;
}