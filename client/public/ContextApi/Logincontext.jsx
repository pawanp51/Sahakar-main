// AppContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Create Context
const LoginContext = createContext();

// Create a custom hook for using context
export const useLoginContext = () => useContext(LoginContext);

// Create Context Provider
export const LoginProvider = ({ children }) => {
    const navigate = useNavigate();
    // Define your state and functions here
    const [user, setUser] = useState(null);
    const [token,settoken] = useState(null);
    // const [ loading,setloading] = useState(false);


    async function checklogin(){
        console.log("login called");
        const tok = localStorage.getItem('token');
        if(tok){
            const response = await fetch("http://localhost:3000/checklogin",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: tok})
            })
            const res = await response.json();
             setUser(res.userdata.user);             
            console.log("data set to" , res.userdata.user);
            
            
            
        }else{
            navigate("/");
        }
    }
    
    
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
        <LoginContext.Provider value={{ user, login, logout ,checklogin}}>
            {children}
        </LoginContext.Provider>
    );
};
