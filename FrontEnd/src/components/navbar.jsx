import { useEffect, useState } from "react";
import LogoutUser from "../api/users/logoutuser";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDonorRegistered, setIsDonorRegistered] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const Donor_Id = localStorage.getItem("Donor_id");

    setIsLoggedIn(!!id);
    setIsDonorRegistered(!!Donor_Id);
  }, []);

  const handleLogout = async () => {
    try {
      await LogoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full px-10 pt-6 bg-gradient-to-br from-red-50 via-white to-red-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1316px] mx-auto flex items-center justify-between h-[71px]">
        <a href="/" aria-label="Home">
          <div className="h-[40px] w-[40px] mb-2">
            <img
              src="/Logooo.png"
              alt="Blood Bank Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </a>

        <div className="flex items-center gap-10 font-medium text-[16px] text-gray-800">
          <a
            href="/"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/RequestBlood"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Request Blood
          </a>
          <a
            href="/DonorandRequetedBlood"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Find Blood
          </a>
          <a
            href="/userProfile"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Your Profile
          </a>

          {/* Show "Register Now" only if logged in but not a donor */}
          {isLoggedIn && !isDonorRegistered && (
            <a
              href="/BeaDonor"
              className="hover:text-red-600 transition-colors duration-200"
            >
              Register Now
            </a>
          )}

          {!isLoggedIn ? (
            <a href="/Register">
              <button className="px-5 py-2 border border-black rounded-md font-medium hover:bg-black hover:text-white transition-colors duration-200">
                Log In
              </button>
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 border border-black rounded-md font-medium hover:bg-black hover:text-white transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
//Navbar
