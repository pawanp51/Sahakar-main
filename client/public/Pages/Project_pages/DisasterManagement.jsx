import React, { useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Bell } from "react-feather";

// Updated Projects with 30 specific project names
const projects = [
  {
    id: 6432,
    name: "6432 - National Gas Infrastructure Development Plan",
    progress: 100,
  },
  {
    id: 4530,
    name: "4530 - National Gas Pipeline Expansion Initiative",
    progress: 64,
  },
  {
    id: 2343,
    name: "2343 - National Highway Expansion Project",
    progress: 66,
  },
  {
    id: 1234,
    name: "1234 - Maharashtra Highway Expansion Project",
    progress: 38,
  },
  {
    id: 5678,
    name: "5678 - Coastal Flood Defense Enhancement",
    progress: 75,
  },
  {
    id: 9101,
    name: "9101 - Urban Earthquake Resilience Upgrade",
    progress: 50,
  },
  {
    id: 1121,
    name: "1121 - Rural Landslide Prevention Systems",
    progress: 85,
  },
  {
    id: 3141,
    name: "3141 - Wildfire Management and Control Initiative",
    progress: 40,
  },
  {
    id: 5161,
    name: "5161 - Cyclone Early Warning Network Expansion",
    progress: 55,
  },
  {
    id: 7181,
    name: "7181 - Emergency Communication Infrastructure",
    progress: 90,
  },
  {
    id: 9202,
    name: "9202 - Water Supply Restoration Project",
    progress: 70,
  },
  {
    id: 1222,
    name: "1222 - Medical Emergency Response Units",
    progress: 60,
  },
  {
    id: 3242,
    name: "3242 - Disaster Relief Logistics Optimization",
    progress: 80,
  },
  {
    id: 5262,
    name: "5262 - Renewable Energy Integration for Resilience",
    progress: 30,
  },
  {
    id: 7282,
    name: "7282 - School Safety and Evacuation Drills",
    progress: 95,
  },
  {
    id: 9303,
    name: "9303 - Community Health Camps Setup",
    progress: 20,
  },
  {
    id: 1323,
    name: "1323 - Public Awareness and Education Programs",
    progress: 65,
  },
  {
    id: 3343,
    name: "3343 - Housing Reconstruction Post-Disaster",
    progress: 55,
  },
  {
    id: 5363,
    name: "5363 - Road Repair and Maintenance Program",
    progress: 45,
  },
  {
    id: 7383,
    name: "7383 - Environmental Restoration Projects",
    progress: 35,
  },
  {
    id: 9404,
    name: "9404 - Industrial Safety and Compliance Upgrades",
    progress: 25,
  },
  {
    id: 1424,
    name: "1424 - Infrastructure Sustainability Enhancements",
    progress: 10,
  },
  {
    id: 3444,
    name: "3444 - Renewable Resource Development",
    progress: 5,
  },
  {
    id: 5464,
    name: "5464 - Advanced Weather Forecasting Systems",
    progress: 15,
  },
  {
    id: 7484,
    name: "7484 - Emergency Medical Services Expansion",
    progress: 95,
  },
  {
    id: 9505,
    name: "9505 - Disaster Response Training Programs",
    progress: 85,
  },
  {
    id: 1525,
    name: "1525 - Floodplain Management and Zoning",
    progress: 50,
  },
  {
    id: 3545,
    name: "3545 - Seismic Retrofitting of Buildings",
    progress: 60,
  },
  {
    id: 5565,
    name: "5565 - Integrated Disaster Management Systems",
    progress: 70,
  },
  {
    id: 7585,
    name: "7585 - Critical Infrastructure Protection Initiative",
    progress: 80,
  },
  {
    id: 9606,
    name: "9606 - Community-Based Disaster Risk Reduction",
    progress: 90,
  },
];

// Other data remains the same
const disasterBreakdownData = [
  { name: "Floods", value: 35 },
  { name: "Earthquakes", value: 20 },
  { name: "Cyclones", value: 15 },
  { name: "Landslides", value: 10 },
  { name: "Wildfires", value: 10 },
  { name: "Other", value: 10 },
];

