import Navbar from "../components/navbar";

export default function HeroSection() {
  return (
    <section className="w-full h-screen relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-1/2 z-0">
        <img
          src="/Ellipse.png"
          alt="Ellipse"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="flex items-center justify-end h-full z-10 relative px-10 pl-72">
        <div className="w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-snug">
            Save Life <br /> Donate Blood
          </h1>
          <p className="text-gray-600 text-base max-w-md">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <button
            onClick={() => alert("Button clicked!")}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Get Blood Now
          </button>
        </div>
      </div>
    </section>
  );
}
