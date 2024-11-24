import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScheduleMeeting() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [meetingLink, setMeetingLink] = useState(''); // State to hold the meeting link
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input

  // Function to generate a 4-digit random number
  const generateRoomID = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
  };

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    selectedMembers: [],
    selectedDepartments: [],
    agenda: '',
    location: 'virtual',
    recurrence: 'one-time',
    documents: null
  });

  // Updated employees list
  const employees = [
    "Ashish Patil", "Ashish Suryawanshi", "Payal Pawar", "Prasad Mahankal", "Pawan Patil",
    "Pranav Patil", "Siddhesh Patil", "Rohan Deshmukh", "Shruti Jadhav", "Vivek Kulkarni",
    "Neha Shinde", "Rohit Pawar", "Prachi Khot", "Akshay Gaikwad", "Tejas Joshi",
    "Swapnil Shinde", "Priya Naik", "Varun Kadam", "Snehal Patil", "Kunal Jagtap",
    "Supriya Patil", "Vaibhav Pawar", "Sakshi More", "Aditya Patil", "Nilesh Deshmukh",
    "Sanika Kulkarni", "Aniket Pawar", "Manish Patil", "Megha Jadhav", "Vishal Patil",
    "Pallavi Desai", "Rajesh Patil", "Anjali Gaikwad", "Nikhil Pawar", "Sonali Patil",
    "Tushar Deshmukh", "Ajay Patil", "Pooja Kadam", "Sagar Patil", "Smita Jagtap",
    "Dinesh Pawar", "Rupali Shinde", "Shashank Patil", "Mitali Kulkarni", "Nitin Patil",
    "Shubham Jadhav", "Yogita Pawar", "Arjun Patil", "Pratik Patil", "Gauri Patil"
  ];

  const departments = [
    "Road Transport", "Water", "Civil", "Electrical", "Mechanical"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberSelection = (member) => {
    setFormData(prev => {
      const newSelectedMembers = prev.selectedMembers.includes(member)
        ? prev.selectedMembers.filter(m => m !== member)
        : [...prev.selectedMembers, member];
      return { ...prev, selectedMembers: newSelectedMembers };
    });
  };

  const handleMultiSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, selectedDepartments: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, documents: e.target.files }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEmails = formData.selectedMembers.map(member => {
      const selectedMember = employees.find(emp => emp === member);
      return selectedMember ? selectedMember : null;
    }).filter(Boolean);

    console.log('Emails will be sent to:', selectedEmails);

    // Generate a room ID and create a meeting link
    const randomRoomID = generateRoomID();
    const videoCallURL = `https://sahakar-video-call.vercel.app/?roomID=${randomRoomID}`;
    setMeetingLink(videoCallURL); // Set the generated meeting link

    setShowNotification(true); // Show notification
  };

  // Filter the employee list based on the search term
  const filteredEmployees = employees.filter(emp =>
    emp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">SCHEDULE A MEETING</h1>

      {showNotification && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          Meeting scheduled successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-xl font-medium mb-2">
            Meeting Title/Subject:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md text-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-xl font-medium mb-2">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md text-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-xl font-medium mb-2">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md text-lg"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="endTime" className="block text-xl font-medium mb-2">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md text-lg"
            required
          />
        </div>

        {/* Search bar for employee names */}
        <div>
          <label htmlFor="search" className="block text-xl font-medium mb-2">Search Members:</label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="w-full p-3 border rounded-md text-lg"
          />
        </div>

        {/* Display filtered employees with checkboxes only when search term matches */}
        {searchTerm && (
          <div className="space-y-2 mt-4">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectedMembers.includes(employee)}
                    onChange={() => handleMemberSelection(employee)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-lg">{employee}</span>
                </label>
              ))
            ) : (
              <p className="text-lg text-gray-500">No matching employees found</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="selectedDepartments" className="block text-xl font-medium mb-2">Departments Involved:</label>
          <select
            id="selectedDepartments"
            name="selectedDepartments"
            multiple
            value={formData.selectedDepartments}
            onChange={handleMultiSelect}
            className="w-full p-3 border rounded-md text-lg"
            size={4}
          >
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="agenda" className="block text-xl font-medium mb-2">
            Agenda/Description:
          </label>
          <textarea
            id="agenda"
            name="agenda"
            value={formData.agenda}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md text-lg"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label htmlFor="documents" className="block text-xl font-medium mb-2">
            Attach Documents:
          </label>
          <input
            type="file"
            id="documents"
            name="documents"
            onChange={handleFileChange}
            multiple
            className="w-full p-3 border rounded-md text-lg"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-xl font-medium mb-2">Location:</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md text-lg"
          >
            <option value="virtual">Virtual</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>

        <div>
          <label htmlFor="recurrence" className="block text-xl font-medium mb-2">Recurrence:</label>
          <select
            id="recurrence"
            name="recurrence"
            value={formData.recurrence}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md text-lg"
          >
            <option value="one-time">One-Time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg">
            Schedule Meeting
          </button>
        </div>
      </form>

      {meetingLink && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <h2 className="text-xl font-bold">Meeting Link:</h2>
          <p className="text-lg">{meetingLink}</p>
          <p className="text-md mt-2 text-red-600 font-semibold">
            Please copy the meeting link and paste it in the calendar section.
          </p>
        </div>
      )}
    </div>
  );
}
