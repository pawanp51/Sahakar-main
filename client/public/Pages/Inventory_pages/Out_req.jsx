import React, { useState } from 'react';
import axios from 'axios';
import { useLoginContext } from '../../ContextApi/Logincontext';

const Out_req = () => {
  const { user } = useLoginContext();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    request_email: '',
    date: '',
    department: '',
    inventory: '',
    status: 'pending',
    deadline: '',
    description: '',
    additionalNotes: '',
  });

  const departmentInventories = {
    Electricity: ['Transformers', 'Generators', 'Cables'],
    Gas: ['Pipelines', 'Meters', 'Valves'],
    Road: ['Concrete Mixers', 'Bulldozers', 'Signboards'],
    Oil: ['Tanks', 'Pumps', 'Refinery Tools'],
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]); // Spread the FileList into an array
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Submit the form data
      const { data } = await axios.post('http://localhost:3000/inventory/requestinventory', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Request created successfully');
      console.log('Request Response:', data);

      // Submit the files
      if (files.length > 0) {
        const fileData = new FormData();
        Array.from(files).forEach((file) => {
          fileData.append('files', file);
        });
        fileData.append('request_id', data.id); // Assuming `id` is returned from the form submission
        fileData.append('to', 'employee');

        const fileResponse = await axios.post('http://localhost:3000/upload', fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Files uploaded successfully');
        console.log('File Upload Response:', fileResponse.data);
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
      alert('Error creating request or uploading file');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg border-2 border-black">
      <h1 className="text-3xl font-bold text-center mb-6">Request for Interdepartmental Resources</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="request_email" className="block mb-1 font-medium">
            Request Email:
          </label>
          <input
            type="email"
            id="request_email"
            value={formData.request_email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="department" className="block mb-1 font-medium">
            Department:
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={(e) => {
              handleChange(e);
              setFormData((prevData) => ({
                ...prevData,
                inventory: '',
              }));
            }}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            {Object.keys(departmentInventories).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {formData.department && (
          <div>
            <label htmlFor="inventory" className="block mb-1 font-medium">
              Inventory:
            </label>
            <select
              id="inventory"
              value={formData.inventory}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Inventory</option>
              {departmentInventories[formData.department].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="status" className="block mb-1 font-medium">
            Status:
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="block mb-1 font-medium">
            Deadline:
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block mb-1 font-medium">
            Additional Notes:
          </label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="files" className="block mb-1 font-medium">
            Attach Files:
          </label>
          <input
            type="file"
            id="files"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-6"
        >
          Create Request
        </button>
      </form>
    </div>
  );
};

export default Out_req;
