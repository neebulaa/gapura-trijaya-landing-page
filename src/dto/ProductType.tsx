// export type ProductType = {
//     id: number;
//     name: string;
//     slug: string;
//     category: string;
//     price: number;
//     size: string;
//     image: string;
//     colors: string[];
//     materials: string[];
//     category_type: string;
// }

import { APIObjectType } from "./APIObjectType";
import { CategoryType } from "./CategoryType";
import { ProductImageType } from "./ProductImageType";

export interface ProductType extends APIObjectType {
	parent_id: null | string | number;
	user_id: string | number;
	sku: string;
	type: "simple" | "configurable";
	name: string;
	slug: string;
	price: null | number | string;
	weight: null | number | string;
	width: null | number | string;
	height: null | number | string;
	length: null | number | string;
	short_description: string;
	description: string;
	status: boolean | number;
	categories?: CategoryType[];
	images?: ProductImageType[];
}
