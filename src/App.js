import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CrewTable from "./components/CrewTable";
import Crews from "./components/Crews";
import Launches from "./components/Launches";

const CrewPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="mt-10">
        <Crews />
      </div>
      <div className="mt-10">
        <CrewTable />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar items={["launches", "crews"]} />

      <Routes>
      <Route path="/" element={<></>} />
        <Route path="crews" element={<CrewPage />} />
        <Route path="launches" element={<Launches />} />
      </Routes>
    </div>
  );
}

export default App;
