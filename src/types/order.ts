import { BaseModel } from '@/types/base';

export interface IOrder extends BaseModel {
  userId: null;
  code: string;
  status: string;
  orderDate: Date | any;
  paymentDue: Date | string;
  paymentStatus: string;
  paymentToken: null;
  paymentUrl: null;
  baseTotalPrice: string;
  taxAmount: string;
  taxPercent: string;
  discountAmount: string;
  discountPercent: string;
  shippingCost: string;
  grandTotal: string | number;
  note: string;
  customerFirstName: string;
  customerLastName: string;
  customerAddress1: string;
  customerAddress2: string;
  customerPhone: string;
  customerEmail: string;
  customerCityId: string;
  customerProvinceId: string;
  customerPostcode: number;
  shippingCourier: null;
  shippingServiceName: null;
  approvedBy: null;
  approvedAt: null;
  cancelledBy: null;
  cancelledAt: null;
  cancellationNote: null;
  deletedAt: null;
  customerFullName: string;
  orderItems: IOrderItem[];
}

export interface IOrderItem extends BaseModel {
  orderId: string;
  productId: string;
  qty: number;
  basePrice: string;
  baseTotal: string;
  taxAmount: string;
  taxPercent: string;
  discountAmount: string;
  discountPercent: string;
  subTotal: string;
  sku: string;
  type: string;
  name: string;
  weight: string;
  attributes: string;
}

export interface IShippingService {
  service: string;
  cost: number;
  etd: string;
  courier: string;
}

export interface ShippingApiResponse {
  results: IShippingService[];
}
