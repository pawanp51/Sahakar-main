import React from 'react';

const Approve = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
    console.log('Form submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Task Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold text-gray-900">Permission for Inspection</h1>
              <p className="text-sm text-gray-500 mt-1">Task ID: #TK-2024-091</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assigned By</h3>
                <p className="mt-1 text-gray-900">Prasad Mahankal</p>
                <p className="text-sm text-gray-500">Head Water Department</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="mt-1 text-gray-900">17/09/2024</p>
                <p className="text-sm text-gray-500">15:40</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">Medium</p>
                <div className="h-1 w-1/4 bg-yellow-500 mt-2 rounded"></div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                <p className="mt-1 text-gray-900">24/09/2024</p>
                <p className="text-sm text-gray-500">7 days remaining</p>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Task Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">Please grant permission for road inspection at Aram Nagar. Also, attach a GIS of the area to avoid infrastructural conflicts.</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Files Attached by Manager</h3>
                <div className="mt-2 border rounded-lg divide-y">
                  <div className="p-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-900">Area_Map.pdf</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
                <p className="mt-1 text-gray-900">Please ensure all safety protocols are followed during the inspection.</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">References</h3>
                <p className="mt-1 text-gray-900">Previous inspection report (2023) - Document #INS-2023-45</p>
              </div>
            </div>
          </div>

          {/* Task Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold text-gray-900">Task Details</h1>
              <p className="text-sm text-gray-500 mt-1">Basic information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Requested By</h3>
                <p className="mt-1 text-gray-900">Pranav Patil</p>
                <p className="text-sm text-gray-500">Head Water Department</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 text-gray-900">Tender Approval</p>
                <p className="text-sm text-gray-500">Category: Permission</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">Medium</p>
                <div className="h-1 w-1/4 bg-yellow-500 mt-2 rounded"></div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="mt-1 text-gray-900">19/09/2024</p>
                <p className="text-sm text-gray-500">16:49</p>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Completed Task Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">Permission granted, letter attached.</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Files Attached by Employee</h3>
                <div className="mt-2 border rounded-lg divide-y">
                  <div className="p-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-900">Permission.pdf</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
                <p className="mt-1 text-gray-900">Please ensure all documents are as per the requirement</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">References</h3>
                <p className="mt-1 text-gray-900">Previous inspection report (2023) - Document #INS-2023-45</p>
              </div>
            </div>
          </div>

           {/* Submit Button */}
           <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none"
            >
              Approve Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Approve;
