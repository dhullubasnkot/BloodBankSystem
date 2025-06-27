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
      const response = await LogoutUser();
      console.log(response);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full px-10 pt-6">
      <div className="max-w-[1316px] mx-auto flex items-center justify-between h-[71px]">
        <a href="/">
          <div className="h-[100px] w-[100px] mb-2">
            <img
              src="/Logooo.png"
              alt="logo"
              className="h-full w-full object-contain"
            />
          </div>
          {/* navbar */}
        </a>
        <div className="flex gap-10 font-medium text-[16px]">
          <a href="/" className="hover:text-red-600 transition">
            Home
          </a>
          <a href="/RequestBlood" className="hover:text-red-600 transition">
            Request Blood
          </a>
          <a
            href="/DonorandRequetedBlood"
            className="hover:text-red-600 transition"
          >
            Find Blood
          </a>

          {/* Show "Register Now" only if logged in and not yet donor */}
          {isLoggedIn && !isDonorRegistered && (
            <a href="/BeaDonor" className="hover:text-red-600 transition">
              Register Now
            </a>
          )}

          {!isLoggedIn && (
            <a href="/Register">
              <button className="px-5 py-2 border border-black rounded-md font-medium hover:bg-black hover:text-white transition mb-5">
                Log In
              </button>
            </a>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 border border-black rounded-md font-medium hover:bg-black hover:text-white transition mb-5"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
