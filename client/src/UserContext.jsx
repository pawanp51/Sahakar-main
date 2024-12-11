import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    token: "",
    onlineUser: [],
    socketConnection: null,
    department : "",
  });

  const updateUser = (data) => setUser((prev) => ({ ...prev, ...data }));
  const setOnlineUser = (onlineUsers) =>
    setUser((prev) => ({ ...prev, onlineUser: onlineUsers }));
  const setSocketConnection = (socket) =>
    setUser((prev) => ({ ...prev, socketConnection: socket }));

  return (
    <UserContext.Provider
      value={{ user, updateUser, setOnlineUser, setSocketConnection }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
