import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { BOOK_KEY } from "./query-key.query";
import { GenericResponse } from "@/types/response.type";
import { IBookDetailResponse, bookDetailGet } from "@/services/book/detail.get";

export const useBookDetailGet = (
  id: string,
  options?: Omit<
    UseQueryOptions<GenericResponse<IBookDetailResponse>>,
    "queryKey" | "queryFn"
  >,
) => {
  return {
    ...useQuery<GenericResponse<IBookDetailResponse>>({
      queryFn: () => bookDetailGet(id),
      queryKey: BOOK_KEY.detail(id),
      ...options,
    }),
  };
};
