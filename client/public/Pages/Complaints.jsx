import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [forwardedComplaints, setForwardedComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('complaints');

  const departments = ['Road Transport', 'Water', 'Civil', 'Electrical', 'Mechanical'];

  const [complaints, setComplaints] = useState([
    { id: 'C1234', name: 'Raj Kumar Sharma', subject: 'Street Lights not working', date: '17/2/2024', location: 'Baner, Pune' },
    { id: 'C1235', name: 'Aarti Patel', subject: 'Dustbins are overflowing', date: '20/2/2024', location: 'Hadapsar, Pune' },
    { id: 'C1236', name: 'Vikas Jain', subject: 'Water supply interruptions', date: '22/2/2024', location: 'Kothrud, Pune' },
    { id: 'C1237', name: 'Nisha Verma', subject: 'Potholes on the road', date: '23/2/2024', location: 'Pune University, Pune' },
    { id: 'C1238', name: 'Manoj Kumar', subject: 'Leaking water pipes', date: '25/2/2024', location: 'Viman Nagar, Pune' },
    { id: 'C1239', name: 'Pooja Joshi', subject: 'Broken streetlights', date: '26/2/2024', location: 'Aundh, Pune' },
    { id: 'C1240', name: 'Anil Patil', subject: 'Damaged footpath', date: '28/2/2024', location: 'Koregaon Park, Pune' },
    { id: 'C1241', name: 'Rohit Bhatia', subject: 'Broken water tank', date: '1/3/2024', location: 'Bavdhan, Pune' },
    { id: 'C1242', name: 'Sunita Reddy', subject: 'Garbage piling up', date: '5/3/2024', location: 'Camp, Pune' },
    { id: 'C1243', name: 'Aditya Mehta', subject: 'Electrical wire exposed', date: '7/3/2024', location: 'Pashan, Pune' },
    { id: 'C1244', name: 'Priya Singh', subject: 'Uneven road surface', date: '9/3/2024', location: 'Dhole Patil Road, Pune' },
    { id: 'C1245', name: 'Suresh Yadav', subject: 'Broken drainage system', date: '10/3/2024', location: 'Hadapsar, Pune' },
    { id: 'C1246', name: 'Amit Sharma', subject: 'Water leakage in basement', date: '12/3/2024', location: 'Baner, Pune' },
    { id: 'C1247', name: 'Kavita Mishra', subject: 'Lack of bus stops', date: '14/3/2024', location: 'Magarpatta, Pune' },
    { id: 'C1248', name: 'Deepak Gupta', subject: 'Damaged road signs', date: '15/3/2024', location: 'Vishrantwadi, Pune' },
  ]);

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleForwardClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowForwardModal(true);
  };

  const handleForwardSubmit = (dept) => {
    if (selectedComplaint) {
      setForwardedComplaints([...forwardedComplaints, { ...selectedComplaint, forwardedTo: dept }]);
      setShowForwardModal(false);
    }
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Tabs Section */}
      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`p-2 w-full max-w-xs rounded-md text-sm md:text-base ${
            activeTab === 'complaints' ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          Complaints
        </button>
        <button
          onClick={() => setActiveTab('forwarded')}
          className={`p-2 w-full max-w-xs rounded-md text-sm md:text-base ${
            activeTab === 'forwarded' ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          Forwarded Complaints
        </button>
      </div>

      {/* Complaints Section */}
      {activeTab === 'complaints' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md p-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoSearchSharp size={24} className="cursor-pointer text-blue-700 hover:text-blue-600" />
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="table-auto w-full text-sm md:text-base">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-2 py-2 text-center">C-id</th>
                  <th className="px-2 py-2 text-center">Name</th>
                  <th className="px-2 py-2 text-center">Subject</th>
                  <th className="px-2 py-2 text-center">Date</th>
                  <th className="px-2 py-2 text-center">Location</th>
                  <th className="px-2 py-2 text-center">Forward</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b hover:bg-gray-100">
                    <td className="px-2 py-2 text-center">{complaint.id}</td>
                    <td className="px-2 py-2 text-center">{complaint.name}</td>
                    <td className="px-2 py-2 text-center">{complaint.subject}</td>
                    <td className="px-2 py-2 text-center">{complaint.date}</td>
                    <td className="px-2 py-2 text-center">{complaint.location}</td>
                    <td className="px-2 py-2 text-center">
                      <button
                        onClick={() => handleForwardClick(complaint)}
                        className="border rounded-md p-2 bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        Forward
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Forwarded Complaints Section */}
      {activeTab === 'forwarded' && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full text-sm md:text-base">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-2 py-2 text-center">F-id</th>
                <th className="px-2 py-2 text-center">Name</th>
                <th className="px-2 py-2 text-center">Subject</th>
                <th className="px-2 py-2 text-center">Date</th>
                <th className="px-2 py-2 text-center">Location</th>
                <th className="px-2 py-2 text-center">Forwarded To</th>
              </tr>
            </thead>
            <tbody>
              {forwardedComplaints.map((complaint) => (
                <tr key={complaint.id} className="border-b hover:bg-gray-100">
                  <td className="px-2 py-2 text-center">{complaint.id}</td>
                  <td className="px-2 py-2 text-center">{complaint.name}</td>
                  <td className="px-2 py-2 text-center">{complaint.subject}</td>
                  <td className="px-2 py-2 text-center">{complaint.date}</td>
                  <td className="px-2 py-2 text-center">{complaint.location}</td>
                  <td className="px-2 py-2 text-center">{complaint.forwardedTo}</td>
                </tr>
              ))}
            </tbody>  
          </table>
        </div>
      )}

      {/* Forward Modal */}
      {showForwardModal && selectedComplaint && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Forward Complaint</h3>
            <div>
              <p><strong>Name:</strong> {selectedComplaint.name}</p>
              <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
              <p><strong>Date:</strong> {selectedComplaint.date}</p>
              <p><strong>Location:</strong> {selectedComplaint.location}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-base md:text-lg font-semibold mb-2">Forward to:</h4>
              <div className="flex flex-col gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleForwardSubmit(dept)}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                  >
                    {dept}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowForwardModal(false)}
                className="mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
