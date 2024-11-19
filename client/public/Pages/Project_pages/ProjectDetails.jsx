import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, CheckSquare, Users, Clock } from 'lucide-react';
import Navbar from './Navbar';

const ProjectDetails = () => {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [activeIndex, setActiveIndex] = useState(null);

  const summaryData = [
    { name: 'Projects', value: 850, total: 1100, icon: Briefcase, color: '#10B981', change: 10 },
    { name: 'Tasks', value: 100, total: 110, icon: CheckSquare, color: '#EF4444', change: -5 },
    { name: 'Resources', value: 85, total: 90, icon: Users, color: '#3B82F6', change: 8 },
    { name: 'Time Spent', value: 752, total: 885, icon: Clock, color: '#F59E0B', change: -3 },
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

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

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
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={progressBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    activeIndex={activeIndex}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationBegin={0}
                    animationEasing="ease-out"
                  >
                    {progressBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        cursor="pointer"
                        onMouseEnter={() => setActiveIndex(index)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{overallProgress}%</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div>
                {progressBreakdown.map((item, index) => (
                  <div
                    key={item.name}
                    className={`flex items-center mb-1 ${activeIndex === index ? 'font-bold text-blue-600' : ''}`}
                  >
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

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Objectives</h3>
              <p>Increase urban green spaces by 30% in three years.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Departments</h3>
              <ul className="list-disc list-inside">
                <li>Parks and Recreation: Design layouts</li>
                <li>Public Works: Manage construction</li>
                <li>Environmental Protection: Monitor compliance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Budget</h3>
              <p>$5 million total; $3 million state grants, $2 million local taxes</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Timeline</h3>
              <ul className="list-disc list-inside">
                <li>Start: January 2025</li>
                <li>First Green Space Opening: April 2026</li>
                <li>Completion: December 2027</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Stakeholders</h3>
              <p>Local community groups, NGOs, city council</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Risks</h3>
              <p>Budget overruns, community resistance, weather delays</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <p>Monthly meetings internally; quarterly public newsletters</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Metrics</h3>
              <p>Number of green spaces created, community engagement, air quality improvement</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal Compliance</h3>
              <p>Adherence to zoning and environmental regulations</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sustainability</h3>
              <p>Community gardens for maintenance; $100,000 annual upkeep budget</p>
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
