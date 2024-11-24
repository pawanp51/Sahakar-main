import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [showForwardDepartments, setShowForwardDepartments] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [forwardedTo, setForwardedTo] = useState('');

  const departments = ['Road Transport', 'Water', 'Civil', 'Electrical', 'Mechanical'];

  const [complaints, setComplaints] = useState([
    {
      id: 'C1234',
      name: 'Raj Kumar Sharma',
      subject: 'Street Lights not working',
      date: '17/2/2024',
      location: 'Baner, Pune',
      department: 'Electrical',
    },
    {
      id: 'C1235',
      name: 'Aarti Patel',
      subject: 'Dustbins are overflowing',
      date: '20/2/2024',
      location: 'Hadapsar, Pune',
      department: 'Civil',
    },
    {
      id: 'C1236',
      name: 'Vikram Singh',
      subject: 'Potholes on main road',
      date: '25/2/2024',
      location: 'Viman Nagar, Pune',
      department: 'Road Transport',
    },
    {
      id: 'C1237',
      name: 'Priya Deshmukh',
      subject: 'Water leakage in society',
      date: '28/2/2024',
      location: 'Kothrud, Pune',
      department: 'Water',
    },
    {
      id: 'C1238',
      name: 'Amit Agarwal',
      subject: 'Noise pollution due to construction',
      date: '3/3/2024',
      location: 'Aundh, Pune',
      department: 'Civil',
    },
    {
      id: 'C1239',
      name: 'Sneha Nair',
      subject: 'Illegal parking on street',
      date: '6/3/2024',
      location: 'Wakad, Pune',
      department: 'Road Transport',
    },
  ]);

  const [forwardedComplaints, setForwardedComplaints] = useState([
    {
      id: 'F5678',
      name: 'Suresh Raina',
      subject: 'Road Maintenance Request',
      date: '10/9/2024',
      location: 'Sector 17, Chandigarh',
      department: 'Road Transport',
    },
    {
      id: 'F5679',
      name: 'Pooja Singh',
      subject: 'Street flooding during rains',
      date: '15/9/2024',
      location: 'MG Road, Pune',
      department: 'Water',
    },
  ]);

  // Handle search and department filtering
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartments.length === 0 || selectedDepartments.includes(complaint.department))
  );

  const handleDepartmentSelect = (dept) => {
    if (selectedDepartments.includes(dept)) {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== dept));
    } else {
      setSelectedDepartments([...selectedDepartments, dept]);
    }
  };

  const toggleForwardDepartments = (id) => {
    setShowForwardDepartments((prev) => (prev === id ? null : id));
  };

  const handleForwardClick = (dept, complaint) => {
    setForwardedComplaints([...forwardedComplaints, complaint]);
    setShowForwardDepartments(null);
    setForwardedTo(dept);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="font-medium text-xl sm:text-2xl text-blue-900">Grievances List</h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={() => setFilterVisible(!filterVisible)}
            className="border rounded-md p-3 bg-blue-700 text-white hover:bg-blue-600 w-full sm:w-auto"
          >
            Apply Filter
          </button>
          <div className="flex items-center gap-3 w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md p-3 flex-1 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoSearchSharp size={30} className="cursor-pointer text-blue-700 hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filter section */}
      {filterVisible && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-medium text-lg text-gray-700 mb-4">Select Departments:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept} className="flex items-center">
                <input
                  type="checkbox"
                  id={dept}
                  checked={selectedDepartments.includes(dept)}
                  onChange={() => handleDepartmentSelect(dept)}
                  className="mr-2"
                />
                <label htmlFor={dept} className="text-gray-700">{dept}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="mb-6 border-gray-300" />

      {/* Complaints table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table-auto min-w-full text-left bg-white">
          <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <tr className="h-16">
              <th className="px-4 py-2 text-center">C-id</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Subject</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Location</th>
              <th className="px-4 py-2 text-center">Department</th>
              <th className="px-4 py-2 text-center">Forward</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id} className="border-b hover:bg-gray-100 transition-all duration-150">
                <td className="px-4 py-2 text-center">{complaint.id}</td>
                <td className="px-4 py-2 text-center">{complaint.name}</td>
                <td className="px-4 py-2 text-center">{complaint.subject}</td>
                <td className="px-4 py-2 text-center">{complaint.date}</td>
                <td className="px-4 py-2 text-center">{complaint.location}</td>
                <td className="px-4 py-2 text-center">{complaint.department}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="border rounded-md p-2 px-4 bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                    onClick={() => toggleForwardDepartments(complaint.id)}
                  >
                    Forward
                  </button>
                  {showForwardDepartments === complaint.id && (
                    <div className="mt-2 bg-white p-4 border rounded-lg shadow-md">
                      <h2 className="font-medium text-lg mb-2">Forward to Departments:</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {departments.map((dept) => (
                          <div key={dept} className="flex items-center">
                            <input type="checkbox" id={dept} className="mr-2" />
                            <label htmlFor={dept}>{dept}</label>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => handleForwardClick(complaint.department, complaint)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                        >
                          Forward
                        </button>
                        <button
                          onClick={() => setShowForwardDepartments(null)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Forwarded complaints table */}
      <div className="mt-10">
        <h2 className="font-medium text-xl text-blue-900 mb-4">Forwarded Complaints</h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto min-w-full text-left bg-white">
            <thead className="bg-gradient-to-r from-green-700 to-green-900 text-white">
              <tr className="h-16">
                <th className="px-4 py-2 text-center">F-id</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Subject</th>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Location</th>
                <th className="px-4 py-2 text-center">Department</th>
              </tr>
            </thead>
            <tbody>
              {forwardedComplaints.map((complaint) => (
                <tr key={complaint.id} className="border-b hover:bg-gray-100 transition-all duration-150">
                  <td className="px-4 py-2 text-center">{complaint.id}</td>
                  <td className="px-4 py-2 text-center">{complaint.name}</td>
                  <td className="px-4 py-2 text-center">{complaint.subject}</td>
                  <td className="px-4 py-2 text-center">{complaint.date}</td>
                  <td className="px-4 py-2 text-center">{complaint.location}</td>
                  <td className="px-4 py-2 text-center">{complaint.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup notification */}
      {showPopup && (
        <div className="fixed top-16 right-16 bg-green-100 border border-green-600 text-green-600 p-4 rounded-lg shadow-lg">
          Complaint successfully forwarded to {forwardedTo} department!
        </div>
      )}
    </div>
  );
};

export default Complaints;
