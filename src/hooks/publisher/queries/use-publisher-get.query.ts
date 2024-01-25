import { useState } from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { PUBLISHER_KEY } from "./query-key.query";
import { GenericResponse, PaginationResponse } from "@/types/response.type";
import {
  IPublisherResponse,
  PublisherFilter,
  publisherGet,
} from "@/services/publisher/list.get";
import { LIMIT } from "@/consts/pagination.const";

export const usePublisherGet = (
  options?: Omit<
    UseQueryOptions<GenericResponse<PaginationResponse<IPublisherResponse>>>,
    "queryKey" | "queryFn"
  >,
) => {
  const [filter, setFilter] = useState<PublisherFilter>({
    page: 0,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<IPublisherResponse>>>({
      queryKey: PUBLISHER_KEY.list(filter),
      queryFn: () => publisherGet(filter),
      ...options,
    }),
  };
};
