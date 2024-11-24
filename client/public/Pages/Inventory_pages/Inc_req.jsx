import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; 

const Inc_req = () => {
  // Sample data 
  const [requests, setRequests] = useState([
    { id: 1, name: "Excavator", department: "Public Works Department", category: "Machinery", status: "Pending", location: "Mumbai, Maharashtra", nextAvailable: "2024-09-20" },
    { id: 2, name: "Bulldozer", department: "Construction", category: "Machinery", status: "Approved", location: "Delhi", nextAvailable: "2024-09-25" },
    { id: 3, name: "Concrete Mixer", department: "Public Works Department", category: "Machinery", status: "In Use", location: "Bengaluru, Karnataka", nextAvailable: "2024-09-18" },
    { id: 4, name: "Crane", department: "Construction", category: "Machinery", status: "In Maintenance", location: "Chennai, Tamil Nadu", nextAvailable: "2024-10-01" },
    { id: 5, name: "Road Roller", department: "Public Works Department", category: "Machinery", status: "Pending", location: "Hyderabad, Telangana", nextAvailable: "2024-09-22" },
    { id: 6, name: "Dump Truck", department: "Sanitation Department", category: "Vehicles", status: "Approved", location: "Kolkata, West Bengal", nextAvailable: "2024-09-30" },
    { id: 7, name: "Backhoe Loader", department: "Public Works Department", category: "Machinery", status: "In Use", location: "Ahmedabad, Gujarat", nextAvailable: "2024-09-21" },
    { id: 8, name: "Excavator", department: "Emergency Services", category: "Machinery", status: "In Maintenance", location: "Pune, Maharashtra", nextAvailable: "2024-09-26" },
    { id: 9, name: "Bulldozer", department: "Urban Planning", category: "Machinery", status: "Pending", location: "Jaipur, Rajasthan", nextAvailable: "2024-09-27" },
    { id: 10, name: "Concrete Mixer", department: "Construction", category: "Equipment", status: "Approved", location: "Chandigarh", nextAvailable: "2024-09-29" },
    { id: 11, name: "Excavator", department: "Public Works Department", category: "Machinery", status: "Pending", location: "Indore, Madhya Pradesh", nextAvailable: "2024-09-23" },
    { id: 12, name: "Bulldozer", department: "Sanitation Department", category: "Vehicles", status: "In Use", location: "Nagpur, Maharashtra", nextAvailable: "2024-09-24" },
    { id: 13, name: "Concrete Mixer", department: "Construction", category: "Equipment", status: "Approved", location: "Lucknow, Uttar Pradesh", nextAvailable: "2024-09-26" },
    { id: 14, name: "Crane", department: "Public Works Department", category: "Machinery", status: "In Maintenance", location: "Visakhapatnam, Andhra Pradesh", nextAvailable: "2024-10-02" },
    { id: 15, name: "Road Roller", department: "Construction", category: "Machinery", status: "Pending", location: "Kanpur, Uttar Pradesh", nextAvailable: "2024-09-29" },
    { id: 16, name: "Dump Truck", department: "Sanitation Department", category: "Vehicles", status: "Approved", location: "Bhopal, Madhya Pradesh", nextAvailable: "2024-09-28" },
    { id: 17, name: "Backhoe Loader", department: "Emergency Services", category: "Machinery", status: "In Use", location: "Coimbatore, Tamil Nadu", nextAvailable: "2024-09-20" },
    { id: 18, name: "Excavator", department: "Public Works Department", category: "Machinery", status: "In Maintenance", location: "Vadodara, Gujarat", nextAvailable: "2024-10-01" },
    { id: 19, name: "Bulldozer", department: "Construction", category: "Machinery", status: "Pending", location: "Ranchi, Jharkhand", nextAvailable: "2024-09-26" },
    { id: 20, name: "Concrete Mixer", department: "Urban Planning", category: "Equipment", status: "Approved", location: "Pondicherry", nextAvailable: "2024-09-30" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [declineMessage, setDeclineMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleApprove = (id) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleDecline = (id) => {
    setSelectedRequestId(id);
    setDeclineModal(true);
  };

  const handleSubmitDecline = () => {
    setRequests(requests.map(request =>
      request.id === selectedRequestId ? { ...request, status: 'Declined', declineReason, declineMessage } : request
    ));
    setDeclineModal(false);
    setDeclineReason('');
    setDeclineMessage('');
  };

  const filteredRequests = requests.filter(request =>
    (request.name.toLowerCase().includes(searchTerm.toLowerCase()) || request.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || request.category === selectedCategory)
  );

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Incoming Requests</h1>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search by resource name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-500" />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Categories</option>
          <option value="Machinery">Machinery</option>
          <option value="Equipment">Equipment</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Tools">Tools</option>
          <option value="Supplies">Supplies</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <tr className="h-16">
              <th className="px-4 py-2 text-center">Resource Name</th>
              <th className="px-4 py-2 text-center">Department</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Location</th>
              <th className="px-4 py-2 text-center">Next Available</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id} className="border-b text-center">
                <td className="px-4 py-2">{request.name}</td>
                <td className="px-4 py-2">{request.department}</td>
                <td className="px-4 py-2">{request.category}</td>
                <td className={`px-4 py-2 ${getStatusClass(request.status)}`}>{request.status}</td>
                <td className="px-4 py-2">{request.location}</td>
                <td className="px-4 py-2">{request.nextAvailable}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {request.status === 'Pending' && (
                    <>
                      <button
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200"
                        onClick={() => handleDecline(request.id)}
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {request.status !== 'Pending' && (request.status === 'In Use' || request.status === 'In Maintenance') && (
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => handleDecline(request.id)}
                    >
                      Decline
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Modal */}
      {declineModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Decline Request</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="declineReason">Reason for Decline</label>
              <select
                id="declineReason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select a reason</option>
                <option value="In Maintenance">In Maintenance</option>
                <option value="In Use">In Use</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="declineMessage">Additional Message</label>
              <textarea
                id="declineMessage"
                value={declineMessage}
                onChange={(e) => setDeclineMessage(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter additional details here..."
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200 mr-2"
                onClick={handleSubmitDecline}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 transition duration-200"
                onClick={() => setDeclineModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Available':
      return 'text-green-500';
    case 'In Use':
      return 'text-yellow-500';
    case 'In Maintenance':
      return 'text-red-500';
    case 'Approved':
      return 'text-green-500 font-bold';
    case 'Pending':
      return 'text-gray-500';
    case 'Declined':
      return 'text-red-600 font-bold';
    default:
      return 'text-gray-500';
  }
};

export default Inc_req;
