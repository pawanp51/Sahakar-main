import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateGIS from './CreateGIS';
import GISdirectory from './GISdirectory';

const GISRequestsManager = ({ department }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get('http://localhost:3000/api/gisrequest');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleGISdirectory = (request) => {
    // setSelectedRequest({
    //   id: request._id,
    //   // coordinates: [request.latitude, request.longitude],
    //   email: request.email,
    //   department: request.yourDepartment,
    // });
    setSelectedRequest(request)
  };

  const handleBackToRequests = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading GIS Requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  // if (selectedRequest) {
  //   return (
  //     <div className="p-6">
  //       <button
  //         onClick={handleBackToRequests}
  //         className="mb-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
  //       >
  //         Back to GIS Requests
  //       </button>
  //       <CreateGIS initialCenter={selectedRequest.coordinates} email={selectedRequest.email} department={selectedRequest.department} />
  //     </div>
  //   );
  // }

  if (selectedRequest) {
    return (
      <div className="p-6">
        <button
          onClick={handleBackToRequests}
          className="mb-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to GIS Requests
        </button>
        <GISdirectory email={selectedRequest.email} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        GIS Requests for {department}
      </h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">No GIS requests found for this department.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Full Name</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Department</th>
              <th className="border border-gray-300 p-2 text-left">Purpose</th>
              <th className="border border-gray-300 p-2 text-left">Created At</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{request.fullName}</td>
                <td className="border border-gray-300 p-2">{request.email}</td>
                <td className="border border-gray-300 p-2">{request.yourDepartment}</td>
                <td className="border border-gray-300 p-2">{request.purpose}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(request.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleGISdirectory(request)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Browse Project GIS Directory
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GISRequestsManager;
