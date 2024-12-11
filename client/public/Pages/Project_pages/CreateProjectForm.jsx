import React, { useState } from 'react';
import { Upload, X, Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usegeotagContext } from '../../ContextApi/geotagcontext';

const CreateProjectForm = () => {
  const {setprojdata} = usegeotagContext();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectType: '',
    startDate: '',
    estimatedEndDate: '',
    description: '',
    objectives: '',
    scope: '',
    leadDepartment: '',
    otherDepartments: '',
    keyStakeholders: '',
    estimatedBudget: '',
    fundingSource: '',
    manpower: '',
    keyEquipment: '',
    latitude: '',
    longitude: '',
    milestones: '',
    risks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:3000/api/projectcreation', formData);
    //   console.log(response.data);
    //   alert('Project created successfully!');
    // } catch (error) {
    //   if (error.response && error.response.data && error.response.data.message) {
    //     alert(error.response.data.message);
    //   } else {
    //     console.error('Error creating project:', error);
    //     alert('Failed to create project');
    //   }
    // }

    setprojdata(formData);
    navigate('/markGeotag');

  };

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border-blue-900 border-2 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Project Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Basic Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
              <input onChange={handleChange} value={formData.projectTitle} type="text" id="projectTitle" name="projectTitle" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
              <select onChange={handleChange} value={formData.projectType} id="projectType" name="projectType" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Bridge Construction</option>
                <option>Water Pipeline Installation</option>
                <option>Road Development</option>
                <option>Other Infrastructure</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input onChange={handleChange} value={formData.startDate} type="date" id="startDate" name="startDate" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="estimatedEndDate" className="block text-sm font-medium text-gray-700">Estimated End Date</label>
              <input onChange={handleChange} value={formData.estimatedEndDate} type="date" id="estimatedEndDate" name="estimatedEndDate" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section>
          <h2 className="text-xl font-semibold mb-4">2. Project Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Project Description</label>
              <textarea onChange={handleChange} value={formData.description} id="description" name="description" rows="3" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ></textarea>
            </div>
            <div>
              <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Project Objectives</label>
              <textarea onChange={handleChange} value={formData.objectives} id="objectives" name="objectives" rows="3" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ></textarea>
            </div>
            <div>
              <label htmlFor="scope" className="block text-sm font-medium text-gray-700">Project Scope</label>
              <textarea onChange={handleChange} value={formData.scope} id="scope" name="scope" rows="3" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ></textarea>
            </div>
          </div>
        </section>

        {/* Departments and Stakeholders */}
        <section>
          <h2 className="text-xl font-semibold mb-4">3. Departments and Stakeholders</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="leadDepartment" className="block text-sm font-medium text-gray-700">Lead Department</label>
              <input onChange={handleChange} value={formData.leadDepartment} type="text" id="leadDepartment" name="leadDepartment" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="otherDepartments" className="block text-sm font-medium text-gray-700">Other Involved Departments</label>
              <input onChange={handleChange} value={formData.otherDepartments} type="text" id="otherDepartments" name="otherDepartments" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Separate departments with commas" />
            </div>
            <div>
              <label htmlFor="keyStakeholders" className="block text-sm font-medium text-gray-700">Key Stakeholders</label>
              <input onChange={handleChange} value={formData.keyStakeholders} type="text" id="keyStakeholders" name="keyStakeholders" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Separate stakeholders with commas" />
            </div>
          </div>
        </section>

        {/* Budget and Resources */}
        <section>
          <h2 className="text-xl font-semibold mb-4">4. Budget and Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="estimatedBudget" className="block text-sm font-medium text-gray-700">Estimated Budget (in INR)</label>
              <input onChange={handleChange} value={formData.estimatedBudget} type="number" id="estimatedBudget" name="estimatedBudget" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="fundingSource" className="block text-sm font-medium text-gray-700">Funding Source</label>
              <input onChange={handleChange} value={formData.fundingSource} type="text" id="fundingSource" name="fundingSource" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="manpower" className="block text-sm font-medium text-gray-700">Estimated Manpower </label>
              <input onChange={handleChange} value={formData.manpower} type="number" id="manpower" name="manpower" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="keyEquipment" className="block text-sm font-medium text-gray-700">Key Equipment/Resources</label>
              <input onChange={handleChange} value={formData.keyEquipment} type="text" id="keyEquipment" name="keyEquipment" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Separate items with commas" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Project Coordinates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="estimatedBudget" className="block text-sm font-medium text-gray-700">Latitude</label>
              <input onChange={handleChange} value={formData.latitude} placeholder='41.40338' type="text" id="latitude" name="latitude" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
            <div>
              <label htmlFor="fundingSource" className="block text-sm font-medium text-gray-700">Longitude</label>
              <input onChange={handleChange} value={formData.longitude} placeholder='2.17403' type="text" id="longitude" name="longitude" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  />
            </div>
          </div>
        </section>

        {/* Milestones and Timeline */}
        <section>
          <h2 className="text-xl font-semibold mb-4">6. Milestones and Timeline</h2>
          <div>
            <label htmlFor="milestones" className="block text-sm font-medium text-gray-700">Key Milestones</label>
            <textarea onChange={handleChange} value={formData.milestones} id="milestones" name="milestones" rows="4" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter each milestone on a new line with its expected completion date" ></textarea>
          </div>
        </section>

        {/* Risks and Challenges */}
        <section>
          <h2 className="text-xl font-semibold mb-4">7. Risks and Challenges</h2>
          <div>
            <label htmlFor="risks" className="block text-sm font-medium text-gray-700">Potential Risks and Mitigation Strategies</label>
            <textarea onChange={handleChange} value={formData.risks} id="risks" name="risks" rows="4" className="mt-1 block w-full rounded-md border-2 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Describe potential risks and their mitigation strategies" ></textarea>
          </div>
        </section>

        {/* File Upload */}
        <section>
          <h2 className="text-xl font-semibold mb-4">8. Upload Documents</h2>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF up to 10MB each</p>
            </div>
          </div>
          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            next step
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;