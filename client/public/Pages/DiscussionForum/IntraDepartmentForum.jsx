import React, { useState, useEffect } from 'react';
import { PlusCircle, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NewThreadModal from "./NewThreadModal";
import axios from 'axios';
import { useUserContext } from '../../../src/UserContext';
import Avatar from './Avatar';
const IntraDepartmentForum = () => {
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [threads, setThreads] = useState([]);
  const { user, updateUser } = useUserContext();
  const navigate = useNavigate(); // Initialize navigation

  const fetchUserDetails = async () => {
    const userEmail = user.email;
    const URL = "http://localhost:3000/api/user-details?email=" + userEmail;
    const response = await axios({ url: URL });
    updateUser(response.data.data);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const getPost = async () => {
    const URL = "http://localhost:3000/api/get-post?user=" + user.email + "&type=0";
    const response = await axios({ url: URL });
    console.log(response);
    setThreads(response?.data?.data);
  };

  useEffect(() => {
    getPost();
  }, [user.name]);

  const handleCreateThread = async (threadData) => {
    const postData = {
      title: threadData.title,
      content: threadData.content,
      author: user.name,
      department: user.department
    };
    console.log(postData);
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/upload-post",
      data: postData
    });
    alert("Post Created");
    getPost();
  };

  // New function to handle post click and navigation
  const handlePostClick = (postId) => {
    // Navigate to the post details page with the post ID
    navigate(`/Forum/post/${postId}`);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Intra-Department Threads</h2>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsNewThreadModalOpen(true)}
        >
          <PlusCircle className="mr-2" /> New Thread
        </button>
        <NewThreadModal
          isOpen={isNewThreadModalOpen}
          onClose={() => setIsNewThreadModalOpen(false)}
          onSubmit={handleCreateThread}
        />
      </div>

      {threads.map((thread, index) => (
          <div
          key={index}
          className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
          onClick={() => handlePostClick(thread._id)}
        >
          <div className="flex items-center space-x-2 mb-3">
            <Avatar
              name={thread.author}
              className="rounded-full"
              width={25}
              height={25}
            />
            <div className="font-semibold text-sm text-gray-800 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
              {user?.name}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {thread.title}
            </h3>
            <span className="text-xs text-gray-500">
              {new Date(thread.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntraDepartmentForum;