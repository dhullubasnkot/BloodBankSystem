import React, { useState } from "react";

import LoginUser from "../api/users/loginuser";

export default function Login({ onSwitchToSignup }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await LoginUser({
        ...form,
      });
      console.log("Attempting to log in with:", form);
      setMessage("Login successful!");
      setForm({
        email: "",
        password: "",
      });
    } catch (err) {
      setMessage("Login failed: " + (err.message || "Unknown error"));
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        Welcome Back!
      </h2>
      {message && (
        <p className="mb-4 text-center text-sm text-gray-700">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-gray-700">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToSignup}
          className="text-red-600 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
