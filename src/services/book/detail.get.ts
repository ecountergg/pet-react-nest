import { $http } from "@/lib/http.lib";
import { GenericResponse } from "@/types/response.type";
import { IBookResponse } from "./list.get";
import { IAuthorResponse } from "../author/list.get";
import { ICategoryResponse } from "../category/list.get";
import { IPublisherResponse } from "../publisher/list.get";

export type IBookDetailResponse = Omit<
  IBookResponse,
  "publisher_name" | "author_name" | "categories"
> & {
  author: IAuthorResponse;
  publisher: IPublisherResponse;
  categories: ICategoryResponse[];
};

export const bookDetailGet = async (
  id: string,
): Promise<GenericResponse<IBookDetailResponse>> => {
  const res = await $http.get<GenericResponse<IBookDetailResponse>>(
    `book/${id}`,
  );

  return res.data;
};
