import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState({
    "2024-09-16": [{ time: "10:00 AM", title: "Department Meeting", description: "Meeting with the department manager.", link: "https://example.com" }],
    "2024-09-17": [{ time: "01:00 PM", title: "Project Review", description: "Review of project progress.", link: "https://example.com" }],
    "2024-09-19": [{ time: "09:00 AM", title: "Preparation", description: "Preparation for upcoming project phases.", link: "https://example.com" }],
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newMeeting, setNewMeeting] = useState({ title: '', description: '', link: '' });
  const [timeSelection, setTimeSelection] = useState({ hour: '', minute: '', period: 'AM' });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setNewMeeting({ title: '', description: '', link: '' });
    setTimeSelection({ hour: '', minute: '', period: 'AM' });
  };

  const handleSaveMeeting = () => {
    if (newMeeting.title && timeSelection.hour && timeSelection.minute && newMeeting.description) {
      const formattedTime = `${timeSelection.hour}:${timeSelection.minute} ${timeSelection.period}`;
      setMeetings((prevMeetings) => ({
        ...prevMeetings,
        [selectedDate]: [
          ...(prevMeetings[selectedDate] || []),
          { 
            time: formattedTime, 
            title: newMeeting.title, 
            description: newMeeting.description, 
            link: newMeeting.link 
          }
        ],
      }));
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal without saving
  };

  const renderDays = () => {
    const daysInPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    const startDayOfWeek = startOfMonth.getDay();
    let days = [];

    for (let i = 1; i <= startDayOfWeek; i++) {
      days.push(
        <div key={`prev-${i}`} className="border p-2 h-20 flex items-center justify-center text-gray-400 rounded-2xl">
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
          className={`border p-2 h-20 flex flex-col justify-between cursor-pointer rounded-2xl ${hasMeetings ? 'bg-orange-300' : 'bg-transparent'}`}
          onClick={() => openModal(day.date)}
        >
          <div className="text-sm font-bold">{dayDate.getDate()}</div>
          {day.meetings.map((meeting, i) => (
            <div key={i} className="text-xs mt-1 bg-gray-200 rounded p-1">
              {meeting.time} - {meeting.title}
            </div>
          ))}
        </div>
      );
    });

    const daysInNextMonth = 42 - days.length;
    for (let i = 1; i <= daysInNextMonth; i++) {
      days.push(
        <div key={`next-${i}`} className="border p-2 h-20 flex items-center justify-center text-gray-400 rounded-2xl">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-4 flex space-x-4">
      {/* Calendar Side */}
      <div className="w-1/2 border p-4 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="bg-blue-500 text-white px-3 py-1 rounded-2xl">
            Previous
          </button>
          <select value={currentMonth.getMonth()} onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), e.target.value, 1))} className="border p-2 rounded-2xl">
            {months.map((month, index) => <option key={index} value={index}>{month}</option>)}
          </select>
          <select value={currentMonth.getFullYear()} onChange={(e) => setCurrentMonth(new Date(e.target.value, currentMonth.getMonth(), 1))} className="border p-2 rounded-2xl">
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="bg-blue-500 text-white px-3 py-1 rounded-2xl">
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-sm">{day}</div>
          ))}
          {renderDays()}
        </div>
      </div>

      {/* Scheduled Meetings Side */}
      <div className="w-1/2 border p-4 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-center mb-4">Meeting Schedule</h1>
          <button 
            onClick={() => navigate('/schedulemeeting')} 
            className="bg-green-500 text-white px-4 py-2 rounded-2xl"
          >
            Create Meeting
          </button>
        </div>
        <div>
          {Object.keys(meetings).map((date, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-sm">{date}</h3>
              {meetings[date].map((meeting, idx) => (
                <div key={idx} className="text-xs p-1 bg-gray-200 rounded mt-1">
                  <span className="block font-bold">{meeting.time}</span>
                  <span>{meeting.title}</span>
                  <p>{meeting.description}</p>
                  {meeting.link && (
                    <a href={meeting.link} className="text-blue-500 text-xs mt-1 block">Meeting Link</a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding New Meeting */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center">
  <div className="bg-white p-6 rounded-2xl w-80">
          <h2 className="text-lg font-bold mb-2">Add Meeting on {selectedDate}</h2>
            <input
              type="text"
              placeholder="Meeting Title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Meeting Description"
              value={newMeeting.description}
              onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Meeting Link (optional)"
              value={newMeeting.link}
              onChange={(e) => setNewMeeting({ ...newMeeting, link: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex mb-4">
              <select
                value={timeSelection.hour}
                onChange={(e) => setTimeSelection({ ...timeSelection, hour: e.target.value })}
                className="border p-2 rounded mr-2 w-1/3"
              >
                <option value="">Hour</option>
                {Array.from({ length: 13 }, (_, i) => i).map((hour) => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                value={timeSelection.minute}
                onChange={(e) => setTimeSelection({ ...timeSelection, minute: e.target.value })}
                className="border p-2 rounded mr-2 w-1/3"
              >
                <option value="">Minute</option>
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select
                value={timeSelection.period}
                onChange={(e) => setTimeSelection({ ...timeSelection, period: e.target.value })}
                className="border p-2 rounded w-1/3"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-2xl">Cancel</button>
              <button onClick={handleSaveMeeting} className="bg-blue-500 text-white px-4 py-2 rounded-2xl">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
