import { IAttribute } from '@/types/attribute';
import { BaseModel } from '@/types/base';

export interface IAttributeOption extends BaseModel {
  attributeId?: string;
  name: string;
  attribute?: IAttribute;
}

export interface CreateAttributeOptionDto extends IAttributeOption {}
export interface UpdateAttributeOptionDto extends IAttributeOption {}
