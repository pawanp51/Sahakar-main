import React, { useState, useEffect } from "react";
import axios from "axios";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const department = "Electricity";

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/complaints/${department}`
        );
        setComplaints(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div>Loading complaints...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (complaints.length === 0) {
    return <div>No complaints found for the {department} department.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Complaints for {department} Department</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr
                key={complaint._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(complaint.date).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.location || "Not specified"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaints;
