import { BaseModel } from '@/types/base';
import { IOrder } from '@/types/order';

export interface IShipment extends BaseModel {
  userId: string;
  orderId: string;
  trackNumber: string;
  status: string;
  totalQty: number;
  totalWeight: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  phone: string;
  email: string;
  cityId: string;
  provinceId: string;
  postcode: number;
  shippedBy: string;
  shippedAt: string;
  order: IOrder;
  deletedAt: string | null;
}
