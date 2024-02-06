import { $http } from "@/lib/http.lib";
import { GenericResponse } from "@/types/response.type";
import { IAuthorResponse } from "./list.get";
import { IAuthorPayload } from "./create.post";

export const authorPut = async (
  id: string,
  payload: IAuthorPayload,
): Promise<GenericResponse<IAuthorResponse>> => {
  const res = await $http.put<GenericResponse<IAuthorResponse>>(
    `author/${id}`,
    payload,
  );

  return res.data;
};
