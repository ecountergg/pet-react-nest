import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query";
import { IBookResponse } from "@/services/book/list.get";
import { bookPut } from "@/services/book/update.put";
import { IBookPayload } from "@/services/book/create.post";

export interface IUpdateBookMutationPayload {
  id: string;
  payload: IBookPayload;
}

export const useBookPut = (
  mutationOpts?: UseCustomMutationOptions<
    IUpdateBookMutationPayload,
    IBookResponse
  >,
) => {
  return useMutation({
    mutationFn: (payloadMutation: IUpdateBookMutationPayload) => {
      return bookPut(payloadMutation.id, payloadMutation.payload);
    },
    ...mutationOpts,
  });
};
