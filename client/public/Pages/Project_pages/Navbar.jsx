import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PieChart, ChevronLeft, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Expense',
      path: '/Expense',
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />
    },
    {
      label: 'Project Analysis',
      path: '/ProjectAnalysis',
      icon: <FileText className="w-5 h-5 mr-2" />
    },
    {
      label: 'Project Details',
      path: '/ProjectDetails',
    }
    // {
    //   label: 'Disaster Management',
    //   path: '/DisasterManagement',
    //   icon: <FileText className="w-5 h-5 mr-2" />
    // }
  ];

  const handleBack = () => {
    navigate('/projects');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Back button on the left */}
          <div className="flex-shrink-0">
            <button
              onClick={handleBack}
              className="inline-flex items-center py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
          </div>

          {/* Centered navigation buttons */}
          <div className="flex-grow flex justify-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors
                  ${location.pathname === item.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Forward button on the right */}
          <div className="flex-shrink-0">
            <button
              className="inline-flex items-center py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 text-base font-medium
                  ${location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
