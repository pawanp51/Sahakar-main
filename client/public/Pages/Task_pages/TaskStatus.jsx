import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';

// StatusTaskTable component
const StatusTaskTable = () => {
  const navigate = useNavigate();
  const tasks = [
    { id: 'T-12345', name: 'Complete Report', date: '09/15/24', assignedBy: 'Alice Johnson', department: 'Inter-department', status: 'Pending' },
    { id: 'T-12346', name: 'Update Website', date: '09/14/24', assignedBy: 'Bob Smith', department: 'Intra-department', status: 'Pending' },
    { id: 'T-12347', name: 'Design Marketing Materials', date: '09/13/24', assignedBy: 'Charlie Brown', department: 'Inter-department', status: 'Completed' },
    { id: 'T-12348', name: 'Conduct Team Meeting', date: '09/12/24', assignedBy: 'Dana White', department: 'Intra-department', status: 'Requested' },
    { id: 'T-12349', name: 'Prepare Presentation', date: '09/11/24', assignedBy: 'Eva Green', department: 'Intra-department', status: 'Pending' },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Task List</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b space-y-2 sm:space-y-0">
          <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="flex items-center justify-center px-4 py-2 border rounded-md w-full sm:w-auto">
              <Filter size={20} className="mr-2" />
              Filters
            </button>
            <button
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto"
              onClick={() => navigate('/CreateTask')}
            >
              <Plus size={20} className="mr-2" />
              Add Task
            </button>
          </div>
        </div>
        <div className="overflow-x-auto"> {/* Enable horizontal scroll for tables */}
          <table className="w-full min-w-[600px] table-auto"> {/* Ensure minimum width for table */}
          <thead>
              <tr className="">
                <th className="px-2 py-3">ID</th>
                <th className="px-2 py-3">Task Name</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Assigned By</th>
                <th className="px-2 py-3">Department</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="px-4 py-2">{task.id}</td>
                  <td className="px-4 py-2">{task.name}</td>
                  <td className="px-4 py-2">{task.date}</td>
                  <td className="px-4 py-2">{task.assignedBy}</td>
                  <td className="px-4 py-2">{task.department}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'Status' ? '' :
                      task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {task.status === 'Pending' && (
                      <button
                        onClick={() => navigate('/Task')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      >
                        Complete Task
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <div className="flex space-x-2">
            <button className="px-2 py-1 border rounded-md">&lt;</button>
            <button className="px-2 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-2 py-1 border rounded-md">2</button>
            <span className="px-2 py-1">...</span>
            <button className="px-2 py-1 border rounded-md">7</button>
            <button className="px-2 py-1 border rounded-md">8</button>
            <button className="px-2 py-1 border rounded-md">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTaskTable;
