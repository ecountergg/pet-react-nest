import { $http } from "@/lib/http.lib";
import { GenericResponse } from "@/types/response.type";
import { IAuthorResponse } from "./list.get";

export const authorDetailGet = async (
  id: string,
): Promise<GenericResponse<IAuthorResponse>> => {
  const res = await $http.get<GenericResponse<IAuthorResponse>>(`author/${id}`);

  return res.data;
};
