import { IParamsBook } from "@/services/book/list.get";

export const CATEGORY_KEY = {
  all: ["category"] as const,
  list: (filter: IParamsBook) => [...CATEGORY_KEY.all, { filter }],
  detail: (id: string) => [...CATEGORY_KEY.all, { id }],
};
