import { APIObjectType } from "./APIObjectType";
import { AttributeOptionType } from "./AttributeOptionType";
import { ProductType } from "./ProductType";

export interface AttributeType extends APIObjectType {
	code: string;
	name: string;
	type: string;
	validation: null | string;
	is_required: number | boolean;
	is_unique: number | boolean;
	is_filterable: number | boolean;
	is_configurable: number | boolean;
	options: (AttributeOptionType | ProductType)[];
}
