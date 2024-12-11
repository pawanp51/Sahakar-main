import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useUserContext } from '../../../src/UserContext';

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch post details
  const fetchPostDetails = async () => {
    try {
      setIsLoading(true);
      const postResponse = await axios.get(`http://localhost:3000/api/get-post-details?postId=${postId}`);
      setPost(postResponse.data.data);

      // Fetch comments for this post
      const commentsResponse = await axios.get(`http://localhost:3000/api/get-comments?postId=${postId}`);
      setComments(commentsResponse.data.data || []);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching post details:', error);
      setIsLoading(false);
    }
  };

  // Submit new comment
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const commentData = {
        postId: postId,
        content: newComment,
        author: user.name
      };

      const response = await axios.post('http://localhost:3000/api/add-comment', commentData);
      
      // Add the new comment to the comments list
      setNewComment(''); // Clear input
      fetchPostDetails();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 text-center">
        <p>Post not found</p>
        <button 
          onClick={handleBack} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back to Forum
        </button>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={handleBack} 
        className="flex items-center text-gray-600 hover:text-blue-500 mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Forum
      </button>

      {/* Post Details */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Author: {post.author || 'Anonymous'}</span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
        
        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment._id} 
                className="border-b pb-3 last:border-b-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {comment.author || 'Anonymous'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Input */}
        <div className="mt-6 flex items-center">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;