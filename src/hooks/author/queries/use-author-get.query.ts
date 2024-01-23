import { useQuery } from "@tanstack/react-query";

import { AUTHOR_KEY } from "./query-key.query";
import { GenericResponse, PaginationResponse } from "@/types/response.type";
import {
  IAuthorResponse,
  AuthorFilter,
  authorGet,
} from "@/services/author/list.get";
import { useState } from "react";

export const useAuthorGet = () => {
  const [filter, setFilter] = useState<AuthorFilter>({
    page: 1,
    limit: 10,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<IAuthorResponse>>>({
      queryKey: AUTHOR_KEY.list(filter),
      queryFn: () => authorGet(filter),
    }),
  };
};
