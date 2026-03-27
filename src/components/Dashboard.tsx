import Header from "./Header";
import DataGrid from "./DataGrid";
import employeeData from "../data/employeeData";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <Header />

      <div className="bg-white rounded-2xl shadow-sm p-4">
        <p className="text-gray-600">Dashboard content will go here</p>
      </div>

      <DataGrid rowData={employeeData.employees} />
    </div>
  );
};

export default Dashboard;
