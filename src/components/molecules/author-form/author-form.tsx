import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/atoms/button/button";
import { CardContent, CardFooter } from "@/components/atoms/card/card";
import { FormInput } from "@/components/atoms/input/input";
import { Label } from "@/components/atoms/label/label";
import { IAuthorPayload } from "@/services/author/create.post";
import { useAuthorPost } from "@/hooks/author/mutations/use-author-post.mutation";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/atoms/toast/use-toast";
import { useAuthorDetailGet } from "@/hooks/author/queries/use-author-detail-get.query";
import { useEffect } from "react";
import { useAuthorPut } from "@/hooks/author/mutations/use-author-put.mutation";
import { FormTextarea } from "@/components/atoms/textarea/textarea";

const schema = yup.object().shape({
  name: yup.string().required().label("Author Name"),
  birth_year: yup.string().min(4).max(4).label("Birth Year"),
  bio: yup.string(),
});

export const AuthorForm = () => {
  const { id } = useParams();
  const { control, handleSubmit, setValue } = useForm<IAuthorPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      bio: "",
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: mutateCreate, isPending: isPendingCreate } = useAuthorPost({
    onSuccess: () => {
      navigate("/admin/master-data/author");

      toast({
        title: "Success!",
        description: "Author successfully created",
        variant: "default",
      });
    },
  });
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useAuthorPut({
    onSuccess: () => {
      navigate("/admin/master-data/author");

      toast({
        title: "Success!",
        description: "Author successfully updated",
        variant: "default",
      });
    },
  });
  const { data: authorDetail } = useAuthorDetailGet(id!, {
    enabled: !!id,
  });

  useEffect(() => {
    setValue("name", authorDetail?.data.name ?? "");
  }, [authorDetail, setValue]);

  const onSubmit = (payload: IAuthorPayload) => {
    if (id)
      return mutateUpdate({
        id,
        payload,
      });

    return mutateCreate(payload);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <FormInput
              id="name"
              name="name"
              placeholder="John Doe"
              control={control}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="birth_year">Birth Year</Label>
            <FormInput
              id="birth_year"
              name="birth_year"
              placeholder="1996"
              control={control}
              minLength={4}
              maxLength={4}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <FormTextarea
              id="bio"
              name="bio"
              placeholder="John Doe"
              control={control}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="reset"
          disabled={isPendingCreate || isPendingUpdate}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          disabled={isPendingCreate || isPendingUpdate}
          loading={isPendingCreate || isPendingUpdate}
        >
          {id ? "Update" : "Create"}
        </Button>
      </CardFooter>
    </form>
  );
};
