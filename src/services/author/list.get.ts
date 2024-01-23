import { $http } from "@/lib/http";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsAuthor {
  name?: string;
}

export interface IAuthorResponse {
  id: string;
  name: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
}

export type AuthorFilter = PaginationFilter<IParamsAuthor>;

export const authorGet = async (
  params: AuthorFilter,
): Promise<GenericResponse<PaginationResponse<IAuthorResponse>>> => {
  const res = await $http.get<
    GenericResponse<PaginationResponse<IAuthorResponse>>
  >(`author`, {
    params,
  });
  return res.data;
};
