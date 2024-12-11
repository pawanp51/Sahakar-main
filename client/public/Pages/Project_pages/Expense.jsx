import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell } from 'lucide-react';
import Navbar from './Navbar';
import { useProjContext } from '../../ContextApi/ProjContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Header = () => (
  <header className="bg-white p-2 sm:p-4 flex justify-between items-center">
    <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
    <div className="flex items-center space-x-2 sm:space-x-4">
      <Bell size={20} />
    </div>
  </header>
);

const StatCard = ({ label, value, change, color, graph }) => (
  <div className={`bg-${color}-100 p-3 sm:p-4 rounded-lg`}>
    <p className="text-xs sm:text-sm text-gray-600">{label}</p>
    <p className="text-xl sm:text-2xl font-semibold">${value}</p>
    <div className="flex items-center">
      <span className={`text-xs sm:text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
      </span>
      <ResponsiveContainer width="50%" height={20}>
        <LineChart data={graph.slice(-5)}>
          <Line type="monotone" dataKey={label === "Total expense" ? "expense" : "income"} stroke={change > 0 ? "#10B981" : "#EF4444"} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Expense = () => {
  const {projectdetails} = useProjContext();

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
        <div className="flex-1 overflow-hidden">
          <Header />
          <main className="p-3 sm:p-6 overflow-y-auto" style={{height: 'calc(100vh - 64px)'}}>
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{projectdetails.projectname}</h2>
              <p className="text-xs sm:text-sm text-gray-600">Let's manage & analyse expenditure</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <StatCard label="Total revenue" value={projectdetails.revenue} change={8.5} color="blue" graph={projectdetails.graph} />
              <StatCard label="Total expense" value={projectdetails.expense} change={-10.2} color="red" graph={projectdetails.graph} />
              <StatCard label="Total profit" value={projectdetails.profit} change={16.4} color="green" graph={projectdetails.graph} />
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-0">Analysis</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-xs sm:text-sm">Income</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                    <span className="text-xs sm:text-sm">Expense</span>
                  </div>
                  <select className="bg-gray-100 text-xs sm:text-sm p-1 rounded">
                    <option>2022</option>
                    <option>2023</option>
                  </select>
                </div>
              </div>
              <div className="h-[200px] sm:h-[300px] w-full">
                <ResponsiveContainer>
                  <LineChart data={projectdetails.graph}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="expense" stroke="#EF4444" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Transaction history</h3>
              <div className="min-w-[640px]">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-2 text-xs sm:text-sm">Transaction</th>
                      <th className="pb-2 text-xs sm:text-sm">Type</th>
                      <th className="pb-2 text-xs sm:text-sm">Amount</th>
                      <th className="pb-2 text-xs sm:text-sm">Date</th>
                      <th className="pb-2 text-xs sm:text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectdetails.transaction.map((transaction, index) => (
                      <tr key={index} className="text-xs sm:text-sm">
                        <td className="py-2 flex items-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-green-600 font-bold">U</span>
                          </div>
                          {transaction.name}
                        </td>
                        <td>{transaction.type}</td>
                        <td>${transaction.Amount}</td>
                        <td>{transaction.Date}</td>
                        <td className="text-green-600">{transaction.Status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>

        <div className="w-full lg:w-64 bg-white p-3 sm:p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold">My Department</h3>
            <button className="text-blue-500 text-xs sm:text-sm">+ Add Resources</button>
          </div>
          <div className="bg-black text-white p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm mb-2">{projectdetails.mydept}</p>
            <p className="text-base sm:text-lg mb-2">Investment</p>
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm">{projectdetails.investment}</p>
              <div className="w-6 sm:w-8 h-3 sm:h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-semibold mb-4">Saving plan</h3>
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {projectdetails.savingplan.map((plan, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="mr-2"></span>
                    <p className="text-xs sm:text-sm">{plan.name}</p>
                  </div>
                  <button className="text-xs sm:text-sm">•••</button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Target: ${plan.target}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Saving: ${plan.saving}</p>
              </div>
            ))}
          </div>

          <h3 className="text-base sm:text-lg font-semibold mb-4">Expense Breakdown</h3>
          <div className="h-[150px] sm:h-[200px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={projectdetails.expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectdetails.expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <h3 className="text-base sm:text-lg font-semibold my-4">Quick Audit</h3>
          <div className="flex space-x-2">
            {['D', 'O', 'N', 'E'].map((initial, index) => (
              <div key={index} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs sm:text-sm">
                {initial}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
