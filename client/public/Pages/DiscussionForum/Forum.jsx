import React, { useState } from 'react';
import { 
  MessageCircle, 
  Users, 
  Globe, 
  Search, 
  PlusCircle,
  Paperclip
} from 'lucide-react';
import { FiMessageCircle } from "react-icons/fi";
import { Outlet, Link, useLocation } from 'react-router-dom';


const Forum = () => {

  const location = useLocation();

  const sections = [
    { 
      id: 'intra-department', 
      path: '/Forum/IntraDepartment',
      icon: <Users />, 
      name: 'Intra-Department'
    },
    { 
      id: 'inter-department', 
      path: '/Forum/InterDepartment',
      icon: <Globe />, 
      name: 'Inter-Department'
    },
    { 
      id: 'message', 
      path: '/Forum/Discussion',
      icon: <MessageCircle />, 
      name: 'Messages'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>
          
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${
                location.pathname === section.path
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {section.icon}
              <span className="ml-3">{section.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Discussion Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <div className="relative flex-1 mr-4">
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            {/* <button>
              <FiMessageCircle size={25} />
            </button> */}
          </div>
        </div>

        {/* Threads Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default Forum;