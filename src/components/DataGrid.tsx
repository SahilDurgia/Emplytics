import { useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  themeAlpine,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";
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
  // 📤 Export to CSV
  const exportToCSV = () => {
    gridRef.current?.api.exportDataAsCsv();
  };
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
      <div className="mb-5 flex justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Search employees..."
          onChange={onQuickFilterChange}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none w-72 transition"
        />

        <button
          onClick={exportToCSV}
          className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition"
        >
          Export CSV
        </button>
      </div>

      {/* 📊 AG Grid */}
      <div className=" w-full h-100 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
        <AgGridReact<Employee>
          ref={gridRef}
          theme={themeAlpine}
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
