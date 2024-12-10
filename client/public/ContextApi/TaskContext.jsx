// AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const TaskContext = createContext();

// Create a custom hook for using context
export const useTaskContext = () => useContext(TaskContext);

// Create Context Provider
export const TaskProvider = ({ children }) => {
    const [tasks,settasks] = useState([]);
    const [selectedtask,setselectedtask]= useState(null);
    const [selected_approve_task,setselected_approve_task]= useState(null);
    // Define your state and functions here
  
    return (
        <TaskContext.Provider value={{ tasks ,settasks,selectedtask,setselectedtask,selected_approve_task,setselected_approve_task  }}>
            {children}
        </TaskContext.Provider>
    );
};
