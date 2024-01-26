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
import { useBookGet } from "@/hooks/book/queries/use-book-get.query";
import { IBookResponse } from "@/services/book/list.get";
import { DataTable } from "@/components/atoms/data-table/data-table";
import { PaginationMetaResponse } from "@/types/response.type";
import { Input } from "@/components/atoms/input/input";
import { useDebounce } from "@/hooks";
import { Badge } from "@/components/atoms/badge/badge";

const columns: ColumnDef<IBookResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <Link
          className="text-md font-semibold"
          to={`/admin/master-data/book/${book.id}/detail`}
        >
          {book.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "author_name",
    header: "Author Name",
  },
  {
    accessorKey: "publisher_name",
    header: "Publisher Name",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex gap-x-2">
          {book.categories.map((category, index) => {
            return <Badge key={`category-${index}`}>{category}</Badge>;
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "deleted_at",
    header: "Deleted At",
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

export function AdminBookIndex() {
  const navigate = useNavigate();
  const { filter, setFilter, data: books } = useBookGet();
  const [value, setValue] = useState<string | undefined>(undefined);
  const debouncedValue = useDebounce<string>(value!, 500);

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
          <h1 className="text-xl font-semibold text-primary">Book List</h1>
          <Button
            variant={"secondary"}
            onClick={() => navigate("/admin/master-data/book/create")}
          >
            Add Book
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
          data={books?.data.data ?? []}
          meta={books?.data.meta as PaginationMetaResponse}
          setFilter={setFilter}
        />
      </Container>
    </Admin>
  );
}
