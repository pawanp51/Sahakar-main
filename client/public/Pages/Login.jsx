import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBack from '../Images/LoginBack.png'; // The image you want to use
import { useLoginContext } from '../ContextApi/Logincontext';
import { useUserContext } from '../../src/UserContext';

const Login = () => {
  const { login } = useLoginContext(); // Get the login function from the context
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { user, updateUser }  = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    updateUser({email});
    if (response.status === 200) {
      console.log(data.userdata);
      login(data);
      navigate('/Dashboard');
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center py-8 px-4 md:px-8 bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-center border-4 border-blue-600">
        <div className="w-full md:w-1/2 h-full  md:h-1/2 ">
          <img
            src={LoginBack}
            alt="Login background"
            className="w-full h-full object-fit "
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Welcome Back...</h2>
            <p className="text-sm md:text-base text-gray-600">Please enter your email and password</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="user@gmail.com"
                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                onChange={(e) => { setemail(e.target.value); }}
                required
                value={email}
                autoComplete='true'
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                onChange={(e) => { setPassword(e.target.value); }}
                required
                value={password}
              />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              By logging in, you agree to our <a href="#" className="text-blue-600">Terms & Conditions</a>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-purple-700 text-sm md:text-base"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-xs md:text-sm text-blue-600">Forgot Password</a>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs md:text-sm text-gray-600">
              Don't have an account yet?{' '}
              <a href="#" className="text-blue-600">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
