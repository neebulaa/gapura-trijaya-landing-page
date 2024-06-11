export interface IOrder {
  key: string;
  orderId: string;
  orderDate: string;
  grandTotal: number;
  customerName: string;
  customerEmail: string;
  status: string;
  paymentStatus: string;
}
