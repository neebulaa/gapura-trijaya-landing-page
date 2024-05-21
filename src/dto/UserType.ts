import { APIObjectType } from "./APIObjectType";

export interface UserType extends APIObjectType {
	email: string;
	name: string;
	phone: string | number;
}
