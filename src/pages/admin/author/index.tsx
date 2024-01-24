import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu/dropdown-menu";
import { Button } from "@/components/atoms/button/button";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { useAuthorGet } from "@/hooks/author/queries/use-author-get.query";
import { IAuthorResponse } from "@/services/author/list.get";
import { DataTable } from "@/components/atoms/data-table/data-table";
import { PaginationMetaResponse } from "@/types/response.type";

const columns: ColumnDef<IAuthorResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "deleted_at",
    header: "Deleted At",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Update</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AdminAuthorIndex() {
  const { setFilter, data: authors } = useAuthorGet();

  return (
    <Admin>
      <Container>
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold text-primary">Author List</h1>
          <Button variant={"secondary"}>Add Author</Button>
        </div>

        <DataTable
          columns={columns}
          data={authors?.data.data ?? []}
          meta={authors?.data.meta as PaginationMetaResponse}
          setFilter={setFilter}
        />
      </Container>
    </Admin>
  );
}
