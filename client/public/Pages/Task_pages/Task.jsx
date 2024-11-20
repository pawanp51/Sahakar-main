import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Task = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1); // Manage the current step

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleCancel = () => {
    navigate('/TaskManager');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle file upload or text submission
    console.log('Submitted Information:', event.target.information.value);
    console.log('Uploaded File:', file);
    // Instead of navigating away, set step to 3 to show success message
    setStep(3);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-2xl rounded-lg my-10 border-t-4 border-blue-800">
      {/* Header */}
      <div className="flex flex-col justify-center items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-900 text-center">My Tasks</h1>
      </div>

      {/* Step 1: Task Details */}
      {step === 1 && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Task Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h3 className="text-md font-semibold text-blue-700">TITLE</h3>
                <p className="mt-2 text-gray-900">Permission for Inspection</p>
              </div>

              {/* Description */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md sm:col-span-2 border-l-4 border-green-600">
                <h3 className="text-md font-semibold text-green-700">DESCRIPTION</h3>
                <p className="mt-2 text-gray-900">
                  Please grant permission for road inspection at Aram Nagar. Also, attach a GIS of the area to avoid infrastructural conflicts.
                </p>
              </div>

              {/* Date */}
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
                <h3 className="text-md font-semibold text-yellow-700">DATE</h3>
                <p className="mt-2 text-gray-900">17/09/2024</p>
              </div>

              {/* Deadline */}
              <div className="bg-red-50 p-6 rounded-lg shadow-md border-l-4 border-red-600">
                <h3 className="text-md font-semibold text-red-700">DEADLINE</h3>
                <p className="mt-2 text-gray-900">24/09/2024</p>
              </div>

              {/* Time */}
              <div className="bg-purple-50 p-6 rounded-lg shadow-md border-l-4 border-purple-600">
                <h3 className="text-md font-semibold text-purple-700">TIME</h3>
                <p className="mt-2 text-gray-900">15:40</p>
              </div>

              {/* Assigned By */}
              <div className="bg-pink-50 p-6 rounded-lg shadow-md sm:col-span-2 border-l-4 border-pink-600">
                <h3 className="text-md font-semibold text-pink-700">ASSIGNED BY</h3>
                <p className="mt-2 text-gray-900">Prasad Mahankal - Head Water Department</p>
              </div>

              {/* Priority */}
              <div className="bg-teal-50 p-6 rounded-lg shadow-md border-l-4 border-teal-600">
                <h3 className="text-md font-semibold text-teal-700">PRIORITY</h3>
                <p className="mt-2 text-gray-900">Medium</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Task Submission */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submit Task Information</h2>
          <div className="space-y-8">
            {/* Input Information */}
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2"></label>
              <textarea
                name="information"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-blue-800 focus:border-blue-800 shadow-inner"
                placeholder="Enter additional information here..."
                required
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="p-6 border border-dashed border-gray-400 rounded-lg bg-white shadow-sm flex flex-col items-center">
              <label className="block text-md font-medium text-gray-700 mb-3">UPLOAD DOCUMENTS</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-800 focus:border-blue-800"
                accept=".pdf, .doc, .docx, .ppt, .xls, .xlsx, .jpg, .jpeg, .png, .gif, .mp4, .avi, .mov, .mkv"
                required
              />
              <p className="text-sm text-gray-500 mt-3">
                All formats supported: PDF, Word, PPT, Excel, Images, Videos, GIS, etc.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 text-sm text-red-600 hover:text-red-800 border border-red-600 rounded-lg transition-transform transform hover:scale-105 shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Submission Success */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Submission Successful!</h2>
          <p className="text-gray-700 mb-6">
            Your task information has been successfully submitted. Thank you!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/TaskManager')}
              className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 shadow-md"
            >
              Go to Task Manager
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
