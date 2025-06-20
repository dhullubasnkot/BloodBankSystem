import "./App.css";
// import Navbar from "./components/navbar";
import HeroSection from "./pages/hero";
import OurCollobaration from "./pages/OurCollabration";
import OurMission from "./pages/ourMission";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <OurMission />
      <OurCollobaration />
    </>
  );
}

export default App;
