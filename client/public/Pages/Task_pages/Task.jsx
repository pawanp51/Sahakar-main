import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Task = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);  // Change to handle multiple files

  const handleFileChange = (event) => {
    setFiles(event.target.files);  // Store files as an array
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle file upload or text submission

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);  // Append files under the 'files' field name
    });
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully');
      console.log(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } 
    // console.log(Files);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TITLE</label>
            <input
              type="text"
              value="Permission for inspection"
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">DESCRIPTION</label>
            <textarea
              value="Please grant permission for road inspection at Aram Nagar. Also, attach a GIS of the area to avoid infrastructural conflicts."
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
              readOnly
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
              <input
                type="text"
                value="17/09/2024"
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">TIME</label>
              <input
                type="text"
                value="15:40"
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ASSIGNED BY</label>
            <textarea
              value="Prasad Mahankal - Head Water Department"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PRIORITY</label>
            <input
              type="text"
              value="Medium"
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          <div className="col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">INPUT</label>
  <textarea
    className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
    placeholder="Enter Information"
  />
</div>
        </div>

        {/* File Upload Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-1">UPLOAD DOCUMENTS</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            accept=".pdf, .doc, .docx, .ppt, .xls, .xlsx, .jpg, .jpeg, .png, .gif, .mp4, .avi, .mov, .mkv"
          />
          <p className="text-sm text-gray-500 mt-2">All formats supported: PDF, Word, PPT, Excel, Images, Videos, GIS, etc.</p>
        </div>

        <div className="mt-6 flex justify-between">
          <button type="button" className="px-4 py-2 text-sm text-red-600 hover:text-red-800" onClick={() => navigate('/TaskManager')}>
            Cancel
          </button>
          <div className="space-x-4"> 
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700" >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Task;
