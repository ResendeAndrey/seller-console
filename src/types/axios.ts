export type CommonDataResponse<T> = {
  data: T;
  page: number;
  totalItems: number;
  totalPages: number;
};
