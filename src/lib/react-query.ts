import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { GenericResponse } from "@/types/response.type";

export type UseCustomMutationOptions<
  TPayload,
  TResponse = unknown,
> = UseMutationOptions<
  GenericResponse<TResponse>,
  AxiosError<GenericResponse<null>>,
  TPayload,
  unknown
>;
