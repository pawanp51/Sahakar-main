import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Task = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);

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
    console.log('Submitted Information:', event.target.information.value);
    console.log('Uploaded File:', file);
    setStep(3);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md my-10 border border-gray-300">
      <header className="mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-blue-900">My Tasks</h1>
        </div>
        <hr className="mt-4 border-gray-400" />
      </header>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Task Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <p>
            <span className="font-semibold">Assigned By:</span> Prasad Mahankal - Head Water Department
          </p>
          <p>
            <span className="font-semibold">Department:</span> Water Department
          </p>
          <p>
            <span className="font-semibold">Date:</span> 17/09/2024
          </p>
          <p>
            <span className="font-semibold">Time:</span> 15:40
          </p>
          <p>
            <span className="font-semibold">Position:</span> Manager
          </p>
          <p>
            <span className="font-semibold">Deadline:</span> <strong>20/09/2024 17:00</strong>
          </p>
        </div>
      </div>

      {step === 1 && (
        <div className="mb-8">
          <div className="border border-gray-300 rounded-md p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Task Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">Title</h4>
                <p className="mt-1 text-gray-800">
                  <strong>Permission for Inspection</strong>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">Description</h4>
                <p className="mt-1 text-gray-800">
                  Please grant permission for road inspection at Aram Nagar. Also, attach a GIS of the area to avoid infrastructural conflicts.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">Priority</h4>
                <p className="mt-1 text-gray-800">
                  <strong>Medium</strong>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">Files Attached by Manager</h4>
                <ul className="mt-2 text-gray-800 list-disc list-inside">
                  <li>
                    <a href="#" className="text-blue-700 hover:underline font-medium">
                      Road_Map_Aram_Nagar.pdf
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-700 hover:underline font-medium">
                      Inspection_Guidelines.docx
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">Additional Notes</h4>
                <p className="mt-1 text-gray-800">
                  Ensure to coordinate with the local authorities before the inspection.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">References</h4>
                <p className="mt-1 text-gray-800">
                  Refer to the previous inspection reports for Aram Nagar dated 01/05/2024.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="border border-gray-300 rounded-md p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Submit Your Response</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="information"
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Enter your notes here..."
                  required
                ></textarea>
              </div>

              <div className="border border-dashed border-gray-400 rounded-md p-6 bg-white">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Upload Documents
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                  required
                />
                <p className="text-sm text-gray-600 mt-2">
                  Supported formats: PDF, Word, Images.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 border border-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="text-center p-8 bg-gray-50 border border-gray-300 rounded-md">
          <h3 className="text-2xl font-bold text-green-700 mb-4">Submission Successful!</h3>
          <p className="text-gray-800 mb-6">
            Your response has been submitted successfully.
          </p>
          <button
            onClick={() => navigate('/TaskManager')}
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
          >
            Back to Task Manager
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
