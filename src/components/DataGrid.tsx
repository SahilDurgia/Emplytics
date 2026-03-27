import { useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { Employee } from "../types/employee";

type Props = {
  rowData: Employee[];
};

export default function DataGrid({ rowData }: Props) {
  const gridRef = useRef<AgGridReact<Employee>>(null);

  // 🔍 Quick Search
  const onQuickFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    gridRef.current?.api.setGridOption("quickFilterText", e.target.value);
  };

  // 🎯 Column Definitions
  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        headerName: "Name",
        valueGetter: (params) =>
          `${params.data?.firstName} ${params.data?.lastName}`,
        sortable: true,
        filter: true,
      },
      {
        field: "email",
        sortable: true,
        filter: true,
      },
      {
        field: "department",
        sortable: true,
        filter: true,
      },
      {
        field: "position",
        sortable: true,
        filter: true,
      },
      {
        field: "projectsCompleted",
        headerName: "Projects",
        sortable: true,
        filter: "agNumberColumnFilter",
      },
      {
        field: "performanceRating",
        headerName: "Rating",
        sortable: true,
        filter: "agNumberColumnFilter",
        cellStyle: (params) => {
          if (params.value >= 4) {
            return { color: "green", fontWeight: "bold" };
          } else if (params.value >= 3) {
            return { color: "orange", fontWeight: "normal" };
          } else {
            return { color: "red", fontWeight: "normal" };
          }
        },
      },
      {
        field: "isActive",
        headerName: "Status",
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<Employee, boolean>) => {
          return params.value ? (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
              Inactive
            </span>
          );
        },
      },
      {
        field: "skills",
        headerName: "Skills",
        cellRenderer: (params: ICellRendererParams<Employee, string[]>) => {
          return params.value?.join(", ") || "—";
        },
      },
      {
        field: "manager",
        headerName: "Manager",
        valueFormatter: (params) => params.value || "—",
      },
    ],
    [],
  );

  // ⚙️ Default Column Config
  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      minWidth: 120,
      resizable: true,
    }),
    [],
  );

  return (
    <div className="w-full">
      {/* 🔍 Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search employees..."
          onChange={onQuickFilterChange}
          className="border px-3 py-2 rounded w-72"
        />
      </div>

      {/* 📊 AG Grid */}
      <div className="ag-theme-alpine w-full h-150 rounded-lg shadow">
        <AgGridReact<Employee>
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          rowSelection="multiple"
          animateRows={true}
        />
      </div>
    </div>
  );
}
