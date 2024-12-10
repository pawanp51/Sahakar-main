import React, { useState } from 'react';
import Navbar from './Navbar';
import { useProjContext } from '../../ContextApi/ProjContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const ProjectDetails = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      case 'At Risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const {projectdetails} = useProjContext();

  return (
    <div className="min-h-screen bg-white-100">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">
       

     

       
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

export default ProjectDetails;
