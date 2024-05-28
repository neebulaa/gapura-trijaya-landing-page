import { IAttribute } from '@/types/attribute';
import { BaseModel } from '@/types/base';

export interface IAttributeOption extends BaseModel {
  attributeId: string;
  name: string;
  attribute: IAttribute;
}
