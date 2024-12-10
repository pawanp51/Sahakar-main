
import React, { useMemo,useState } from 'react';
import { useTaskContext } from '../../ContextApi/TaskContext';

const Approve = () => {

  const {selected_approve_task} = useTaskContext();
  const [fetchfiles,setfetchfiles]= useState([]);

  useMemo(() => {
    
    const fetchFiles = async () => {
        try {
            const response = await fetch('http://localhost:3000/getfiles',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({task_id:selected_approve_task._id,to:"manager"}) // Replace with your task ID
            }); // Replace with your backend URL
            const data = await response.json();
            setfetchfiles(data);
            console.log("data is:",data);
            
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    fetchFiles();
}, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
    const response = fetch("http://localhost:3000/tasks/approvetask",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_id:selected_approve_task._id}) // Replace with your task ID
    })
    console.log(response);
    
  };



  if(!selected_approve_task){
    return <p>waiting</p>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Task Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold text-gray-900">Permission for Inspection</h1>
              <p className="text-sm text-gray-500 mt-1">Task ID:{selected_approve_task._id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assigned By</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.assigned_by}</p>
                <p className="text-sm text-gray-500">{selected_approve_task.post}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.date}</p>
                <p className="text-sm text-gray-500">{selected_approve_task.time}</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{selected_approve_task.priority}</p>
                <div className="h-1 w-1/4 bg-yellow-500 mt-2 rounded"></div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.deadline}</p>
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
                <p className="mt-1 text-gray-900">{selected_approve_task.description}</p>
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
                <p className="mt-1 text-gray-900">{selected_approve_task.additional_notes}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">References</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.references}</p>
              </div>
            </div>
          </div>

        

          {/* Task Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Completed Task Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.res_details}</p>
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

                    {fetchfiles ? (
                        <ul>
                        {fetchfiles.map(file => (
                            <li key={file.id}>




                              
                                <a href={`http://localhost:3000/getfiles/${file._id}`} target="_blank" rel="noopener noreferrer" >
                                    {file.originalName}
                                </a>{' '}
                                - {file.size} bytes
                            </li>
                        ))}
                    </ul>
                    ):(
                      <p>No files attached by manager</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.res_notes}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">References</h3>
                <p className="mt-1 text-gray-900">{selected_approve_task.references}</p>
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
