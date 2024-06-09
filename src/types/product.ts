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
  shortDescription: string;
  description: string;
  attributes?: any;
  status: number;
  categories: ICategory[];
  images: any[];
  variants?: IProduct[];
  productInventory?: IProductInventory | any;
}

export interface CreateProductDto extends IProduct {}
export interface UpdateProductDto extends IProduct {}

export interface ProductQueryParams extends QueryParams {
  isConfigurable?: boolean;
}

export interface IProductVariant extends BaseModel {
  sku: string;
  name: string;
  price: number;
  weight: number;
  status: number;
}

export interface IProductInventory extends BaseModel {
  qty: number;
  productId: string;
  variantId: string;
}
