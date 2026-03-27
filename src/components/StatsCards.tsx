import type { Employee } from "../types/employee";

type Props = {
  data: Employee[];
};

export default function StatsCards({ data }: Props) {
  const total = data.length;
  const active = data.filter((emp) => emp.isActive).length;
  const avgRating =
    data.reduce((acc, emp) => acc + emp.performanceRating, 0) / total;
  const totalProjects = data.reduce(
    (acc, emp) => acc + emp.projectsCompleted,
    0,
  );

  const cardStyle = "bg-white shadow rounded-lg p-4 flex flex-col items-center";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className={cardStyle}>
        <p className="text-gray-500 text-sm">Total Employees</p>
        <h2 className="text-2xl font-bold">{total}</h2>
      </div>

      <div className={cardStyle}>
        <p className="text-gray-500 text-sm">Active Employees</p>
        <h2 className="text-2xl font-bold text-green-600">{active}</h2>
      </div>

      <div className={cardStyle}>
        <p className="text-gray-500 text-sm">Avg Rating</p>
        <h2 className="text-2xl font-bold text-blue-600">
          {avgRating.toFixed(2)}
        </h2>
      </div>

      <div className={cardStyle}>
        <p className="text-gray-500 text-sm">Total Projects</p>
        <h2 className="text-2xl font-bold text-purple-600">{totalProjects}</h2>
      </div>
    </div>
  );
}
