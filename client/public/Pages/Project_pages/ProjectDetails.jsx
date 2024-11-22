import React, { useState } from 'react';
import Navbar from './Navbar';

const ProjectDetails = () => {

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

        <div className="bg-white p-4 rounded-lg shadow mt-4">
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

export default ProjectDetails;
