import React, { useState ,useMemo} from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLoginContext } from '../../ContextApi/Logincontext';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../ContextApi/TaskContext';
const Approval = ({tasks}) => {
  const {setselected_approve_task} = useTaskContext();
  const navigate = useNavigate();
  const {user} = useLoginContext();
  const [requests, setRequests] = useState([]);

  useMemo(()=>{
    setRequests(tasks.filter((task)=>{return (task.manager_email===user.Email && task.status === 'completed')}));
  },[tasks])
  // const req = tasks.filter((task)=>{return task.manager_email===user.Email});
  // setRequests(req);
  


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [declineMessage, setDeclineMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApproveClick = (request) => {

    console.log("selected req",request);
    
    setselected_approve_task(request);
    navigate("/Approve")
  };

  const handleFinalApprove = () => {
    setRequests(requests.map(request =>
      request.id === selectedRequest.id ? { ...request, status: 'Approved' } : request
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


  const renderDeclineDetails = (request) => {
    if (request.status === 'Declined') {
      return (
        <div className="text-sm text-red-600">
          <div><strong>Reason:</strong> {request.declineReason}</div>
          {request.declineMessage && (
            <div className="mt-1"><strong>Message:</strong> {request.declineMessage}</div>
          )}
        </div>
      );
    }
    return null;
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
                <span className="font-medium">Task ID:</span> {request._id}
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

      {/* Search and Filter */}
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

      {/* Table */}
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
            {requests.map(request => (
              <tr key={request.id} className="border-b text-center">
                <td className="px-4 py-2">{request._id}</td>
                <td className="px-4 py-2">{request.task_name}</td>
                <td className="px-4 py-2">{request.date}</td>
                <td className="px-4 py-2">{request.employee_email}</td>
                <td className="px-4 py-2">{request.department}</td>
                <td className={`px-4 py-2 ${getStatusClass(request.status)}`}>{request.status}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col items-center gap-2">
                    {request.status === 'completed' ? (
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
                    ) : (
                      renderDeclineDetails(request)
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Details Modal */}
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

export default Approval;