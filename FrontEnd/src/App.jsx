import "./App.css";
import OurCollaboration from "./pages/OurCollabration";
import OurMission from "./pages/ourMission";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <>
      <AppRoutes />;
      <OurCollaboration />
      <OurMission />
    </>
  );
}

export default App;
