import { IParamsAuthor } from "@/services/author/list.get";

export const AUTHOR_KEY = {
  all: ["author"] as const,
  list: (filter: IParamsAuthor) => [...AUTHOR_KEY.all, { filter }],
};
