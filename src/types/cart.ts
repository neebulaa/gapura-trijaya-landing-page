export interface ICartItem {
  id: string;
  name: string;
  slug: string;
  queryUrl?: string;
  price: number;
  image: string;
  quantity: number;
  attributes?: any;
  // meta?: any;
  // product?: any;
}
