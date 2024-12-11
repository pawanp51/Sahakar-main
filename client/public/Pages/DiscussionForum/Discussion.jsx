import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../../src/UserContext";
import CsideBar from "./CsideBar";
import io from "socket.io-client";

const Discussion = () => {
  const { user, updateUser, setOnlineUser, setSocketConnection } = useUserContext();
  const location = useLocation();
  console.log("user", user);

  const fetchUserDetails = async () => {
    const userEmail = user.email;
    const URL = "http://localhost:3000/api/user-details?email="+userEmail;
    const response = await axios({ url: URL });
    updateUser(response.data.data);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  console.log(user);
  useEffect(() => {
    console.log("name:",user.name);
    const socketConnection = io("http://localhost:3000", {
      auth: { name : user.name },
    });

    socketConnection.on("onlineUser", (data) => {
      setOnlineUser(data);
    });

    setSocketConnection(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [user.name]);

  const basePath = location.pathname === "/Forum/Discussion";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`${!basePath && "hidden"} lg:block`}>
        <CsideBar />
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        } bg-slate-200`}
      >
        <p className="text-lg mt-2 text-slate-500">Select user to send message</p>
      </div>
    </div>
  );
};

export default Discussion;
