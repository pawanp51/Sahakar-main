import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell } from 'lucide-react';
import Navbar from './Navbar';

const monthlyData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 4000, expense: 2400 },
  { name: 'Sep', income: 3000, expense: 1398 },
  { name: 'Oct', income: 2000, expense: 9800 },
  { name: 'Nov', income: 2780, expense: 3908 },
  { name: 'Dec', income: 1890, expense: 4800 },
];

const expenseData = [
  { name: 'Housing', value: 35 },
  { name: 'Transportation', value: 20 },
  { name: 'Food', value: 15 },
  { name: 'Utilities', value: 10 },
  { name: 'Insurance', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Header = () => (
  <header className="bg-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-semibold">Dashboard</h1>
    <div className="flex items-center space-x-4">
      <Bell size={20} />
    </div>
  </header>
);

const StatCard = ({ label, value, change, color }) => (
  <div className={`bg-${color}-100 p-4 rounded-lg`}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-semibold">${value}</p>
    <div className="flex items-center">
      <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
      </span>
      <ResponsiveContainer width="50%" height={20}>
        <LineChart data={monthlyData.slice(-5)}>
          <Line type="monotone" dataKey={label === "Total expense" ? "expense" : "income"} stroke={change > 0 ? "#10B981" : "#EF4444"} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Expense = () => {
  return (
    <div className="flex flex-col bg-white h-screen">
      <Navbar></Navbar>

      <div className="flex flex-1">
        <div className="flex-1 h-full overflow-y-auto">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Navi Mumbai International Airport</h2>
              <p className="text-sm text-gray-600">Let's manage & analyse expenditure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard label="Total revenue" value="320,000" change={8.5} color="blue" />
              <StatCard label="Total expense" value="240,000" change={-10.2} color="red" />
              <StatCard label="Total profit" value="160,000" change={16.4} color="green" />
            </div>

            <div className="bg-white p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Analysis</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-sm">Income</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                    <span className="text-sm">Expense</span>
                  </div>
                  <select className="bg-gray-100 text-sm p-1 rounded">
                    <option>2022</option>
                    <option>2023</option>
                  </select>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
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

            <div className="bg-white p-4 rounded-lg mb-6 border border-black">
              <h3 className="text-lg font-semibold mb-4">Transaction history</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-2">Transaction</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 font-bold">U</span>
                      </div>
                      Land
                    </td>
                    <td>Housing</td>
                    <td>$150.00</td>
                    <td>14 Aug, 2023</td>
                    <td className="text-green-600">Credited</td>
                  </tr>
                  <tr>
                    <td className="py-2 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                        <span className="text-red-600 font-bold">N</span>
                      </div>
                      Runway
                    </td>
                    <td>Roads</td>
                    <td>$60.00</td>
                    <td>10 Aug, 2023</td>
                    <td className="text-red-600">Debited</td>
                  </tr>
                  <tr>
                    <td className="py-2 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 font-bold">S</span>
                      </div>
                      Pipelines
                    </td>
                    <td>Waters</td>
                    <td>$10.00</td>
                    <td>29 July, 2023</td>
                    <td className="text-red-600">Debited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
        <div className="w-64 bg-white-100 h-64 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">My Department</h3>
            <button className="text-blue-500">+ Add Resources</button>
          </div>
          <div className="bg-black text-white p-4 rounded-lg mb-6 flex-1">
            <p className="text-sm mb-2">Roads & Transport</p>
            <p className="text-lg mb-2">Investment</p>
            <div className="flex justify-between items-center">
              <p className="text-sm">$423,007</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Saving plan</h3>
          <div className="space-y-4 mb-6 flex-1">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="mr-2">🚗</span>
                  <p>New Runway</p>
                </div>
                <button>•••</button>
              </div>
              <p className="text-sm text-gray-600 mb-1">Target: $20,000</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Saving: $17,563</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="mr-2">🏠</span>
                  <p>New Terminal</p>
                </div>
                <button>•••</button>
              </div>
              <p className="text-sm text-gray-600 mb-1">Target: $150,000</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Saving: $19,759</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h3 className="text-lg font-semibold my-4">Quick Audit</h3>
          <div className="flex space-x-2">
            {['D', 'O', 'N', 'E'].map((initial, index) => (
              <div key={index} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
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