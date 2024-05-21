import { ProductType } from "./ProductType";

export type CartItemType = {
	id: number | string;
	product: ProductType;
	quantity: number;
	subtotal: number;
};
