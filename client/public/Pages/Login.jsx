import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBack from '../Images/LoginBack.png'; // The image you want to use
import { useLoginContext } from '../ContextApi/Logincontext';
const Login = () => {
  const { login } = useLoginContext(); // Get the login function from the context
  const [email,setemail] = useState("");
  const [password,setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    const data = await response.json();

    if(response.status === 200){
      console.log(data.userdata);
      login(data);
      navigate('/Dashboard');
      
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex border-4 border-blue-600"> {/* Added border class */}
        {/* Left side of the card with the image */}
        <div className="w-1/2 p-0">
          <img
            src={LoginBack}
            alt="Login background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side of the card with login form */}
        <div className="w-1/2 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back...</h2>
            <p className="text-gray-600">Please enter your email and password</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="user@gmail.com"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e)=>{setemail(e.target.value)}}
                required
                value={email}
                autoComplete='true'
                
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e)=>{setPassword(e.target.value)}}
                required
                value={password}
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              By logging in, you agree to our <a href="#" className="text-blue-600">Terms & Conditions</a>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-purple-700"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600">Forgot Password</a>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet? <a href="#" className="text-blue-600">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
