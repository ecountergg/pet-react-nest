import { useState } from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { CATEGORY_KEY } from "./query-key.query";
import { GenericResponse, PaginationResponse } from "@/types/response.type";
import {
  ICategoryResponse,
  CategoryFilter,
  categoryGet,
} from "@/services/category/list.get";
import { LIMIT } from "@/consts/pagination.const";
import { Option } from "@/components/molecules/multiple-select/multiple-select";

export const useCategoryGet = (
  options?: Omit<
    UseQueryOptions<GenericResponse<PaginationResponse<ICategoryResponse>>>,
    "queryKey" | "queryFn"
  >,
) => {
  const [filter, setFilter] = useState<CategoryFilter>({
    page: 0,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<ICategoryResponse>>>({
      queryKey: CATEGORY_KEY.list(filter),
      queryFn: () => categoryGet(filter),
      ...options,
    }),
  };
};

export const useCategoryOptionGet = (
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn" | "select">,
) => {
  const [filter, setFilter] = useState<CategoryFilter>({
    page: 0,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery({
      queryKey: CATEGORY_KEY.list(filter),
      queryFn: () => categoryGet(filter),
      select: (
        categories: GenericResponse<PaginationResponse<ICategoryResponse>>,
      ) => {
        const options: Option[] = categories.data.data.map(
          (category: ICategoryResponse) => {
            return {
              label: category.name,
              value: category.id,
            };
          },
        );

        return options;
      },
      ...options,
    }),
  };
};
