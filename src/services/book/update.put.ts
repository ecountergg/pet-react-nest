import { $http } from "@/lib/http.lib";
import { GenericResponse } from "@/types/response.type";
import { IBookResponse } from "./list.get";
import { IBookPayload } from "./create.post";

export const bookPut = async (
  id: string,
  payload: IBookPayload,
): Promise<GenericResponse<IBookResponse>> => {
  const res = await $http.put<GenericResponse<IBookResponse>>(
    `book/${id}`,
    payload,
  );

  return res.data;
};
