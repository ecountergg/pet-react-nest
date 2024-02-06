import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query.lib";
import { IAuthorResponse } from "@/services/author/list.get";
import { authorDelete } from "@/services/author/delete.delete";

export const useAuthorDelete = (
  mutationOpts?: UseCustomMutationOptions<string, IAuthorResponse>,
) => {
  return useMutation({
    mutationFn: (id: string) => {
      return authorDelete(id);
    },
    ...mutationOpts,
  });
};
