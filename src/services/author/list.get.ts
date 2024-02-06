import { IBaseResponse } from "@/interfaces/base-response.interface";
import { $http } from "@/lib/http.lib";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsAuthor {
  name?: string;
}

export interface IAuthorResponse extends IBaseResponse {
  name: string;
  bio: string | null;
  birth_year: number | null;
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
