import { $http } from "@/lib/http";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsAuthor {
  name?: string;
}

export interface IPublisherResponse {
  id: string;
  name: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
}

export type PublisherFilter = PaginationFilter<IParamsAuthor>;

export const publisherGet = async (
  params: PublisherFilter,
): Promise<GenericResponse<PaginationResponse<IPublisherResponse>>> => {
  const res = await $http.get<
    GenericResponse<PaginationResponse<IPublisherResponse>>
  >(`publisher`, {
    params,
  });

  return res.data;
};
