import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, CheckSquare, Users, Clock } from 'lucide-react';
import Navbar from './Navbar';
import { useProjContext } from '../../ContextApi/ProjContext';

const ProjectDetails = () => {

  const [timeRange, setTimeRange] = useState('Last 30 days');
  const {projectdetails} = useProjContext();

  return (
    <div className="min-h-screen bg-white-100">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">
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
          {projectdetails.summaryData.map((item) => (
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
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-2">Project Name</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projectdetails.projectData.map((project) => (
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
              <PieChart width={160} height={160}>
                <Pie
                  data={projectdetails.progressBreakdown}
                  cx={80}
                  cy={80}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectdetails.progressBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{projectdetails.overallProgress}%</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div>
                {projectdetails.progressBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">
                      {item.value} {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Milestone Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-2">Milestone</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {projectdetails.milestoneData.map((milestone) => (
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

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Objectives</h3>
              <p>{projectdetails.objectives}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Departments</h3>
              <ul className="list-disc list-inside">
               {projectdetails.departments.map((department) =>
                <li key={department}>{department}</li> 
              )
              }
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Budget</h3>
              <p>$5 million total; $3 million state grants, $2 million local taxes</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Timeline</h3>
              <ul className="list-disc list-inside">
              {projectdetails.timeline.map((timeline) =>
                <li key={timeline}>{timeline}</li> 
              )
              }
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Stakeholders</h3>
              <p>{projectdetails.stakeholders}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Risks</h3>
              <p>{projectdetails.risks}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <p>{projectdetails.communication}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Metrics</h3>
              <p>{projectdetails.metrics}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal Compliance</h3>
              <p>{projectdetails.legal}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sustainability</h3>
              <p>{projectdetails.sustainability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'On Track':
      return 'bg-blue-100 text-blue-800';
    case 'Delayed':
      return 'bg-yellow-100 text-yellow-800';
    case 'At Risk':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default ProjectDetails;