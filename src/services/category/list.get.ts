import { IBaseResponse } from "@/interfaces/base-response.interface";
import { $http } from "@/lib/http.lib";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsAuthor {
  name?: string;
}

export interface ICategoryResponse extends IBaseResponse {
  name: string;
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
