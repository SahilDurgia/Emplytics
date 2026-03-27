import Header from "./Header";
import DataGrid from "./DataGrid";
import employeeData from "../data/employeeData";
import StatsCards from "./StatsCards";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <Header />
      <StatsCards data={employeeData.employees} />
      <DataGrid rowData={employeeData.employees} />
    </div>
  );
};

export default Dashboard;
