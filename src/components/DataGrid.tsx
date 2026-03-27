import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import type { Employee } from "../types/employee";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
type Props = {
  rowData: Employee[];
};

const DataGrid = ({ rowData }: Props) => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  console.log("rowData:", rowData);
  // Column Definitions
  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      { field: "id", maxWidth: 90 },

      {
        headerName: "Name",
        valueGetter: (params) =>
          `${params.data?.firstName} ${params.data?.lastName}`,
      },

      { field: "email" },
      { field: "department" },
      { field: "position" },

      {
        field: "salary",
        valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
      },

      { field: "age", maxWidth: 100 },
      { field: "location" },

      {
        field: "performanceRating",
        headerName: "Performance",
        cellStyle: (params) => ({
          fontWeight: params.value > 4.5 ? "600" : "400",
          color: params.value > 4.5 ? "#16a34a" : "#374151",
        }),
      },

      {
        field: "projectsCompleted",
        headerName: "Projects",
      },

      {
        headerName: "Status",
        valueGetter: (params) =>
          params.data?.isActive ? "Active" : "Inactive",
        cellStyle: (params) => ({
          color: params.value === "Active" ? "#16a34a" : "#dc2626",
          fontWeight: "500",
        }),
      },
    ],
    [],
  );

  // Default column behavior
  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      flex: 1,
      minWidth: 120,
      resizable: true,
      sortable: true,
      filter: true,
    }),
    [],
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="overflow-x-auto">
        <div
          className="ag-theme-alpine min-w-150 xxs:min-w-[700px] xs:min-w-[800px] sm:min-w-225"
          // AG Grid needs an explicit height; some Tailwind height classes may be invalid.
          style={{ height: 500 }}
        >
          <AgGridReact<Employee>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            // Avoid AG Grid error #239 by selecting the legacy CSS theme mode.
            theme="legacy"
          />
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
