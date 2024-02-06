import { $http } from "@/lib/http.lib";
import { GenericResponse } from "@/types/response.type";
import { IAuthorResponse } from "./list.get";

export interface IAuthorPayload {
  name: string;
  birth_year?: string;
  bio?: string;
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
