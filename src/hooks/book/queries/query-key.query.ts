import { IParamsBook } from "@/services/book/list.get";

export const BOOK_KEY = {
  all: ["book"] as const,
  list: (filter: IParamsBook) => [...BOOK_KEY.all, { filter }],
  detail: (id: string) => [...BOOK_KEY.all, { id }],
};
