import { useState } from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { BOOK_KEY } from "./query-key.query";
import { GenericResponse, PaginationResponse } from "@/types/response.type";
import { IBookResponse, BookFilter, bookGet } from "@/services/book/list.get";
import { LIMIT } from "@/consts/pagination.const";

export const useBookGet = (
  options?: Omit<
    UseQueryOptions<GenericResponse<PaginationResponse<IBookResponse>>>,
    "queryKey" | "queryFn"
  >,
) => {
  const [filter, setFilter] = useState<BookFilter>({
    page: 0,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<IBookResponse>>>({
      queryKey: BOOK_KEY.list(filter),
      queryFn: () => bookGet(filter),
      ...options,
    }),
  };
};
