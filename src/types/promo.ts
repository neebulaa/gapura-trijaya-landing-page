import { BaseModel, QueryParams } from '@/types/base.ts';
import { IUser } from '@/types/user.ts';
import { Dayjs } from 'dayjs';
import { IProduct } from '@/types/product.ts';

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
  promoDetails?: IPromoDetail[];
  maxUsage: number;
  usageCount: number;
}

export interface IPromoDetail extends BaseModel {
  id: string;
  promoId: string;
  promo: IPromo;
  productId: string;
  product: IProduct;
  qty: number;
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
  promoDetails?: CreatePromoDetailDto[];
  maxUsage?: number;
}

export interface UpdatePromoDto extends CreatePromoDto {
  promoDetails?: UpdatePromoDetailDto[];
}

export interface CreatePromoDetailDto {
  productId?: string;
  product?: IProduct;
  qty?: number;
}

export interface UpdatePromoDetailDto extends CreatePromoDetailDto {
  id?: string;
}

export interface PromoQuery extends QueryParams {
  promoType?: PromoTypeEnum;
}
