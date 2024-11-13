// AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const LoginContext = createContext();

// Create a custom hook for using context
export const useLoginContext = () => useContext(LoginContext);

// Create Context Provider
export const LoginProvider = ({ children }) => {
    // Define your state and functions here
    const [user, setUser] = useState(null);
    const [token,settoken] = useState(null);
    
    const login = (userData) => {
        setUser(userData.userdata);
        settoken(userData.token);
        localStorage.setItem('token', userData.token);
    }
    const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); 
    }
    return (
        <LoginContext.Provider value={{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};
