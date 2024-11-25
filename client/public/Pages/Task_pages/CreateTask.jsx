import React, { useState } from 'react';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    email: '',
    taskName: '',
    date: '',
    assignedBy: '',
    department: '',
    status: '',
    post: '',
    time: '',
    priority: '',
    deadline: '',
    description: '',
    additionalNotes: '',
    references: '',
    files: null
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg border-2 border-black">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Task</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="taskName" className="block mb-1 font-medium">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={formData.taskName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium">Date:</label>
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
          <label htmlFor="assignedBy" className="block mb-1 font-medium">Assigned By:</label>
          <input
            type="text"
            id="assignedBy"
            value={formData.assignedBy}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="department" className="block mb-1 font-medium">Department:</label>
          <select
            id="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            <option value="Electricity">Electricity Department</option>
            <option value="Gas">Gas Department</option>
            <option value="Road">Road Department</option>
            <option value="Oil">Oil Department</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block mb-1 font-medium">Status:</label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="post" className="block mb-1 font-medium">Post:</label>
          <input
            type="text"
            id="post"
            value={formData.post}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-1 font-medium">Time:</label>
          <input
            type="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block mb-1 font-medium">Priority:</label>
          <select
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="block mb-1 font-medium">Deadline:</label>
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
          <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
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
          <label htmlFor="additionalNotes" className="block mb-1 font-medium">Additional Notes:</label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="references" className="block mb-1 font-medium">References:</label>
          <input
            type="text"
            id="references"
            value={formData.references}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="files" className="block mb-1 font-medium">Attach Files:</label>
          <input
            type="file"
            id="files"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-6"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;