import { APIObjectType } from "./APIObjectType";

export interface TestimonialType extends APIObjectType {
	avatar: null | string;
	name: string;
	occupation: string;
	rating: string | number;
	text: string;
}