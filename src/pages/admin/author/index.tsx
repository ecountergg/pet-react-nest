import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MoreHorizontal } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/atoms/dropdown-menu/dropdown-menu";
// import {
//   DialogFooter,
//   DialogHeader,
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/atoms/dialog/dialog";
import { Button } from "@/components/atoms/button/button";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { useAuthorGet } from "@/hooks/author/queries/use-author-get.query";
import { IAuthorResponse } from "@/services/author/list.get";
import { DataTable } from "@/components/atoms/data-table/data-table";
import { PaginationMetaResponse } from "@/types/response.type";
import { Input } from "@/components/atoms/input/input";
import { useDebounce } from "@/hooks";

const columns: ColumnDef<IAuthorResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const author = row.original;
      return (
        <Link
          className="text-md font-semibold"
          to={`/admin/master-data/author/${author.id}/detail`}
        >
          {author.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  // {
  //   id: "actions",
  //   cell: () => {
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem className="cursor-pointer">
  //             Delete
  //           </DropdownMenuItem>
  //           <DropdownMenuItem className="cursor-pointer">
  //             Update
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export function AdminAuthorIndex() {
  const navigate = useNavigate();
  const { filter, setFilter, data: authors } = useAuthorGet();
  const [value, setValue] = useState<string | undefined>(undefined);
  const debouncedValue = useDebounce<string>(value!, 500);
  // const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setFilter({
      ...filter,
      page: 0,
      name: debouncedValue ? debouncedValue : undefined,
    });
  }, [debouncedValue, filter, setFilter]);

  return (
    <Admin>
      <Container>
        {/* <Dialog open={confirmDelete}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Are you sure want to delete this data?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold text-primary">Author List</h1>
          <Button
            variant={"secondary"}
            onClick={() => navigate("/admin/master-data/author/create")}
          >
            Add Author
          </Button>
        </div>
        <Input
          id="name"
          name="name"
          className="w-[300px]"
          autoComplete="off"
          placeholder="Search name"
          onChange={handleChange}
        />
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
