import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query.lib";
import { IAuthorResponse } from "@/services/author/list.get";
import { authorPut } from "@/services/author/update.put";
import { IAuthorPayload } from "@/services/author/create.post";

export interface IUpdateAuthorMutationPayload {
  id: string;
  payload: IAuthorPayload;
}

export const useAuthorPut = (
  mutationOpts?: UseCustomMutationOptions<
    IUpdateAuthorMutationPayload,
    IAuthorResponse
  >,
) => {
  return useMutation({
    mutationFn: (payloadMutation: IUpdateAuthorMutationPayload) => {
      return authorPut(payloadMutation.id, payloadMutation.payload);
    },
    ...mutationOpts,
  });
};
