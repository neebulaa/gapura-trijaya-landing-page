import { BaseModel, QueryParams } from '@/types/base.ts';
import { IUser } from '@/types/user.ts';
import { Dayjs } from 'dayjs';

export enum PromoStatusEnum {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum DiscountTypeEnum {
  AMOUNT = 'amount',
  PERCENT = 'percent',
}

export enum PromoTypeEnum {
  CODE = 'code',
  QTY = 'qty',
}

export interface IPromo extends BaseModel {
  id: string;
  name: string;
  code: string;
  discountAmount: number;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
  description?: string;
  status: PromoStatusEnum;
  discountType: DiscountTypeEnum;
  promoType: PromoTypeEnum;
  createdById: string;
  createdBy?: IUser;
  updatedById: string;
  updatedBy?: IUser;
}

export interface CreatePromoDto {
  name?: string;
  code?: string;
  discountAmount?: number;
  discountPercent?: number;
  startDate?: Date | Dayjs | string;
  endDate?: Date | Dayjs | string;
  description?: string;
  discountType?: DiscountTypeEnum;
  promoType?: PromoTypeEnum;
}

export interface UpdatePromoDto extends CreatePromoDto {}

export interface PromoQuery extends QueryParams {}
