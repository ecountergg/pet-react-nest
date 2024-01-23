import { HttpStatusCode } from "axios";

export type GenericResponse<T> = {
  statusCode: string;
  message: HttpStatusCode;
  data: T;
};

export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: HttpStatusCode;
};
