import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search, Filter, Plus } from 'lucide-react';
import TaskStatus from './TaskStatus'; // Import the TaskStatus component
import { useTaskContext } from '../../ContextApi/TaskContext';
import { useLoginContext } from '../../ContextApi/Logincontext';
import Approval from './Approval';

// RadioInputs component
const RadioInputs = ({ selected, onChange }) => {
  return (
    <div className="relative flex flex-wrap rounded-lg bg-gray-200 shadow-md p-1 w-full sm:w-72 text-sm">
      <label className="flex-1 text-center">
        <input
          type="radio"
          name="radio"
          value="Pending Tasks"
          checked={selected === 'Pending Tasks'}
          onChange={onChange}
          className="hidden"
        />
        <span
          className={`flex cursor-pointer items-center justify-center rounded-lg py-2 px-4 transition-all duration-150 ease-in-out ${
            selected === 'Pending Tasks' ? 'bg-white font-semibold' : 'text-gray-800'
          }`}
        >
          Pending Tasks
        </span>
      </label>
      <label className="flex-1 text-center">
        <input
          type="radio"
          name="radio"
          value="Task Status"
          checked={selected === 'Task Status'}
          onChange={onChange}
          className="hidden"
        />
        <span
          className={`flex cursor-pointer items-center justify-center rounded-lg py-2 px-4 transition-all duration-150 ease-in-out ${
            selected === 'Task Status' ? 'bg-white font-semibold' : 'text-gray-800'
          }`}
        >
          Task Status
        </span>
      </label>
      <label className="flex-1 text-center">
        <input
          type="radio"
          name="radio"
          value="Approval"
          checked={selected === 'Approval'}
          onChange={onChange}
          className="hidden"
        />
        <span
          className={`flex cursor-pointer items-center justify-center rounded-lg py-2 px-4 transition-all duration-150 ease-in-out ${
            selected === 'Approval' ? 'bg-white font-semibold' : 'text-gray-800'
          }`}
        >
          Approval Requests
        </span>
      </label>
    </div>
  );
};

// TaskTable component
const TaskTable = ({tasks}) => {
  // console.log("tasks are",tasks);
  
  const navigate = useNavigate(); // Initialize useNavigate
  // Function to navigate to CreateTask page
  const handleAddTaskClick = () => {
    navigate('/CreateTask');
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Task List</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b space-y-2 sm:space-y-0">
          <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="flex items-center justify-center px-4 py-2 border rounded-md w-full sm:w-auto">
              <Filter size={20} className="mr-2" />
              Filters
            </button>
            <button
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto"
              onClick={handleAddTaskClick} // Navigate to CreateTask on click
            >
              <Plus size={20} className="mr-2" />
              Add Task
            </button>
          </div>
        </div>
        <div className="overflow-x-auto"> {/* Enable horizontal scroll */}
          <table className="w-full table-auto min-w-[800px]"> {/* Ensure minimum width */}
            <thead>
              <tr className="">
                <th className="px-2 py-3">ID</th>
                <th className="px-2 py-3">Task Name</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Assigned By</th>
                <th className="px-2 py-3">Department</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="px-2 py-2">{task.task_id}</td>
                  <td className="px-2 py-2">{task.task_name}</td>
                  <td className="px-2 py-2">{task.date}</td>
                  <td className="px-2 py-2">{task.assigned_by}</td>
                  <td className="px-2 py-2">{task.department}</td>
                  <td className="px-2 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                       task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => navigate('/Task')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      >
                        Complete Task
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <div className="flex space-x-2">
            <button className="px-2 py-1 border rounded-md">&lt;</button>
            <button className="px-2 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-2 py-1 border rounded-md">2</button>
            <span>...</span>
            <button className="px-2 py-1 border rounded-md">7</button>
            <button className="px-2 py-1 border rounded-md">8</button>
            <button className="px-2 py-1 border rounded-md">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// TaskManager component
const TaskManager = () => {
  const {tasks,settasks} = useTaskContext();
  const {user , checklogin} = useLoginContext();
  const [loading,setloading] = useState(false);
  useEffect(() => {

    const fetchUserAndTasks = async () => {
      setloading(true); // Show loading state while fetching data
      if (!user) {
        await checklogin(); // Ensure user is set
      }
      if (user) {
        await gettasks(); // Fetch tasks after user is available
      }
      setloading(false); // Hide loading state after fetching data
    };
  
    fetchUserAndTasks();
  }, [user]);
  




  async function gettasks() {

    if(!user) return;
      
      console.log("gettasks");
      console.log("in gettask user is",user);
      
      
    const response = await fetch("http://localhost:3000/tasks",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:user.Email})

    });
    const res = await response.json();
    console.log("response is",res);
    settasks(res);   
  }
  const [selected, setSelected] = useState('Pending Tasks');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  if(loading){
    return <p>loading..</p>;

  } 

  return (
        <div className="p-4 sm:p-6">
      <div className="flex justify-center mb-6">
        <RadioInputs selected={selected} onChange={handleChange} />
      </div>
     
      {selected === 'Pending Tasks'   && <TaskTable tasks={tasks}/>}
      {selected === 'Task Status' && <TaskStatus />}
      {selected === 'Approval' && <Approval />}
    </div>
  );
};

export default TaskManager;
