import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, CheckSquare, Users, Clock } from 'lucide-react';
import Navbar from './Navbar';
import { useProjContext } from '../../ContextApi/ProjContext';

const ProjectUpdateForm = () => {
  const {projectdetails} = useProjContext();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 30 days');

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 w-full sm:w-auto m-4 sm:m-8 font-medium text-sm sm:text-base"
          >
            Update Info
          </button>
        </div>

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 px-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Details</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base"
          >
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
          </select>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 px-4">
          {projectdetails.summaryData.map((item) => (
            <div key={item.name} className="bg-white p-3 sm:p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-500">{item.name}</span>
                <item.icon className="text-gray-400" size={16} />
              </div>
              <div className="flex items-end">
                <span className="text-lg sm:text-2xl font-bold">{item.value}</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1">/ {item.total}</span>
              </div>
              <div className={`text-xs sm:text-sm ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change > 0 ? '▲' : '▼'} {Math.abs(item.change)}% from last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 px-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Project Summary</h2>
            <div className="overflow-x-auto -mx-3 sm:-mx-4">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-xs sm:text-sm text-gray-500">
                      <th className="pb-2 px-3">Project Name</th>
                      <th className="pb-2 px-3">Status</th>
                      <th className="pb-2 px-3">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectdetails.projectData.map((project) => (
                      <tr key={project.name} className="border-t">
                        <td className="py-2 px-3 text-xs sm:text-sm">{project.name}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Progress</h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <h3 className="text-sm font-medium mb-2">Overall</h3>
                {projectdetails.progressBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center mb-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs sm:text-sm">
                      {item.value} {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-blue-600">{projectdetails.overallProgress}%</div>
                <div className="text-xs sm:text-sm text-gray-500">Completed</div>
              </div>

              <div className="w-full sm:w-auto flex justify-center">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={projectdetails.progressBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectdetails.progressBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6 mx-4">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Milestone Progress</h2>
          <div className="overflow-x-auto -mx-3 sm:-mx-4">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs sm:text-sm text-gray-500">
                    <th className="pb-2 px-3">Milestone</th>
                    <th className="pb-2 px-3">Status</th>
                    <th className="pb-2 px-3">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projectdetails.milestoneData.map((milestone) => (
                    <tr key={milestone.name} className="border-t">
                      <td className="py-2 px-3 text-xs sm:text-sm">{milestone.name}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isUpdateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Update Project Info</h2>

              <form className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {['Phase', 'Tasks', 'Resources', 'Time Spent'].map((label) => (
                    <div key={label}>
                      <label className="block text-gray-700 font-medium mb-2 text-sm">{label}</label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Enter value"
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Enter total"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {projectdetails.projectData.map((section) => (
                    <div key={section.name} className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">{section.name}</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">Status</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="Completed">Completed</option>
                            <option value="On Track">On Track</option>
                            <option value="Delayed">Delayed</option>
                            <option value="At Risk">At Risk</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">Progress (%)</label>
                          <input type="range" min="0" max="100" className="w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {['Completed', 'In progress', 'Delayed'].map((placeholder) => (
                    <input
                      key={placeholder}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={placeholder}
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="w-full sm:w-auto bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-600 text-sm"
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'On Track': return 'bg-blue-100 text-blue-800';
    case 'Delayed': return 'bg-yellow-100 text-yellow-800';
    case 'At Risk': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default ProjectUpdateForm;
