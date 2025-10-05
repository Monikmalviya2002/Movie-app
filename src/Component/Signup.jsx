import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Movies from "./Movies";
import { BASE_URL } from "../utills/constant";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(
          BASE_URL+"/api/login",
          { emailId, password },
          { withCredentials: true }
        );
        console.log("Login success:", res.data);
        navigate("/movies");
      } else {
        const res = await axios.post(
          BASE_URL+ "/api/signup",
          { emailId, password },
          { withCredentials: true }
        );
        console.log("Signup success:", res.data);
        alert("Signup successfully!");
        navigate("/movie");
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailId || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    handleAuth();
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-[#03191e] px-4">
  <div className="w-full max-w-75"> 
    
      <h1 className="text-5xl text-bold text-white text-center mb-6">
        {isLogin ? "Sign in" : "Sign up"}
      </h1>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full bg-[#1b3a50] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#1b3a50] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#1b3a50] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-500 transition-colors mt-2"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-gray-300 text-sm mt-4 text-center">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <span
              className="text-green-700 font-medium cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              className="text-green-700 font-medium cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Sign in
            </span>
          </>
        )}
      </p>
    </div>
  </div>


  )
};

export default Signup;