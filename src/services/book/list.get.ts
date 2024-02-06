import { IBaseResponse } from "@/interfaces/base-response.interface";
import { $http } from "@/lib/http.lib";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsBook {
  name?: string;
}

export interface IBookResponse extends IBaseResponse {
  title: string;
  description: string;
  isbn: string;
  page_count: number;
  price: number;
  author_name: string;
  publisher_name: string;
  categories: string[];
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
