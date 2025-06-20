import React, { useState } from "react";
import signupUser from "../api/users/signupuser";
import Login from "../auth/login";
export default function Register() {
  const [isLogin, setIsLogin] = useState(true);

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [signupMessage, setSignupMessage] = useState("");

  const handleSignupChange = (e) =>
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSignupSubmit(e) {
    e.preventDefault();
    try {
      await signupUser({
        ...signupForm,
      });
      setSignupMessage("Signup successful! You can now log in.");
      setSignupForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      setIsLogin(true);
    } catch (err) {
      setSignupMessage("Signup failed: " + (err.message || "Unknown error"));
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-rose-700 items-center justify-center p-8 text-white relative">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="z-10 text-center">
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">
              {isLogin ? "Welcome Back!" : "Join Us Today!"}
            </h1>
            <p className="text-lg font-light">
              {isLogin
                ? "Log in to access your account and continue your journey."
                : "Sign up to explore amazing features and connect with our community."}
            </p>
            <div className="mt-8">
              {isLogin ? (
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                >
                  Create Account
                </button>
              ) : (
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                >
                  Already have an account? Login
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full">
            {isLogin ? (
              <Login onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
                  Create Your Account
                </h2>
                {signupMessage && (
                  <p className="mb-4 text-center text-sm text-gray-700">
                    {signupMessage}
                  </p>
                )}
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={signupForm.name}
                    onChange={handleSignupChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200"
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200"
                    required
                  />

                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    value={signupForm.phone}
                    onChange={handleSignupChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200"
                    required
                  />

                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="mt-6 text-center text-gray-700">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
