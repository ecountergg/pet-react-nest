import { PaginationFilter } from "@/types/request.type";

export const getFilter = <T extends PaginationFilter<T>>(
  filter: T | undefined,
) => {
  if (!filter) return {};
  const modifiedFilter = Object.fromEntries(
    Object.entries(filter).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.join(",")];
      }
      return [key, value];
    }),
  );
  return {
    ...modifiedFilter,
    page: filter.page,
    limit: filter.limit ?? 10,
  };
};
