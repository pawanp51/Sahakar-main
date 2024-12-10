import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState({
    "2024-09-16": [{ title: "Department Meeting", description: "Meeting with the department manager.", link: "https://example.com" }],
    "2024-09-17": [{ title: "Project Review", description: "Review of project progress.", link: "https://example.com" }],
    "2024-09-19": [{ title: "Preparation", description: "Preparation for upcoming project phases.", link: "https://example.com" }],
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', link: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewingEvents, setIsViewingEvents] = useState(false);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const years = Array.from({ length: 111 }, (_, i) => 1990 + i);

  const generateDays = () => {
    let days = [];
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      const dateStr = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      days.push({
        date: dateStr,
        meetings: meetings[dateStr] || [],
      });
    }
    return days;
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setNewEvent({ name: '', description: '', link: '' });
    setIsViewingEvents(false);
  };

  const handleSaveEvent = () => {
    if (newEvent.name && newEvent.description) {
      setMeetings((prevMeetings) => ({
        ...prevMeetings,
        [selectedDate]: [
          ...(prevMeetings[selectedDate] || []),
          { 
            title: newEvent.name, 
            description: newEvent.description, 
            link: newEvent.link 
          }
        ],
      }));
      setIsModalOpen(false);  // Close modal after saving event
    }
  };

  const handleDeleteEvent = (date, index) => {
    setMeetings((prevMeetings) => {
      const updatedMeetings = { ...prevMeetings };
      updatedMeetings[date] = updatedMeetings[date].filter((_, i) => i !== index);
      if (updatedMeetings[date].length === 0) {
        delete updatedMeetings[date];
      }
      return updatedMeetings;
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);  // Close modal without saving
  };

  const renderDays = () => {
    const daysInPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    const startDayOfWeek = startOfMonth.getDay();
    let days = [];

    for (let i = 1; i <= startDayOfWeek; i++) {
      days.push(
        <div key={`prev-${i}`} className="border p-2 h-20 flex items-center justify-center text-gray-400 rounded-2xl bg-gray-100">
          {daysInPrevMonth - i + 1}
        </div>
      );
    }

    generateDays().forEach((day, index) => {
      const dayDate = new Date(day.date);
      const hasMeetings = day.meetings.length > 0;

      days.push(
        <div
          key={index}
          className={`border p-2 h-20 flex flex-col justify-between cursor-pointer rounded-lg transition-all duration-300 transform hover:scale-105 ${hasMeetings ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-yellow-500' : 'bg-gradient-to-r from-blue-100 to-white hover:bg-blue-200'} shadow-md`}
          onClick={() => openModal(day.date)}
        >
          <div className="text-sm font-bold text-gray-700">{dayDate.getDate()}</div>
          {day.meetings.map((meeting, i) => (
            <div key={i} className="text-xs mt-1 bg-gray-200 rounded-lg p-1 shadow-sm">
              {meeting.title}
            </div>
          ))}
        </div>
      );
    });

    const daysInNextMonth = 42 - days.length;
    for (let i = 1; i <= daysInNextMonth; i++) {
      days.push(
        <div key={`next-${i}`} className="border p-2 h-20 flex items-center justify-center text-gray-400 rounded-2xl bg-gray-100">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6 flex space-x-10 bg-gradient-to-r from-gray-100 via-blue-100 to-white min-h-screen">
      {/* Calendar Side */}
      <div className="w-2/5 border p-6 rounded-3xl shadow-2xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition duration-200">
            Previous
          </button>
          <select value={currentMonth.getMonth()} onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), e.target.value, 1))} className="border p-2 rounded-lg shadow-sm">
            {months.map((month, index) => <option key={index} value={index}>{month}</option>)}
          </select>
          <select value={currentMonth.getFullYear()} onChange={(e) => setCurrentMonth(new Date(e.target.value, currentMonth.getMonth(), 1))} className="border p-2 rounded-lg shadow-sm">
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition duration-200">
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((day) => (
            <div key={day} className="text-center font-semibold text-sm">{day}</div>
          ))}
          {renderDays()}
        </div>
      </div>

      {/* Scheduled Meetings Side */}
      <div className="w-3/5 border p-6 rounded-3xl shadow-2xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl text-center mb-4 font-semibold text-blue-700">Meeting Schedule</h1>
          <button 
            onClick={() => navigate('/schedulemeeting')} 
            className="bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-green-600 transition duration-200"
          >
            Create Meeting
          </button>
        </div>
        <div className="space-y-5">
{/* Scheduled Meetings Side */}
<div className="w-3/5 border p-6 rounded-3xl shadow-2xl bg-white">

  <div className="space-y-5">
    {/* Display only the three constant events */}
    <div className="text-sm p-4 bg-gray-100 rounded-lg shadow-lg">
      <span className="block font-bold text-gray-900">Team Standup</span>
      <p className="mt-2 text-gray-600">Daily team standup meeting to sync up on project status.</p>
      <a href="https://sahakar-video-call.vercel.app/?roomID=9524" className="text-blue-600 hover:text-blue-800 mt-2 block">Join Meeting</a>
    </div>
    <div className="text-sm p-4 bg-gray-100 rounded-lg shadow-lg">
      <span className="block font-bold text-gray-900">Client Presentation</span>
      <p className="mt-2 text-gray-600">Present the latest project developments to the client.</p>
      <a href="https://sahakar-video-call.vercel.app/?roomID=9524" className="text-blue-600 hover:text-blue-800 mt-2 block">Join Meeting</a>
    </div>
    <div className="text-sm p-4 bg-gray-100 rounded-lg shadow-lg">
      <span className="block font-bold text-gray-900">Monthly Review</span>
      <p className="mt-2 text-gray-600">Review of the monthly progress and next steps.</p>
      <a href="https://sahakar-video-call.vercel.app/?roomID=9524" className="text-blue-600 hover:text-blue-800 mt-2 block">Join Meeting</a>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setIsViewingEvents(false)} className={`px-4 py-2 rounded-lg ${!isViewingEvents ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>Add Event</button>
              <button onClick={() => setIsViewingEvents(true)} className={`px-4 py-2 rounded-lg ${isViewingEvents ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>View Events</button>
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">Back</button>
            </div>

            {!isViewingEvents ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Event Name</label>
                  <input 
                    type="text" 
                    value={newEvent.name} 
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} 
                    className="w-full border p-2 rounded-lg" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Event Description</label>
                  <textarea 
                    value={newEvent.description} 
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} 
                    className="w-full border p-2 rounded-lg" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Event Link (Optional)</label>
                  <input 
                    type="url" 
                    value={newEvent.link} 
                    onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })} 
                    className="w-full border p-2 rounded-lg" 
                  />
                </div>
                <div className="flex justify-end">
                  <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-200 mr-2">Cancel</button>
                  <button onClick={handleSaveEvent} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">Save</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">Events This Month</h2>
                <div className="space-y-4">
                  {generateDays().map((day) => (
                    day.meetings.map((meeting, i) => (
                      <div key={`${day.date}-${i}`} className="p-4 bg-gray-100 rounded-lg shadow-lg">
                        <span className="block font-bold text-gray-900">{meeting.title}</span>
                        <p className="mt-2 text-gray-600">{meeting.description}</p>
                        {meeting.link && <a href={meeting.link} className="text-blue-600 hover:text-blue-800">Join Meeting</a>}
                        <button onClick={() => handleDeleteEvent(day.date, i)} className="bg-red-500 text-white px-3 py-1  ml-10 mt-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200">Delete</button>
                      </div>
                    ))
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

