import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query";
import { IAuthorPayload, authorPost } from "@/services/author/create.post";
import { IAuthorResponse } from "@/services/author/list.get";

export const useAuthorPost = (
  mutationOpts?: UseCustomMutationOptions<IAuthorPayload, IAuthorResponse>,
) => {
  return useMutation({
    mutationFn: (payload: IAuthorPayload) => {
      return authorPost(payload);
    },
    ...mutationOpts,
  });
};
