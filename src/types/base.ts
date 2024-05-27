/**
 * Base Model Interface
 */
export interface BaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Query Params Interface
 */
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  sortBy?: sortBy;
}

export enum sortBy {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Response Interface
 */
export interface Pagination<T> {
  data: Array<T>;
  meta: MetaDto;
}

export type MetaDto = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  // itemCount: number;
  // totalPages: number;
};

export interface SuccessResponse<T> {
  data: T;
  message?: string;
}
