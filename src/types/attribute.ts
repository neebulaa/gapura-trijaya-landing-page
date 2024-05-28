import { BaseModel } from './base';

export interface IAttribute extends BaseModel {
  code: string;
  name: string;
  type: string;
  validation: null;
  isRequired: number;
  isUnique: number;
  isFilterable: number;
  isConfigurable: number;
  options: Option[];
}

export interface Option {
  id: string;
  attributeId: BaseModel['id'];
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
