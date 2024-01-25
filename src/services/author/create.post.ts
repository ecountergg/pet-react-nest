import { $http } from "@/lib/http";
import { GenericResponse } from "@/types/response.type";
import { IAuthorResponse } from "./list.get";

export interface IAuthorPayload {
  name: string;
}

export const authorPost = async (
  payload: IAuthorPayload,
): Promise<GenericResponse<IAuthorResponse>> => {
  const res = await $http.post<GenericResponse<IAuthorResponse>>(
    `author`,
    payload,
  );

  return res.data;
};