const monthlyData = [
  { name: "Jan", income: 320000, expense: 192000 },
  { name: "Feb", income: 240000, expense: 111840 },
  { name: "Mar", income: 160000, expense: 784000 },
  { name: "Apr", income: 222400, expense: 312640 },
  { name: "May", income: 151200, expense: 384000 },
  { name: "Jun", income: 191200, expense: 304000 },
  { name: "Jul", income: 279200, expense: 344000 },
  { name: "Aug", income: 320000, expense: 192000 },
  { name: "Sep", income: 240000, expense: 111840 },
  { name: "Oct", income: 160000, expense: 784000 },
  { name: "Nov", income: 222400, expense: 312640 },
  { name: "Dec", income: 151200, expense: 384000 },
];

// Updated Transaction History with 6 entries related to disasters
const transactionHistory = [
  {
    id: 1,
    transaction: "Emergency Supplies Purchase",
    type: "Relief",
    amount: "₹12,000,000",
    date: "14 Aug, 2023",
    status: "Debited",
  },
  {
    id: 2,
    transaction: "Flood Relief Funds",
    type: "Income",
    amount: "₹20,000,000",
    date: "10 Aug, 2023",
    status: "Credited",
  },
  {
    id: 3,
    transaction: "Bridge Collapse Repair",
    type: "Construction",
    amount: "₹30,000,000",
    date: "05 Aug, 2023",
    status: "Debited",
  },
  {
    id: 4,
    transaction: "Cyclone Shelter Construction",
    type: "Construction",
    amount: "₹25,000,000",
    date: "30 July, 2023",
    status: "Debited",
  },
  {
    id: 5,
    transaction: "Wildfire Equipment Purchase",
    type: "Equipment",
    amount: "₹8,000,000",
    date: "20 July, 2023",
    status: "Debited",
  },
  {
    id: 6,
    transaction: "Donations from NGOs",
    type: "Income",
    amount: "₹15,000,000",
    date: "15 July, 2023",
    status: "Credited",
  },
];

// Updated My Department with 6 entries related to disaster management
const departments = [
  {
    id: 1,
    name: "Flood Response Unit",
    type: "Relief",
    amount: "₹10,000,000",
  },
  {
    id: 2,
    name: "Earthquake Preparedness Team",
    type: "Preparedness",
    amount: "₹12,500,000",
  },
  {
    id: 3,
    name: "Cyclone Monitoring Center",
    type: "Monitoring",
    amount: "₹9,000,000",
  },
  {
    id: 4,
    name: "Landslide Risk Assessment",
    type: "Assessment",
    amount: "₹7,500,000",
  },
  {
    id: 5,
    name: "Wildfire Control Division",
    type: "Control",
    amount: "₹8,750,000",
  },
  {
    id: 6,
    name: "Emergency Communication Systems",
    type: "Infrastructure",
    amount: "₹11,000,000",
  },
];

// Updated Saving Plan with 6 entries related to disaster projects
const savingPlans = [
  {
    id: 1,
    icon: "🚧",
    name: "Flood Defense Systems",
    target: 40000000,
    saved: 28000000,
  },
  {
    id: 2,
    icon: "🏥",
    name: "Earthquake Emergency Kits",
    target: 16000000,
    saved: 8000000,
  },
  {
    id: 3,
    icon: "🌪️",
    name: "Cyclone Early Warning Systems",
    target: 50000000,
    saved: 35000000,
  },
  {
    id: 4,
    icon: "⛰️",
    name: "Landslide Prevention Measures",
    target: 20000000,
    saved: 12000000,
  },
  {
    id: 5,
    icon: "🔥",
    name: "Wildfire Detection Drones",
    target: 15000000,
    saved: 9000000,
  },
  {
    id: 6,
    icon: "📡",
    name: "Disaster Communication Network",
    target: 30000000,
    saved: 18000000,
  },
];

