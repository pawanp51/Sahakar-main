// AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const ProjContext = createContext();

// Create a custom hook for using context
export const useProjContext = () => useContext(ProjContext);

// Create Context Provider
export const ProjProvider = ({ children }) => {
    const [projectdetails,setprojectdetails] = useState(null);

    return (
        <ProjContext.Provider value={{ setprojectdetails, projectdetails }}>
            {children}
        </ProjContext.Provider>
    );
};
