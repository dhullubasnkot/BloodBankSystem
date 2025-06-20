import "./App.css";
// import Navbar from "./components/navbar";
import HeroSection from "./pages/hero";
import OurCollobaration from "./pages/OurCollabration";
import OurMission from "./pages/ourMission";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <AppRoutes>
        <HeroSection />
        <OurMission />
        <OurCollobaration />
      </AppRoutes>
    </>
  );
}

export default App;
