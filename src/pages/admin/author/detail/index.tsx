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
import { useAuthorDetailGet } from "@/hooks/author/queries/use-author-detail-get.query";
import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog/dialog";
import { Button } from "@/components/atoms/button/button";
import { useAuthorDelete } from "@/hooks/author/mutations/use-author-delete.mutation";
import { useToast } from "@/components/atoms/toast/use-toast";

export const AdminAuthorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: authorDetail } = useAuthorDetailGet(id!, {
    enabled: !!id,
  });
  const { mutate: mutateDeleteAuthor, isPending: isPendingDeleteAuthor } =
    useAuthorDelete({
      onSuccess: () => {
        toast({
          variant: "destructive",
          title: "Delete",
          description: "Author successfully deleted",
        });

        navigate("/admin/master-data/author");
      },
    });

  return (
    <Admin>
      <Container>
        <ChevronLeft role="button" onClick={() => navigate(-1)} />
        <Card className="mt-4">
          <CardHeader className="!flex !flex-row justify-between">
            <CardTitle>Author - Detail</CardTitle>
            <div className="flex gap-x-4">
              <Trash
                className="text-red-600"
                role="button"
                onClick={() => setOpen(true)}
              />
              <Edit
                className="text-green-600"
                role="button"
                onClick={() => navigate(`/admin/master-data/author/${id}/edit`)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4">
              <div className="block">
                <p className="font-semibold">Name:</p>
                {authorDetail?.data.name}
              </div>
              <div className="block">
                <p className="font-semibold">Created At</p>
                {authorDetail?.data.created_at}
              </div>
              <div className="block">
                <p className="font-semibold">Updated At</p>
                {authorDetail?.data.updated_at}
              </div>
            </div>
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure want to delete?</DialogTitle>
              <DialogDescription>
                You are about to delete {authorDetail?.data.name} from the
                system. This process is irreversible. Proceed?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                disabled={isPendingDeleteAuthor}
                loading={isPendingDeleteAuthor}
                type="button"
                onClick={() => mutateDeleteAuthor(id!)}
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
