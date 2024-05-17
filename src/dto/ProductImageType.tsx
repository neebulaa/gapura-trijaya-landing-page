import { APIObjectType } from "./APIObjectType";

export interface ProductImageType extends APIObjectType {
	product_id: null | string | number;
	path: null | string;
	secondary: number | boolean;
	extra_large: null | string;
	large: null | string;
	medium: null | string;
	small: null | string;
}
