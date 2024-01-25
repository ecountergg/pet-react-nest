"use client";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination/pagination";
import { useEffect, useMemo, useState } from "react";
import { PaginationMetaResponse } from "@/types/response.type";
import { PaginationFilter } from "@/types/request.type";

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: PaginationMetaResponse;
  setFilter: React.Dispatch<React.SetStateAction<PaginationFilter>>;
}

interface IPaginationDataTableProps {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export const PaginationDataTable = ({
  pageCount,
  pageIndex,
  pageSize,
  setPagination,
}: IPaginationDataTableProps): (JSX.Element | null)[] => {
  let isPageNumberOutOfRange: boolean;

  return [...new Array(pageCount)].map((_, index) => {
    const pageNumber = index;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pageCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - pageIndex) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            isActive={pageNumber === pageIndex}
            onClick={() =>
              setPagination({
                pageIndex: pageNumber,
                pageSize: pageSize,
              })
            }
          >
            {pageNumber + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return null;
  });
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  meta,
  setFilter,
}: IDataTableProps<TData, TValue>) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );
  const defaultData = useMemo(() => [], []);
  useEffect(() => {
    setFilter({
      page: pageIndex,
      limit: pageSize,
    });
  }, [pageIndex, pageSize, setFilter]);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount: meta?.pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          <PaginationDataTable
            pageCount={meta?.pageCount}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPagination={setPagination}
          />
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
