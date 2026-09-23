
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/v1/calculator/login",
        form
      );

      setUser(res.data.token);
      localStorage.setItem("token",res.data.user.token)
      navigate("/calculator");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-3 w-full mb-5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <label className="block text-gray-700 font-medium mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 w-full rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

