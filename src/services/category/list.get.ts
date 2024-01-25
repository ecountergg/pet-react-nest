import { $http } from "@/lib/http";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsAuthor {
  name?: string;
}

export interface ICategoryResponse {
  id: string;
  name: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
}

export type CategoryFilter = PaginationFilter<IParamsAuthor>;

export const categoryGet = async <T>(
  params: CategoryFilter,
): Promise<GenericResponse<PaginationResponse<T>>> => {
  const res = await $http.get<GenericResponse<PaginationResponse<T>>>(
    `category`,
    {
      params,
    },
  );

  return res.data;
};
