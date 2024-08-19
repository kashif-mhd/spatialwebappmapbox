"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import DrawerForm, { FormField } from "./DrawerForm";

type CstTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  formFields: FormField[];
  formFieldsValidationSchema: any;
  footerData?: T; // Add footerData prop to pass custom footer data

  onAdd?: (row: T) => void;
  onEdit?: (index: number, row: T) => void;
  onDelete?: (index: number, row: T) => void;

  bulkAction?: { label: string; onClick: (rows: Row<T>[]) => void };
};

export function TableFields<T>({
  data,
  columns,
  formFields,
  formFieldsValidationSchema,
  footerData, // Destructure footerData here
  onAdd,
  onEdit,
  onDelete,
  bulkAction,
}: CstTableProps<T>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<T | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRowData(row.original);
                setSelectedRowIndex(row.index);
                setIsSheetOpen(true);
              }}
            >
              <Pencil size={16} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onDelete && onDelete(row.index, row.original)}
            >
              <Trash size={16} />
            </Button>
          </div>
        ),
      },
    ],
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="w-full">
      {bulkAction && (
        <div className="flex align-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() => {
              bulkAction.onClick(table.getSelectedRowModel().rows);
            }}
          >
            {bulkAction.label}
          </Button>
        </div>
      )}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          className="ms-1"
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedRowData(null);
            setSelectedRowIndex(null);
            setIsSheetOpen(true);
          }}
        >
          <Plus size={16} />
        </Button>
      </div>
      <div className="rounded-md border">
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
                  colSpan={columns.length + 2}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* Add the TableFooter section */}
          {footerData && table.getRowModel().rows?.length > 0 && (
            <TableFooter>
              <TableRow className="font-semibold bg-gray-100">
                {table.getAllColumns().map((column) => (
                  <TableCell key={column.id}>
                    {String(footerData[column.id as keyof T] || "")}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <DrawerForm
        isDrawerOpen={isSheetOpen}
        setIsDrawerOpen={setIsSheetOpen}
        fields={formFields || []}
        fieldsInitialValue={
          selectedRowData ||
          formFields
            ?.map((field) => ({
              name: field.name,
              value: field.type === "number" ? 0 : "",
            }))
            ?.reduce((a, v) => ({ ...a, [v.name]: v.value }), {}) ||
          {}
        }
        fieldsValidationSchema={formFieldsValidationSchema}
        onSubmit={(values: any) => {
          if (!selectedRowData) {
            onAdd && onAdd(values);
          } else if (
            selectedRowIndex !== null &&
            selectedRowIndex !== undefined
          ) {
            onEdit && onEdit(selectedRowIndex, values);
          }
        }}
      />
    </div>
  );
}
