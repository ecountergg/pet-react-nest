import { Button } from "@/components/atoms/button/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table/table";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { useAuthorGet } from "@/hooks/author/queries/use-author-get.query";

export function AdminAuthorIndex() {
  const { data: authors, isPending: isPendingAuthor } = useAuthorGet();

  return (
    <Admin>
      <Container>
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold text-primary">Author List</h1>
          <Button variant={"secondary"}>Add Author</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Deleted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isPendingAuthor &&
              authors?.data.data.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-lg font-medium">
                    {author.name}
                  </TableCell>
                  <TableCell>{author.created_at}</TableCell>
                  <TableCell>{author.updated_at}</TableCell>
                  <TableCell>{author.deleted_at ?? "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Container>
    </Admin>
  );
}
