import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { AUTHOR_KEY } from "./query-key.query";
import { GenericResponse } from "@/types/response.type";
import { IAuthorResponse } from "@/services/author/list.get";
import { authorDetailGet } from "@/services/author/detail.get";

export const useAuthorDetailGet = (
  id: string,
  options?: Omit<
    UseQueryOptions<GenericResponse<IAuthorResponse>>,
    "queryKey" | "queryFn"
  >,
) => {
  return {
    ...useQuery<GenericResponse<IAuthorResponse>>({
      queryFn: () => authorDetailGet(id),
      queryKey: AUTHOR_KEY.detail(id),
      ...options,
    }),
  };
};
