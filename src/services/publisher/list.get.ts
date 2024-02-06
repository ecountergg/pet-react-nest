import { IBaseResponse } from "@/interfaces/base-response.interface";
import { $http } from "@/lib/http.lib";
import { PaginationFilter } from "@/types/request.type";
import { GenericResponse, PaginationResponse } from "@/types/response.type";

export interface IParamsAuthor {
  name?: string;
}

export interface IPublisherResponse extends IBaseResponse {
  name: string;
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
