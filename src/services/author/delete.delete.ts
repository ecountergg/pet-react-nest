import { $http } from "@/lib/http";
import { GenericResponse } from "@/types/response.type";
import { IAuthorResponse } from "./list.get";

export const authorDelete = async (
  id: string,
): Promise<GenericResponse<IAuthorResponse>> => {
  const res = await $http.delete<GenericResponse<IAuthorResponse>>(
    `author/${id}`,
  );

  return res.data;
};
