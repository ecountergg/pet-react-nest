import { $http } from "@/lib/http";
import { GenericResponse } from "@/types/response.type";
import { IBookResponse } from "./list.get";

export const bookDelete = async (
  id: string,
): Promise<GenericResponse<IBookResponse>> => {
  const res = await $http.delete<GenericResponse<IBookResponse>>(`book/${id}`);

  return res.data;
};
