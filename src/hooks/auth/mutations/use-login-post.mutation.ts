import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/lib/react-query.lib";
import {
  ILoginPayload,
  ILoginResponse,
  loginPost,
} from "@/services/auth/login.post";

export const useLoginPost = (
  mutationOpts?: UseCustomMutationOptions<ILoginPayload, ILoginResponse>,
) => {
  return useMutation({
    mutationFn: (payload: ILoginPayload) => {
      return loginPost(payload);
    },
    ...mutationOpts,
  });
};
