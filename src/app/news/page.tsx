"use client"

import { useState, useEffect } from "react"
import axios from "axios"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type FakeNews = {
  id: string
  news: string
  valid: true | false
  url: string
  score : number
}


// const data: FakeNews[] = [
//   {
//     id: "1",
//     news: "The COVID-19 vaccine is safe and effective.",
//     valid: true,
//     url: "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety/safety-of-vaccines.html",
//   },
//   {
//     id: "2",
//     news: "ahe COVID-19 vaccine is safe and effective.",
//     valid: true,
//     url: "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety/safety-of-vaccines.html",
//   },
// ];


const columns: ColumnDef<FakeNews>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "news",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          News
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("news")}</div>,
  },
  {
    accessorKey: "url",
    header: () => <div className="text-left">URL</div>,
    cell: ({ row }) => {
      const url = row.getValue("url") as string;
      return (
        <Link
          href={url}
          target="_blank"
          className="text-primary hover:underline"
        >
          {url}
        </Link>
      )
    },
  },
  {
    accessorKey: "valid",
    header: () => <div className="text-left">Valid</div>,
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue("valid") ? (
          <span className="text-green-600">True</span>
        ) : (
          <span className="text-red-600">False</span>
        )}
      </div>
    ),
  },
]

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [apiData, setApiData] = useState([]);
  const [needFetch, setNeedFetch] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [userQuery, setUserQuery] = useState("palestine");

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        console.log("fetching data");
        const response = await axios.get("/api/search", {
          // params: { query: "palestine", count: 10 },
          params: { query: userQuery, count: 10 },
          headers: { "Access-Control-Allow-Origin": "*" },
        });
        const data = await response.data;
        const results = data.results || [];
        
        const fakeNewsData = results.map(([contentObject, score]: [any, any], index : number) => {
          return {
            id: index, // Use a unique identifier as the ID
            news: contentObject.pageContent,
            valid: contentObject.metadata.valid,
            url: contentObject.metadata.url,
            score: score,
          };
        }).sort((a : any, b : any) => b.score - a.score);
  
        setApiData(fakeNewsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [needFetch]);

  const table = useReactTable({
    data: apiData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="container pt-20">
      <div className="w-full">
        <div className="flex items-center py-4 gap-12">
          <Input
            placeholder="Filter by news"
            className="max-w-screen-lg w-full"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button className="bg-primary text-primary-foreground w-36" onClick={() => 
            {
              setUserQuery(inputValue)
              setNeedFetch(!needFetch)
            }
            }>
            Search
          </Button>
        </div>
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
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
                          cell.getContext()
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}