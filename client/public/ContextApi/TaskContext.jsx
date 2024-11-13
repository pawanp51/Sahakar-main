// AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const TaskContext = createContext();

// Create a custom hook for using context
export const useTaskContext = () => useContext(TaskContext);

// Create Context Provider
export const TaskProvider = ({ children }) => {
    const [tasks,settasks] = useState();
    // Define your state and functions here
  
    return (
        <TaskContext.Provider value={{ tasks ,settasks}}>
            {children}
        </TaskContext.Provider>
    );
};
