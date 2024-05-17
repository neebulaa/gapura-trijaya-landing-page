import { APIObjectType } from "./APIObjectType";

export interface CategoryType extends APIObjectType {
	parent_id: null | string | number;
	name: string;
    primary: number | boolean;
	slug: string;
};
