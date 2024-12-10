import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTaskContext } from '../../ContextApi/TaskContext';


const Task = () => {
  const {selectedtask} = useTaskContext();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [fetchfiles,setfetchfiles]= useState([]);
  const [res_details,setres_details] = useState("");
  const [res_notes,setres_notes] = useState("");
  const [res_files,setres_files] = useState([]);
  const handleFileChange = (event) => {
    setres_files([...event.target.files]); // Spread the FileList into an array
  };

  const handleCancel = () => {
    navigate('/TaskManager');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle file upload or text submission

    const formData = new FormData();
    Array.from(res_files).forEach(file => {
      formData.append('files', file);  // Append files under the 'files' field name
    });
    formData.append("task_id", selectedtask._id);
    formData.append("to","manager");

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully');
      console.log(response);

      const res = await fetch('http://localhost:3000/tasks/completetask',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_id: selectedtask._id ,
                                res_details,
                                res_notes
         }),
      })


    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } 



    // console.log(Files);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Response Submitted Successfully</h2>
            <p className="mt-2 text-gray-500">Your response has been recorded and will be reviewed shortly.</p>
            <button
              onClick={() => navigate('/TaskManager')}
              className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Return to Task Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  

  useEffect(() => {
    
    const fetchFiles = async () => {
      console.log("yoo",selectedtask);
        try {
            const response = await fetch('http://localhost:3000/getfiles',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({task_id:selectedtask._id,to:"employee"}) // Replace with your task ID
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




  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Task Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-semibold text-gray-900">{selectedtask.task_name}</h1>
              <p className="text-sm text-gray-500 mt-1">Task ID: #TK-{selectedtask._id}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assigned By</h3>
                <p className="mt-1 text-gray-900">{selectedtask.assigned_by}</p>
                <p className="text-sm text-gray-500">{selectedtask.post}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="mt-1 text-gray-900">{selectedtask.date}</p>
                <p className="text-sm text-gray-500">{selectedtask.time}</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{selectedtask.priority}</p>
                <div className="h-1 w-1/4 bg-yellow-500 mt-2 rounded"></div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                <p className="mt-1 text-gray-900">{selectedtask.deadline}</p>
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
                <p className="mt-1 text-gray-900">{selectedtask.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Files Attached by Manager</h3>
                <div className="mt-2 border rounded-lg divide-y">
                  <div className="p-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {/* <span className="ml-2 text-sm text-gray-900">Area_Map.pdf</span> */}
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
                <p className="mt-1 text-gray-900">{selectedtask.additional_notes}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">References</h3>
                <p className="mt-1 text-gray-900">{selectedtask.references}</p>
              </div>
            </div>
          </div>

          {/* Response Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Your Response</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Response Details</label>
                <textarea
                  name="information"
                  rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter your detailed response..."
                  required
                  onChange={(e)=>{setres_details(e.target.value)}}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea
                  name="notes"
                  rows="2"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Any additional notes or comments..."
                  onChange={(e)=>{setres_notes(e.target.value)}}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Attach Files</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4 flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-gray-500">
                        <span>Upload files</span>
                        <input 
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                          multiple
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">All formats supported</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-gray-800 transition-colors"
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