export const PAGINATION_DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
} as const;
export type enumPaginationDirection =
  (typeof PAGINATION_DIRECTION)[keyof typeof PAGINATION_DIRECTION];

export type PaginationFilter<TFilter = object> = {
  [Key in keyof TFilter]: TFilter[Key];
} & {
  page?: number;
  limit?: number;
  sortBy?: string;
  direction?: enumPaginationDirection;
};
