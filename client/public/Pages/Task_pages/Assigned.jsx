import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Assigned = () => {
  const [requests, setRequests] = useState([
    { 
      id: 'T-12345', 
      name: "Tender Approval", 
      date: "2024-11-27", 
      reqby: "Prasad Mahankal", 
      category: "Permission", 
      status: "Assigned", 
      action: "None",
      description: "Tender approval required for new office supplies procurement",
      priority: "High",
      completionDate: "2024-11-26 15:30",
      documents: [
        { name: "tender_doc.pdf", type: "PDF" },
        { name: "cost_analysis.xlsx", type: "Excel" }
      ],
      additionalNotes: "All required documentation has been verified and cost analysis completed.",
      declineReason: '',
      declineMessage: ''
    },
    { 
      id: 'T-12346', 
      name: "Budget Allocation", 
      date: "2024-12-01", 
      reqby: "Pranav Patil", 
      category: "Budget", 
      status: "Pending", 
      action: "Approve",
      description: "Annual budget allocation for IT department infrastructure upgrades",
      priority: "High",
      completionDate: "2024-11-30 14:45",
      documents: [
        { name: "budget_proposal.pdf", type: "PDF" },
        { name: "financial_forecast.xlsx", type: "Excel" }
      ],
      additionalNotes: "Budget proposal includes detailed breakdown of infrastructure needs and ROI analysis.",
      declineReason: '',
      declineMessage: ''
    },
    { 
      id: 'T-12347', 
      name: "Data Sharing Agreement", 
      date: "2024-12-03", 
      reqby: "Siddhesh Patil", 
      category: "Data sharing", 
      status: "Assigned", 
      action: "None",
      description: "Data sharing agreement with external vendor for cloud services",
      priority: "Medium",
      completionDate: "2024-12-02 11:20",
      documents: [
        { name: "agreement_draft.pdf", type: "PDF" }
      ],
      additionalNotes: "Awaiting additional documentation from vendor",
      declineReason: '',
      declineMessage: ''
    },
    { 
      id: 'T-12348', 
      name: "Infrastructure Development", 
      date: "2024-12-05", 
      reqby: "Payal Pawar", 
      category: "General", 
      status: "Pending", 
      action: "Approve",
      description: "Server room expansion and network infrastructure upgrade",
      priority: "Critical",
      completionDate: "2024-12-04 16:15",
      documents: [
        { name: "infrastructure_plan.pdf", type: "PDF" }
      ],
      additionalNotes: "Project timeline and resource allocation has been finalized.",
      declineReason: '',
      declineMessage: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [declineMessage, setDeclineMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const handleFinalApprove = () => {
    setRequests(requests.map(request =>
      request.id === selectedRequest.id ? { ...request, status: 'Approved', action: 'None' } : request
    ));
    setShowApprovalModal(false);
    setSelectedRequest(null);
  };

  const handleDecline = (id) => {
    setSelectedRequestId(id);
    setDeclineModal(true);
  };

  const handleSubmitDecline = () => {
    setRequests(requests.map(request =>
      request.id === selectedRequestId 
        ? { 
            ...request, 
            status: 'Declined', 
            action: 'None',
            declineReason,
            declineMessage 
          } 
        : request
    ));
    setDeclineModal(false);
    setDeclineReason('');
    setDeclineMessage('');
    setSelectedRequestId(null);
  };

  const filteredRequests = requests.filter(request =>
    (request.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || request.category === selectedCategory)
  );

  const renderActionButtons = (request) => {
    if (request.action === 'Approve') {
      return (
        <>
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => handleApproveClick(request)}
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
      );
    } else if (request.status === 'Declined') {
      return (
        <div className="text-sm text-red-600">
          <div><strong>Reason:</strong> {request.declineReason}</div>
          {request.declineMessage && (
            <div className="mt-1"><strong>Message:</strong> {request.declineMessage}</div>
          )}
        </div>
      );
    } else {
      return (
        <span className="text-gray-500 italic">
          {getStatusMessage(request.status)}
        </span>
      );
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Assigned':
        return 'Not yet completed';
      case 'Approved':
        return 'Request approved';
      default:
        return 'No action required';
    }
  };

  const TaskDetailsModal = ({ request, onClose, onApprove }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Task Details</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Task ID:</span> {request.id}
              </div>
              <div>
                <span className="font-medium">Title:</span> {request.name}
              </div>
              <div>
                <span className="font-medium">Category:</span> {request.category}
              </div>
              <div>
                <span className="font-medium">Priority:</span> {request.priority}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Completion Details</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Requested By:</span> {request.reqby}
              </div>
              <div>
                <span className="font-medium">Completion Date:</span> {request.completionDate}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Task Description</h3>
          <p className="text-gray-700">{request.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Attached Documents</h3>
          <div className="grid grid-cols-2 gap-4">
            {request.documents.map((doc, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
          <p className="text-gray-700">{request.additionalNotes}</p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={onApprove}
          >
            Approve
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Incoming Requests</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search by task name..."
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
          <option value="General">General</option>
          <option value="Permission">Permission</option>
          <option value="Budget">Budget</option>
          <option value="Data sharing">Data sharing</option>
          <option value="Documentation">Documentation</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead>
            <tr>
              <th className="px-2 py-3">ID</th>
              <th className="px-2 py-3">Task Name</th>
              <th className="px-2 py-3">Date</th>
              <th className="px-2 py-3">Requested By</th>
              <th className="px-2 py-3">Category</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-2 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id} className="border-b text-center">
                <td className="px-4 py-2">{request.id}</td>
                <td className="px-4 py-2">{request.name}</td>
                <td className="px-4 py-2">{request.date}</td>
                <td className="px-4 py-2">{request.reqby}</td>
                <td className="px-4 py-2">{request.category}</td>
                <td className={`px-4 py-2 ${getStatusClass(request.status)}`}>{request.status}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col items-center gap-2">
                    {renderActionButtons(request)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showApprovalModal && selectedRequest && (
        <TaskDetailsModal
          request={selectedRequest}
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedRequest(null);
          }}
          onApprove={handleFinalApprove}
        />
      )}

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
                <option value="Improper Docs">Improper Docs</option>
                <option value="Incorrect info">Incorrect information</option>
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

export default Assigned;