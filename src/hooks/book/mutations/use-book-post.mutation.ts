import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query";
import { IBookPayload, bookPost } from "@/services/book/create.post";
import { IBookResponse } from "@/services/book/list.get";

export const useBookPost = (
  mutationOpts?: UseCustomMutationOptions<IBookPayload, IBookResponse>,
) => {
  return useMutation({
    mutationFn: (payload: IBookPayload) => {
      return bookPost(payload);
    },
    ...mutationOpts,
  });
};
