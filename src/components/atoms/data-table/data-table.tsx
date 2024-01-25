"use client";

import {
  ColumnDef,
  PaginationState,
  SortingState,
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
import {
  EnumSortDirection,
  PaginationFilter,
  SORT_DIRECTION,
} from "@/types/request.type";
import { ArrowDown, ArrowUp } from "lucide-react";
import { LIMIT, LIMITS } from "@/consts/pagination.const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select/select";
import { Card } from "../card/card";

interface IPaginationDataTableProps {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export const PaginationPages = ({
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

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: PaginationMetaResponse;
  setFilter: React.Dispatch<React.SetStateAction<PaginationFilter>>;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  meta,
  setFilter,
}: IDataTableProps<TData, TValue>) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: LIMIT,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );
  useEffect(() => {
    const sortingAtom = sorting[0];
    let order: EnumSortDirection | undefined;

    if (sortingAtom) {
      order = sortingAtom.desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;
    } else {
      order = undefined;
    }

    setFilter({
      page: pageIndex,
      limit: pageSize,
      order: order,
      orderBy: sortingAtom ? sortingAtom.id : undefined,
    });
  }, [pageIndex, pageSize, sorting, setFilter, setSorting]);

  const table = useReactTable({
    data: data ?? memoizedData,
    columns: memoizedColumns,
    pageCount: meta?.pageCount ?? -1,
    state: {
      pagination,
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Card className="mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "select-none cursor-pointer flex items-center gap-1"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <ArrowDown className="h-4 w-4 " />,
                            desc: <ArrowUp className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
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
      </Card>
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
          <PaginationPages
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
        <Select
          name="limit"
          value={`${pageSize}`}
          onValueChange={(e) => {
            setPagination({
              pageIndex: 0,
              pageSize: parseInt(e),
            });
          }}
        >
          <SelectTrigger className="w-[75px]">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {LIMITS.map((limit) => (
              <SelectItem key={limit} value={`${limit}`}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Pagination>
    </div>
  );
};
