import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CurrentYearBudget = ({ allocation, spent }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 md:mr-4">
      <h3 className="text-lg font-medium mb-4 text-blue-700">Current Year Budget</h3>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 md:mr-4">
          <span className="mr-2 text-gray-600">Budget Allocation:</span>
          <span className="font-medium text-green-500">₹{allocation.toLocaleString()}</span>
        </div>
        <div>
          <span className="mr-2 text-gray-600">Funds Spent:</span>
          <span className="font-medium text-red-500">₹{spent.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const BudgetHistoryTable = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
      <h3 className="text-lg font-medium mb-4 text-blue-700">Budget History</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left text-gray-600">Year</th>
              <th className="p-2 border text-right text-gray-600">Allocation</th>
              <th className="p-2 border text-right text-gray-600">Spent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border font-medium">{item.year}</td>
                <td className="p-2 border text-right">₹{item.allocation.toLocaleString()}</td>
                <td className="p-2 border text-right">₹{item.spent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OfficeBudget = () => {
  const budgetData = [
    { year: 2020, allocation: 12000000, spent: 10500000 },
    { year: 2021, allocation: 14000000, spent: 13800000 },
    { year: 2022, allocation: 16000000, spent: 15700000 },
    { year: 2023, allocation: 18000000, spent: 17200000 },
    { year: 2024, allocation: 20000000, spent: 19000000 },
  ];
  const [departmentName] = useState('Electricity');

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{departmentName} Department Budget</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <CurrentYearBudget
          allocation={budgetData[budgetData.length - 1].allocation}
          spent={budgetData[budgetData.length - 1].spent}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={budgetData}>
          <XAxis dataKey="year" />
          <YAxis
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
            width={100}
            tickSize={0}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="allocation" stroke="#1a56db" />
          <Line type="monotone" dataKey="spent" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <BudgetHistoryTable data={budgetData} />
    </div>
  );
};

export default OfficeBudget;