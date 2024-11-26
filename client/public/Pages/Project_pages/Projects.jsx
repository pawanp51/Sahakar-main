import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AlertCircle, Menu, X } from 'lucide-react'; // Import icons
import bannerImage from '/Images/Proj_banner.png';

// Sidebar component
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    setIsOpen(false); // Close sidebar on navigation (for mobile)
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-4 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end">
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => handleNavigation('/Dashboard')}
            className="block py-2 px-4 rounded text-left w-full transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none"
          >
            &lt; Go Back
          </button>
          {[
            { name: 'My Profile', path: '/MyProfile' },
            { name: 'Task Management', path: '/TaskManager' },
            { name: 'Disaster Management', path: '/DisasterManagement' },
            { name: 'Project Directory', path: '/Expense' },
            { name: 'Meeting Scheduling', path: '/Meeting' },
            { name: 'Notifications', path: '/Notifications' },
            { name: 'Seminar/Workshops', path: '/Seminar' },
            { name: 'Discussions', path: '/Discussion' },
            { name: 'GIS', path: '/GIS' },
            { name: 'Geotagging', path: '/Geotagging' },
            { name: 'Inventory', path: '/Inventory' },
            { name: 'Templates', path: '/Templates' },
            { name: 'Staff', path: '/Staff' },
            { name: 'Complaints', path: '/Complaints' },
            { name: 'Office Budget', path: '/OfficeBudget' },
          ].map(({ name, path }) => (
            <button
              key={name}
              onClick={() => handleNavigation(path)}
              className="block py-2 px-4 rounded text-left w-full transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none"
            >
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1">
        {/* Hamburger icon for mobile */}
        <div className="md:hidden p-4 bg-blue-900 text-white flex justify-between items-center">
          <h1 className="text-lg font-semibold">Menu</h1>
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// ProjectList component
const ProjectList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate('/Expense'); // Navigate to ProjectDetails page
  };

  return (
    <div className="mt-6">
      {[
        { id: 6432, name: 'National Gas Infrastructure Development Plan', progress: 100 },
        { id: 4530, name: 'National Gas Pipeline Expansion Initiative', progress: 64 },
        { id: 2343, name: 'National Highway Expansion Project', progress: 66 },
        { id: 1234, name: 'Maharashtra Highway Expansion Project', progress: 38 },
      ].map((project) => (
        <div
          key={project.id}
          onClick={() => handleCategoryClick(project.id)}
          className="mb-4 bg-white p-4 rounded-lg shadow cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">
              {project.id} - {project.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handleCategoryClick(project.id);
              }}
              className="text-sm bg-blue-600 text-white px-2 py-1 rounded transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none"
            >
              View Project
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{project.progress}% Complete</span>
        </div>
      ))}
    </div>
  );
};

// Projects component
const Projects = () => {
  const navigate = useNavigate();

  const handleCreateProjectClick = () => {
    navigate('/CreateProjectForm'); // Navigate to CreateProjectForm page
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <img
          src={bannerImage}
          alt="Project Banner"
          className="w-full h-56 object-cover mb-4 rounded-lg"
        />
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Ongoing Projects</h2>
            <div className="flex mt-4 md:mt-0 md:ml-4 gap-4">
              <button
                className="px-3 py-1 bg-blue-900 text-white rounded flex items-center mb-2 md:mb-0 md:mr-2 transform transition-transform duration-200 hover:scale-105 hover:bg-blue-800 focus:outline-none"
                onClick={handleCreateProjectClick} // Handle create project click
              >
                Create Project
              </button>
              <button className="px-3 py-1 bg-blue-900 text-white rounded flex items-center transform transition-transform duration-200 hover:scale-105 hover:bg-blue-800 focus:outline-none">
                <AlertCircle className="mr-1" size={16} />
                Filter
              </button>
            </div>
          </div>
          <ProjectList />
        </div>
      </main>
    </div>
  );
};

export default Projects;



