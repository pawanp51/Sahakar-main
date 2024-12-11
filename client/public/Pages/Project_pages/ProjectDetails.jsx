import React, { useState } from 'react';
import Navbar from './Navbar';
import { useProjContext } from '../../ContextApi/ProjContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ProjectDetails = () => {
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

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const [timeRange, setTimeRange] = useState('Last 30 days');
  const { projectdetails } = useProjContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
            
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Objectives Section */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Objectives</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.objectives}</p>
                </div>

                {/* Departments Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Departments</h3>
                  <ul className="space-y-2">
                    {projectdetails.departments.map((department) => (
                      <li key={department} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-gray-700">{department}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Budget Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Budget</h3>
                  <p className="text-gray-700">$5 million total; $3 million state grants, $2 million local taxes</p>
                </div>
              </div>

              {/* Timeline and Other Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
                  <ul className="space-y-2">
                    {projectdetails.timeline.map((timeline) => (
                      <li key={timeline} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-gray-700">{timeline}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stakeholders Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stakeholders</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.stakeholders}</p>
                </div>

                {/* Risks Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Risks</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.risks}</p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Communication Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.communication}</p>
                </div>

                {/* Metrics Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Metrics</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.metrics}</p>
                </div>

                {/* Legal Compliance Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Compliance</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.legal}</p>
                </div>

                {/* Sustainability Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sustainability</h3>
                  <p className="text-gray-700 leading-relaxed">{projectdetails.sustainability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
