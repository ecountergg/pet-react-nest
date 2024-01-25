import { IParamsBook } from "@/services/book/list.get";

export const PUBLISHER_KEY = {
  all: ["publisher"] as const,
  list: (filter: IParamsBook) => [...PUBLISHER_KEY.all, { filter }],
  detail: (id: string) => [...PUBLISHER_KEY.all, { id }],
};
