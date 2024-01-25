import { useState } from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { AUTHOR_KEY } from "./query-key.query";
import { GenericResponse, PaginationResponse } from "@/types/response.type";
import {
  IAuthorResponse,
  AuthorFilter,
  authorGet,
} from "@/services/author/list.get";
import { LIMIT } from "@/consts/pagination.const";

export const useAuthorGet = (
  options?: Omit<
    UseQueryOptions<GenericResponse<PaginationResponse<IAuthorResponse>>>,
    "queryKey" | "queryFn"
  >,
) => {
  const [filter, setFilter] = useState<AuthorFilter>({
    page: 0,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<IAuthorResponse>>>({
      queryKey: AUTHOR_KEY.list(filter),
      queryFn: () => authorGet(filter),
      ...options,
    }),
  };
};
