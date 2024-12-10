import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, CheckSquare, Users, Clock } from 'lucide-react';
import Navbar from './Navbar';

const ProjectUpdateForm = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 30 days');

  const summaryData = [
    { name: 'Phase', value: 2, total: 4, icon: Briefcase, color: '#10B981', change: 10 },
    { name: 'Tasks', value: 15, total: 24, icon: CheckSquare, color: '#EF4444', change: -5 },
    { name: 'Resources', value: 85, total: 90, icon: Users, color: '#3B82F6', change: 8 },
    { name: 'Time Spent', value: 50, total: '?', icon: Clock, color: '#F59E0B', change: -3 },
  ];

  const projectData = [
    { name: 'Parks and Recreation', status: 'Completed', progress: 100 },
    { name: 'Public Works', status: 'On Track', progress: 60 },
    { name: 'Environmental Protection', status: 'Delayed', progress: 30 },
    { name: 'Budget Management', status: 'At Risk', progress: 20 },
  ];

  const milestoneData = [
    { name: 'Project Initiation', status: 'Completed', progress: 100 },
    { name: 'Design Phase', status: 'On Track', progress: 80 },
    { name: 'Construction Start', status: 'Delayed', progress: 50 },
    { name: 'Environmental Impact Assessment', status: 'At Risk', progress: 40 },
  ];

  const overallProgress = 70;
  const progressBreakdown = [
    { name: 'Completed', value: 15, color: '#10B981' },
    { name: 'In Progress', value: 5, color: '#3B82F6' },
    { name: 'Delayed', value: 4, color: '#F59E0B' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto m-8 font-medium"
        >
          Update Info
        </button>

        
<header className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">Details</h1>
<select
  value={timeRange}
  onChange={(e) => setTimeRange(e.target.value)}
  className="bg-white border border-gray-300 rounded-md px-3 py-2"
>
  <option>Last 30 days</option>
  <option>Last 60 days</option>
  <option>Last 90 days</option>
</select>
</header>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
{summaryData.map((item) => (
  <div key={item.name} className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-500">{item.name}</span>
      <item.icon className="text-gray-400" size={20} />
    </div>
    <div className="flex items-end">
      <span className="text-2xl font-bold">{item.value}</span>
      <span className="text-sm text-gray-500 ml-1">/ {item.total}</span>
    </div>
    <div className={`text-sm ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
      {item.change > 0 ? '▲' : '▼'} {Math.abs(item.change)}% from last month
    </div>
  </div>
))}
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
<div className="bg-white p-4 rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-4">Project Summary</h2>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-sm text-gray-500">
          <th className="pb-2">Project Name</th>
          <th className="pb-2">Status</th>
          <th className="pb-2">Progress</th>
        </tr>
      </thead>
      <tbody>
        {projectData.map((project) => (
          <tr key={project.name} className="border-t">
            <td className="py-2">{project.name}</td>
            <td className="py-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </td>
            <td className="py-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
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

<div className="bg-white p-4 rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
  <div className="flex items-center justify-between">

  <div>
      {progressBreakdown.map((item) => (
        <div key={item.name} className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
          <span className="text-sm">
            {item.value} {item.name}
          </span>
        </div>
      ))}
    </div>

    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600">{overallProgress}%</div>
      <div className="text-sm text-gray-500">Completed</div>
    </div>

    <PieChart width={180} height={180}>
      <Pie
        data={progressBreakdown}
        cx={80}
        cy={80}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      >
        {progressBreakdown.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    
  </div>
</div>
</div>

<div className="bg-white p-4 rounded-lg shadow mb-6">
<h2 className="text-lg font-semibold mb-4">Milestone Progress</h2>
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="text-sm text-gray-500">
        <th className="pb-2">Milestone</th>
        <th className="pb-2">Status</th>
        <th className="pb-2">Progress</th>
      </tr>
    </thead>
    <tbody>
      {milestoneData.map((milestone) => (
        <tr key={milestone.name} className="border-t">
          <td className="py-2">{milestone.name}</td>
          <td className="py-2">
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(milestone.status)}`}>
              {milestone.status}
            </span>
          </td>
          <td className="py-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
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

        {isUpdateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Update Project Info</h2>

              <form className="space-y-8">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phase</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter value"
                      />
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter total"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Tasks</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter value"
                      />
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter total"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Resources</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter value"
                      />
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter total"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Time Spent</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter value"
                      />
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter total"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Parks & Recreation', 'Public Works', 'Environmental Protection', 'Budget Management'].map((section) => (
                    <div key={section} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">{section}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Status</label>
                          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Completed">Completed</option>
                            <option value="On Track">On Track</option>
                            <option value="Delayed">Delayed</option>
                            <option value="At Risk">At Risk</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Progress (%)</label>
                          <input type="range" min="0" max="100" className="w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Project Initiation', 'Design Phase', 'Construction Start', 'Environmental Impact Assessment'].map((section) => (
                    <div key={section} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">{section}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Status</label>
                          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Completed">Completed</option>
                            <option value="On Track">On Track</option>
                            <option value="Delayed">Delayed</option>
                            <option value="At Risk">At Risk</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Progress (%)</label>
                          <input type="range" min="0" max="100" className="w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Completed"
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="In progress"
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Delayed"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
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