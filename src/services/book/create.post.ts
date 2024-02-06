import { $http } from "@/lib/http.lib";
import { GenericResponse } from "@/types/response.type";
import { IBookResponse } from "./list.get";

export interface IBookPayload {
  title: string;
  description: string;
  isbn: string;
  page_count: number;
  price: number;
  author_id: string;
  publisher_id: string;
  category_ids: string[];
}

export const bookPost = async (
  payload: IBookPayload,
): Promise<GenericResponse<IBookResponse>> => {
  const res = await $http.post<GenericResponse<IBookResponse>>(`book`, payload);

  return res.data;
};
