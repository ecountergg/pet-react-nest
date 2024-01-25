import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query";
import { IBookResponse } from "@/services/book/list.get";
import { bookDelete } from "@/services/book/delete.delete";

export const useBookDelete = (
  mutationOpts?: UseCustomMutationOptions<string, IBookResponse>,
) => {
  return useMutation({
    mutationFn: (id: string) => {
      return bookDelete(id);
    },
    ...mutationOpts,
  });
};
