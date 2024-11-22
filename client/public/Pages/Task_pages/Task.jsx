import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <svg
              className="mx-auto h-16 w-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2l4 -4"
              />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">
              Response Submitted!
            </h2>
            <p className="mt-2 text-gray-600">
              Your response has been successfully recorded.
            </p>
            <button
              onClick={() => navigate("/TaskManager")}
              className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition duration-200"
            >
              Return to Task Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Task Header */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Task: Permission for Inspection
          </h1>
          <p className="text-sm text-gray-500">Task ID: #TK-2024-091</p>
          <hr className="my-6 border-blue-100" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Assigned By</h3>
              <p className="mt-2 text-gray-800 font-medium">Prasad Mahankal</p>
              <p className="text-sm text-gray-500">Head Water Department</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Date & Time</h3>
              <p className="mt-2 text-gray-800">17/09/2024</p>
              <p className="text-sm text-gray-500">15:40</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Priority</h3>
              <p className="mt-2 text-lg font-semibold text-yellow-600">Medium</p>
              <div className="h-2 w-16 bg-yellow-500 mt-2 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Deadline</h3>
              <p className="mt-2 text-gray-800 font-medium">24/09/2024</p>
              <p className="text-sm text-gray-500">7 days remaining</p>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Task Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Description</h3>
                <p className="mt-3 text-gray-800 leading-relaxed">
                  Please grant permission for road inspection at Aram Nagar.
                  Also, attach a GIS of the area to avoid infrastructural
                  conflicts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Files Attached</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-blue-700 hover:underline flex items-center"
                    >
                      <svg
                        className="h-6 w-6 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h10M7 11h10M7 15h4"
                        />
                      </svg>
                      Area_Map.pdf
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Additional Notes</h3>
                <p className="mt-3 text-gray-800 leading-relaxed">
                  Please ensure all safety protocols are followed during the inspection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">References</h3>
                <p className="mt-3 text-gray-800 leading-relaxed">
                  Previous inspection report (2023) - Document #INS-2023-45
                </p>
              </div>
            </div>
          </div>

          {/* Response Section */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Your Response</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Response Details
                </label>
                <textarea
                  name="information"
                  rows="5"
                  className="mt-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your detailed response..."
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Attach Files</label>
                <div className="mt-3">
                  <label className="flex items-center px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500">
                    <svg
                      className="h-10 w-10 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M14 30v6a2 2 0 002 2h16a2 2 0 002-2v-6m-6 0v-8a4 4 0 00-8 0v8m6 0h-6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="ml-4 text-gray-600">Upload files</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    Drag & drop or click to upload. Supported formats: PDF, DOCX, JPG.
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/TaskManager")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition"
                >
                  Submit Response
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Task;
