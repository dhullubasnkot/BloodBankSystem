export default function Navbar() {
  return (
    <nav className="w-full px-10 pt-6">
      <div className="max-w-[1316px] mx-auto flex items-center justify-between h-[71px]">
        <div className="h-[100px] w-[100px] mb-2">
          <img
            src="/Logooo.png"
            alt="logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex gap-10 font-medium text-[16px]">
          <a href="#" className=" hover:text-red-600 transition ">
            Home
          </a>
          <a href="#" className="hover:text-red-600 transition">
            About Us
          </a>
          <a href="/findblood" className="hover:text-red-600 transition">
            Find Blood
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Register Now
          </a>
          <a href="/Register">
            <button className="px-5 py-2 border border-black rounded-md font-medium hover:bg-black hover:text-white transition mb-5">
              Log In
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
