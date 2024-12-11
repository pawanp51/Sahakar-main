import React, { useState } from 'react';
import axios from 'axios';

const GISreq = () => {
  const [yourDepartment, setYourDepartment] = useState('');
  const [requestDepartment, setRequestDepartment] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [address, setAddress] = useState('');
  const [departments, setDepartments] = useState([
    'Electricity Department',
    'Gas Supply Department',
    'Civil Department',
    'Public Works Department',
    'Construction',
    'Sanitation Department',
    'Emergency Services',
    'Urban Planning',
  ]);

  const handleAddDepartment = () => {
    if (newDepartment.trim() && !departments.includes(newDepartment)) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName,
      email,
      yourDepartment,
      requestDepartment,
      purpose,
      address
    };

    try {
      const response = await axios.post('http://localhost:3000/api/gisrequest', formData);
      console.log('Response:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Request GIS for Interdepartmental Use</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter your Full Name"
            required
          />
        </div>  

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="yourDepartment">Your Department</label>
          <select
            id="yourDepartment"
            value={yourDepartment}
            onChange={(e) => setYourDepartment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Your Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
            <option value="add-new-department">Add New Department</option>
          </select>
          {yourDepartment === 'add-new-department' && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Add new department"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <button
                type="button"
                onClick={handleAddDepartment}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Add Department
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Your Email ID</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter your Email ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="requestDepartment">Department to Request</label>
          <select
            id="requestDepartment"
            value={requestDepartment}
            onChange={(e) => setRequestDepartment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Department for GIS request</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
            <option value="add-new-department">Add New Department</option>
          </select>
        </div>

        <div>
          <label htmlFor="purpose" className="block text-gray-700 mb-2">State Your Purpose</label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
            placeholder="Describe the reason and objective behind the request"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="purpose" className="block text-gray-700 mb-2">Enter address for request</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
            placeholder="Enter the address for the GIS in detail"
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GISreq;
