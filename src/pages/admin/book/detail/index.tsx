import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Trash, Edit } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card/card";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { useBookDetailGet } from "@/hooks/book/queries/use-book-detail-get.query";
import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog/dialog";
import { Button } from "@/components/atoms/button/button";
import { useBookDelete } from "@/hooks/book/mutations/use-book-delete.mutation";
import { useToast } from "@/components/atoms/toast/use-toast";
import { Badge } from "@/components/atoms/badge/badge";

export const AdminBookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: bookDetail } = useBookDetailGet(id!, {
    enabled: !!id,
  });
  const { mutate: mutateDeleteBook, isPending: isPendingDeleteBook } =
    useBookDelete({
      onSuccess: () => {
        toast({
          variant: "destructive",
          title: "Delete",
          description: "Book successfully deleted",
        });

        navigate("/admin/master-data/book");
      },
    });

  return (
    <Admin>
      <Container>
        <ChevronLeft role="button" onClick={() => navigate(-1)} />
        <Card className="mt-4">
          <CardHeader className="!flex !flex-row justify-between">
            <CardTitle>Book - Detail</CardTitle>
            <div className="flex gap-x-4">
              <Trash
                className="text-red-600"
                role="button"
                onClick={() => setOpen(true)}
              />
              <Edit
                className="text-green-600"
                role="button"
                onClick={() => navigate(`/admin/master-data/book/${id}/edit`)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="block">
                <p className="font-semibold">Name:</p>
                {bookDetail?.data.name}
              </div>
              <div className="block">
                <p className="font-semibold">Author Name:</p>
                {bookDetail?.data.author.name}
              </div>
              <div className="block">
                <p className="font-semibold">Publisher Name:</p>
                {bookDetail?.data.publisher.name}
              </div>
              <div className="block">
                <p className="font-semibold">Categories:</p>
                <div className="flex gap-x-2">
                  {bookDetail?.data.categories.map((category) => {
                    return <Badge>{category.name}</Badge>;
                  })}
                </div>{" "}
              </div>
              <div className="block">
                <p className="font-semibold">Created At</p>
                {bookDetail?.data.created_at}
              </div>
              <div className="block">
                <p className="font-semibold">Updated At</p>
                {bookDetail?.data.updated_at}
              </div>
              <div className="block">
                <p className="font-semibold">Deleted At:</p>
                {bookDetail?.data.deleted_at}
              </div>
            </div>
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure want to delete?</DialogTitle>
              <DialogDescription>
                You are about to delete {bookDetail?.data.name} from the system.
                This process is irreversible. Proceed?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                disabled={isPendingDeleteBook}
                loading={isPendingDeleteBook}
                type="button"
                onClick={() => mutateDeleteBook(id!)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </Admin>
  );
};