const expenseData = [
  { name: "Emergency Response", value: 35 },
  { name: "Infrastructure Repair", value: 25 },
  { name: "Medical Supplies", value: 15 },
  { name: "Logistics", value: 10 },
  { name: "Personnel", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

// Updated Disaster Impact Summary with 6 different metrics
const disasterImpact = {
  affectedPopulation: 50000,
  injuries: 1200,
  fatalities: 150,
  areasImpacted: ["Area A", "Area B", "Area C"],
  homesDestroyed: 3000,
  schoolsAffected: 25,
};

const recoveryProjects = [
  { id: 1, name: "Housing Reconstruction", progress: 60 },
  { id: 2, name: "Road Repair", progress: 45 },
  { id: 3, name: "Water Supply Restoration", progress: 80 },
];

const resourceAllocation = {
  emergencyFundsUsed: 40000000,
  suppliesDistributed: [
    { supplyType: "Food Packets", quantity: 20000 },
    { supplyType: "Medical Kits", quantity: 5000 },
  ],
  personnelDeployed: 1500,
};

const communitySupport = {
  donationsReceived: 50000000,
  volunteersRegistered: 2000,
  programsInitiated: ["Health Camps", "Counseling Sessions", "Clean-up Drives"],
};

const notifications = [
  { id: 1, message: "Emergency meeting at 3 PM", type: "alert" },
  { id: 2, message: "New volunteer registrations", type: "info" },
];

// Header Component
const Header = () => (
  <header className="bg-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
    <h1 className="text-2xl font-bold text-blue-900">Disaster Management Dashboard</h1>
    <div className="flex items-center space-x-4">
      <Bell size={24} className="text-gray-600 cursor-pointer" />
    </div>
  </header>
);

// StatCard Component
const StatCard = ({ label, value, change, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md ">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-3xl font-semibold text-gray-800 mt-2">₹{value}</p>
    <div className="flex items-center mt-4">
      <span
        className={`text-sm font-medium ${
          change > 0 ? "text-green-500" : "text-red-500"
        } flex items-center`}
      >
        {change > 0 ? "▲" : "▼"} {Math.abs(change)}%
      </span>
      <ResponsiveContainer width="50%" height={30}>
        <LineChart data={monthlyData.slice(-5)}>
          <Line
            type="monotone"
            dataKey={label === "Total Expense" ? "expense" : "income"}
            stroke={change > 0 ? "#10B981" : "#EF4444"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DisasterManagement = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen overflow-x-hidden ">
      {/* Navbar */}
      <Header />
  
      <div className="flex flex-1">
        <div className="flex-1 h-full overflow-y-auto">
          <main className="p-6">
            {/* Project List View */}
            {!selectedProject && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Ongoing Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[250px] transform transition-transform duration-300 hover:scale-105"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {project.name}
                        </h2>
                        <div className="w-full bg-gray-200 rounded-full h-3 my-4">
                          <div
                            className="bg-green-500 h-3 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500">{project.progress}% Complete</p>
                      </div>
                      <button
                        onClick={() => handleViewProject(project)}
                        className="mt-4 w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
                      >
                        View Project
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disaster Dashboard View */}
            {selectedProject && (
              <div>
                {/* Project Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">
                      {selectedProject.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Detailed disaster metrics and financial insights.
                    </p>
                  </div>
                  <button
                    onClick={handleBackToProjects}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 "
                  >
                    Back to Projects
                  </button>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    label="Total Budget"
                    value="96,000,000"
                    change={8.5}
                    color="blue"
                  />
                  <StatCard
                    label="Total Expense"
                    value="72,000,000"
                    change={-10.2}
                    color="red"
                  />
                  <StatCard
                    label="Remaining Budget"
                    value="24,000,000"
                    change={16.4}
                    color="green"
                  />
                </div>

                {/* Monthly Financial Insights */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Monthly Financial Insights
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Income</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Expense</span>
                      </div>
                      <select className="bg-gray-100 text-sm p-2 rounded border border-gray-300">
                        <option>2023</option>
                        <option>2022</option>
                      </select>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#3B82F6"
                        name="Income"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#EF4444"
                        name="Expense"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Charts Side by Side */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Disaster and Expense Breakdown
                  </h3>
                  <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    {/* Disaster Breakdown */}
                    <div className="md:w-1/2 w-full">
                      <h4 className="text-lg font-semibold mb-4 text-gray-700">
                        Disaster Breakdown
                      </h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={disasterBreakdownData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label
                          >
                            {disasterBreakdownData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Disaster Breakdown Legend */}
                      <ul className="mt-4 space-y-2">
                        {disasterBreakdownData.map((entry, index) => (
                          <li key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 mr-2 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-gray-600">
                              {entry.name} - {entry.value}%
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expense Breakdown */}
                    <div className="md:w-1/2 w-full mt-8 md:mt-0">
                      <h4 className="text-lg font-semibold mb-4 text-gray-700">
                        Expense Breakdown
                      </h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={expenseData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label
                          >
                            {expenseData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Expense Breakdown Legend */}
                      <ul className="mt-4 space-y-2">
                        {expenseData.map((entry, index) => (
                          <li key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 mr-2 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-gray-600">
                              {entry.name} - {entry.value}%
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Transaction History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-gray-600 font-medium">Transaction</th>
                          <th className="py-3 px-4 text-gray-600 font-medium">Type</th>
                          <th className="py-3 px-4 text-gray-600 font-medium">Amount</th>
                          <th className="py-3 px-4 text-gray-600 font-medium">Date</th>
                          <th className="py-3 px-4 text-gray-600 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionHistory.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{transaction.transaction}</td>
                            <td className="py-3 px-4">{transaction.type}</td>
                            <td className="py-3 px-4">{transaction.amount}</td>
                            <td className="py-3 px-4">{transaction.date}</td>
                            <td
                              className={`py-3 px-4 font-medium ${
                                transaction.status === "Credited"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Department and Saving Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* My Department */}
                  <div className="bg-white p-6 rounded-lg shadow-md ">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">My Department</h3>
                      <button className="text-blue-600 hover:underline transform ">
                        + Add Resources
                      </button>
                    </div>
                    <div className="space-y-4">
                      {departments.map((dept) => (
                        <div
                          key={dept.id}
                          className="p-4 rounded-lg border border-blue-500 bg-blue-50"
                        >
                          <p className="text-sm font-medium text-blue-600">{dept.name}</p>
                          <p className="text-lg font-semibold text-blue-800 mt-2">{dept.type}</p>
                          <p className="text-sm text-blue-600 mt-1">{dept.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Saving Plan */}
                  <div className="bg-white p-6 rounded-lg shadow-md ">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">Saving Plan</h3>
                    <div className="space-y-6">
                      {savingPlans.map((plan) => (
                        <div key={plan.id} className="border-b pb-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <span className="mr-3 text-xl">{plan.icon}</span>
                              <p className="font-medium text-gray-800">{plan.name}</p>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700 ">
                              •••
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            Target: ₹{plan.target.toLocaleString()}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-500 h-3 rounded-full"
                              style={{ width: `${(plan.saved / plan.target) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Saved: ₹{plan.saved.toLocaleString()} (
                            {((plan.saved / plan.target) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Disaster Impact Summary */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Disaster Impact Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Affected Population:</span>{" "}
                        {disasterImpact.affectedPopulation.toLocaleString()}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Injuries:</span>{" "}
                        {disasterImpact.injuries.toLocaleString()}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Fatalities:</span>{" "}
                        {disasterImpact.fatalities.toLocaleString()}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Areas Impacted:</span>{" "}
                        {disasterImpact.areasImpacted.join(", ")}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Homes Destroyed:</span>{" "}
                        {disasterImpact.homesDestroyed.toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Schools Affected:</span>{" "}
                        {disasterImpact.schoolsAffected.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <img
                        src="/Images/bridge_collapse.jpeg"
                        alt="Affected Areas Map"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Recovery Progress */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Recovery Progress
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={recoveryProjects} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="progress" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Resource Allocation Post-Disaster */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Resource Allocation Post-Disaster
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Emergency Funds Used:</span> ₹
                    {resourceAllocation.emergencyFundsUsed.toLocaleString()}
                  </p>
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">
                    Supplies Distributed
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-gray-600 font-medium">Supply Type</th>
                          <th className="py-3 px-4 text-gray-600 font-medium">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resourceAllocation.suppliesDistributed.map((item, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{item.supplyType}</td>
                            <td className="py-3 px-4">{item.quantity.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-700 mt-4">
                    <span className="font-medium">Personnel Deployed:</span>{" "}
                    {resourceAllocation.personnelDeployed.toLocaleString()}
                  </p>
                </div>

                {/* Community Support Metrics */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Community Support Metrics
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <span className="font-medium">Donations Received:</span> ₹
                      {communitySupport.donationsReceived.toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Volunteers Registered:</span>{" "}
                      {communitySupport.volunteersRegistered.toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Programs Initiated:</span>{" "}
                      {communitySupport.programsInitiated.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-lg mb-8 shadow-md ">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Notifications</h3>
                  <ul className="space-y-4">
                    {notifications.map((note) => (
                      <li
                        key={note.id}
                        className={`p-4 rounded-lg ${
                          note.type === "alert"
                            ? "bg-red-100 text-red-700 "
                            : "bg-blue-100 text-blue-700 "
                        }`}
                      >
                        {note.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DisasterManagement;
