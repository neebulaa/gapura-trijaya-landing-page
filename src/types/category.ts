import { BaseModel } from '@/types/base';

export interface ICategory extends BaseModel {
  parentId: string;
  name: string;
  slug: string;
  primary: number;
  childs: any[];
}
