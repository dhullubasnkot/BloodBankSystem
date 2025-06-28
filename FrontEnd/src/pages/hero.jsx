import Navbar from "../components/navbar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HeroSection() {
  const tofindBlood = () => {
    window.location.href = "/DonorandRequetedBlood";
  };

  return (
    <section className="relative h-screen bg-gradient-to-br from-red-50 via-white to-red-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-2/3 h-full z-0">
        <img
          src="/Ellipse.png"
          alt="Ellipse"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Navbar */}
      {/* <div className="relative z-20">
        <Navbar />
      </div> */}

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-8">
        <div className="max-w-3xl text-center space-y-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-red-700 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Save Lives, <br /> Donate Blood Today
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            One pint of blood can save up to three lives. Join the cause and
            make a difference today. Your blood can be someone’s miracle.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={tofindBlood}
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Request Blood Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// hero section
