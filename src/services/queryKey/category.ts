import { createQueryKeys } from '@lukemorales/query-key-factory';

export const categoryKeys = createQueryKeys('categories', {
  lists: <T>(queryParams?: T) => [queryParams],
  byId: (id: string) => [id],
});
