import { $http } from "@/lib/http";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsBook {
  name?: string;
}

export interface IBookResponse {
  id: string;
  name: string;
  author_name: string;
  publisher_name: string;
  categories: string[];
  created_at: string;
  deleted_at: string;
  updated_at: string;
}

export type BookFilter = PaginationFilter<IParamsBook>;

export const bookGet = async (
  params: BookFilter,
): Promise<GenericResponse<PaginationResponse<IBookResponse>>> => {
  const res = await $http.get<
    GenericResponse<PaginationResponse<IBookResponse>>
  >(`book`, {
    params,
  });
  return res.data;
};
