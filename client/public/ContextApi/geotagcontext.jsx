// AppContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Create Context
const GeotagContext = createContext();

// Create a custom hook for using context
export const usegeotagContext = () => useContext(GeotagContext);

// Create Context Provider
export const GeotagProvider = ({ children }) => {
// Create
    const [projdata,setprojdata] = useState(null);
    const [ allpts,setallpts] = useState([]);
    return (
        <GeotagContext.Provider value={{projdata,setprojdata,allpts,setallpts }}>
            {children}
        </GeotagContext.Provider>
    );
};
