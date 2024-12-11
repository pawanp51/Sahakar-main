import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../public/Pages/Login.jsx';
import Register from '../public/Pages/Register.jsx';
import Dashboard from '../public/Pages/Dashboard.jsx';
import Inventory from '../public/Pages/Inventory_pages/Inventory.jsx';
import GIS from '../public/Pages/GIS_pages/GIS.jsx';
import Meeting from '../public/Pages/Meeting.jsx';
import Geotagging from '../public/Pages/GIS_pages/Geotagging.jsx';
import Complaints from '../public/Pages/Complaints.jsx';
import Projects from '../public/Pages/Project_pages/Projects.jsx';
import TaskManager from '../public/Pages/Task_pages/TaskManager.jsx';
import CreateProjectForm from '../public/Pages/Project_pages/CreateProjectForm.jsx';
import MyProfile from '../public/Pages/Project_pages/MyProfile.jsx';
import Templates from '../public/Pages/Templates.jsx';
import Task from '../public/Pages/Task_pages/Task.jsx';
import TaskStatus from '../public/Pages/Task_pages/TaskStatus.jsx';
import ProjectDetails from '../public/Pages/Project_pages/ProjectDetails.jsx';
import ProjectAnalysis from '../public/Pages/Project_pages/ProjectAnalysis.jsx';
import Seminar from '../public/Pages/Seminar.jsx';
import PendingTasks from '../public/Pages/Task_pages/PendingTasks.jsx';
import MyInventory from '../public/Pages/Inventory_pages/MyInventory.jsx';
import Approve from '../public/Pages/Task_pages/Approve.jsx';
import Inc_req from '../public/Pages/Inventory_pages/Inc_req.jsx';
import Out_req from '../public/Pages/Inventory_pages/Out_req.jsx';
import TopBanner from '../public/Components/TopBanner.jsx';
import CreateTask from '../public/Pages/Task_pages/CreateTask.jsx';
import Expense from '../public/Pages/Project_pages/Expense.jsx';
import OfficeBudget from '../public/Pages/Project_pages/OfficeBudget.jsx';
import Staff from '../public/Pages/Staff.jsx';  // Corrected import path
import DisasterManagement from '../public/Pages/Project_pages/DisasterManagement.jsx';  // Corrected import path
import GISinit from '../public/Pages/GIS_pages/GISinit.jsx';
import GISreq from '../public/Pages/GIS_pages/GISreq.jsx';
import IncGISreq from '../public/Pages/GIS_pages/IncGISreq.jsx';
import CreateGIS from '../public/Pages/GIS_pages/CreateGIS.jsx';
import ReceivedGIS from '../public/Pages/GIS_pages/receivedGIS.jsx';
import MarkingGeotag from '../public/Pages/Project_pages/markingGeotag.jsx';
import Conflict from '../public/Pages/Project_pages/conflict.jsx';
import MessagePage from '../public/Pages/DiscussionForum/MessagePage.jsx';
import Discussion from '../public/Pages/DiscussionForum/Discussion.jsx';
import { UserProvider } from './UserContext.jsx';
import Forum from "../public/Pages/DiscussionForum/Forum.jsx"
import InterDepartmentForum from '../public/Pages/DiscussionForum/InterDepartmentForum.jsx';
import IntraDepartmentForum from '../public/Pages/DiscussionForum/IntraDepartmentForum.jsx';
import PostDetails from '../public/Pages/DiscussionForum/PostDetail.jsx';
import '../src/App.css';
import ScheduleMeeting from '../public/Components/ScheduleMeeting.jsx';

const App = () => {
  return (
    <>
      <UserProvider>
        <TopBanner />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} /> 
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Meeting" element={<Meeting />} />
          <Route path="/GIS" element={<GIS />} />
          <Route path="/Geotagging" element={<Geotagging />} />
          <Route path="/Complaints" element={<Complaints />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="/OfficeBudget" element={<OfficeBudget />} />
          <Route path="/OfficeBudget" element={<OfficeBudget />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/CreateProjectForm" element={<CreateProjectForm />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/TaskManager" element={<TaskManager />} />
          <Route path="/Templates" element={<Templates />} />
          <Route path="/Seminar" element={<Seminar />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/PendingTasks" element={<PendingTasks />} />
          <Route path="/TaskStatus" element={<TaskStatus />} />
          <Route path="/Approve" element={<Approve />} />
          <Route path="/ProjectDetails" element={<ProjectDetails />} />
          <Route path="/ProjectAnalysis" element={<ProjectAnalysis />} />
          <Route path="/MyInventory" element={<MyInventory />} />
          <Route path="/Inc_req" element={<Inc_req />} />
          <Route path="/Out_req" element={<Out_req />} />
          <Route path="/schedulemeeting" element={<ScheduleMeeting/>} />
          <Route path="/ScheduleMeeting" element={<ScheduleMeeting />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/DisasterManagement" element={<DisasterManagement />} />
          <Route path="/GISreq" element={<GISreq />} />
          <Route path="/IncGISreq" element={<IncGISreq/>} />
          <Route path="/create-gis" element={<CreateGIS />} />
          <Route path='/GISinit' element={<GISinit/>} />
          <Route path='/receivedGIS' element={<ReceivedGIS />} />
          <Route path='/markGeotag' element={<MarkingGeotag />} />
          <Route path='/conflict' element={<Conflict />} />
          <Route path ="/Forum" element = {<Forum />} >
            <Route path ="/Forum/InterDepartment" element = {<InterDepartmentForum />} />
            <Route path ="/Forum/IntraDepartment" element = {<IntraDepartmentForum />} />
          </Route>
          <Route path="/Forum/post/:postId" element={<PostDetails />} />
          <Route path="/Forum/Discussion" element={<Discussion />} >
            <Route path = "/Forum/Discussion/:userId" element={<MessagePage />}/>
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
