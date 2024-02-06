import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/atoms/button/button";
import { CardContent, CardFooter } from "@/components/atoms/card/card";
import { FormInput } from "@/components/atoms/input/input";
import { Label } from "@/components/atoms/label/label";
import { IBookPayload } from "@/services/book/create.post";
import { useBookPost } from "@/hooks/book/mutations/use-book-post.mutation";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/atoms/toast/use-toast";
import { useBookDetailGet } from "@/hooks/book/queries/use-book-detail-get.query";
import { useEffect } from "react";
import { useBookPut } from "@/hooks/book/mutations/use-book-put.mutation";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  FormSelect,
} from "@/components/atoms/select/select";
import { useAuthorGet } from "@/hooks/author/queries/use-author-get.query";
import { useCategoryOptionGet } from "@/hooks/category/queries/use-category-get.query";
import { usePublisherGet } from "@/hooks/publisher/queries/use-publisher-get.query";
import MultipleSelector from "../multiple-select/multiple-select";
import { FormTextarea } from "@/components/atoms/textarea/textarea";

const schema = yup.object().shape({
  title: yup.string().required("Title is a required field"),
  description: yup.string().required("Description is a required field"),
  isbn: yup.string().required("ISBN is a required field").min(13),
  page_count: yup.number().required("Page Count is a required field"),
  price: yup.number().required("Price is a required field"),
  author_id: yup.string().required("Author Name is required field").min(1),
  publisher_id: yup
    .string()
    .required("Publisher Name is required field")
    .min(1),
  category_ids: yup
    .array(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .required("Categories is required")
    .min(1, "Categories at least 1"),
});

export const BookForm = () => {
  const { id } = useParams();
  const { handleSubmit, setValue, control } = useForm<
    yup.InferType<typeof schema>
  >({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: mutateCreate, isPending: isPendingCreate } = useBookPost({
    onSuccess: () => {
      handleCancel();

      toast({
        title: "Success!",
        description: "Book successfully created",
        variant: "default",
      });
    },
  });
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useBookPut({
    onSuccess: () => {
      handleCancel();

      toast({
        title: "Success!",
        description: "Book successfully updated",
        variant: "default",
      });
    },
  });
  const { data: bookDetail } = useBookDetailGet(id!, {
    enabled: !!id,
  });
  const { data: authors } = useAuthorGet();
  const { data: publishers } = usePublisherGet();
  const { data: categories } = useCategoryOptionGet();

  useEffect(() => {
    const categories = bookDetail?.data.categories.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });

    setValue("title", bookDetail?.data.title ?? "");
    setValue("description", bookDetail?.data.description ?? "");
    setValue("isbn", bookDetail?.data.isbn ?? "");
    setValue("page_count", bookDetail?.data.page_count ?? 0);
    setValue("price", bookDetail?.data.price ?? 0);
    setValue("author_id", bookDetail?.data.author.id ?? "");
    setValue("publisher_id", bookDetail?.data.publisher.id ?? "");
    setValue("category_ids", categories ?? []);
  }, [bookDetail]);

  const onSubmit = (payload: yup.InferType<typeof schema>) => {
    const categoryIds = payload.category_ids.map((category) => category.value);

    const mapPayload: IBookPayload = {
      ...payload,
      category_ids: categoryIds,
    };

    if (id)
      return mutateUpdate({
        id,
        payload: mapPayload,
      });

    return mutateCreate(mapPayload);
  };

  const handleCancel = () => {
    if (id) return navigate(`/admin/master-data/book/${id}/detail`);

    return navigate("/admin/master-data/book");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Name</Label>
            <FormInput
              id="title"
              name="title"
              placeholder="Book Title"
              control={control}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <FormTextarea
              id="description"
              name="description"
              placeholder="Book Description"
              control={control}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="isbn">ISBN</Label>
            <FormInput
              id="isbn"
              name="isbn"
              placeholder="ISBN"
              control={control}
              autoComplete="off"
              maxLength={13}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="page_count">Page Count</Label>
            <FormInput
              type="number"
              id="page_count"
              name="page_count"
              placeholder="Page Count"
              control={control}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Author Name</Label>
            <FormSelect name="author_id" control={control}>
              <SelectTrigger>
                <SelectValue placeholder="Author Name" />
              </SelectTrigger>
              <SelectContent>
                {authors?.data.data.map((author) => (
                  <SelectItem key={author.id} value={`${author.id}`}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Publisher Name</Label>
            <FormSelect name="publisher_id" control={control}>
              <SelectTrigger>
                <SelectValue placeholder="Publisher Name" />
              </SelectTrigger>
              <SelectContent>
                {publishers?.data.data.map((publisher) => (
                  <SelectItem key={publisher.id} value={`${publisher.id}`}>
                    {publisher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Categories</Label>
            <MultipleSelector
              name="category_ids"
              control={control}
              defaultOptions={categories ?? []}
              options={categories ?? []}
              placeholder="Select Categories"
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="reset"
          disabled={isPendingCreate || isPendingUpdate}
          variant="outline"
          onClick={() => handleCancel}
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
