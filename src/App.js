import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CrewTable from "./components/CrewTable";
import Crews from "./components/Crews";
import Launches from "./components/Launches";
import { useEffect, useState } from "react";
import WebVitasBox from "./components/WebVitasBox";
import Upcoming from "./components/Upcoming";

const CrewPage = () => {
  return (
    <div className="max-w-fit mx-auto">
      <div className="mt-10">
        <Crews />
      </div>
      <div className="mt-10">
        <CrewTable />
      </div>
    </div>
  );
};

const UpcomingPage = () => {
  const [data, setData] = useState();
  const [rockets, setRockets] = useState();
  const getUpcoming = async () => {
    const api = "https://api.spacexdata.com/v4/launches/upcoming";
    const res = await fetch(api).then((res) => res.json().then((res) => res));
    setData(res);
  };

  const getRockets = async () => {
    const api = 'https://api.spacexdata.com/v4/rockets'
    const res = await fetch(api).then((res) => res.json().then((res) => res));
    setRockets(res)
  }

  useEffect(() => {
    getUpcoming();
    getRockets()
  }, []);
  return (
    <div>
      <Upcoming data={data} rockets={rockets}/>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar items={["upcoming", "launches", "crews"]} />
      <WebVitasBox />
      <Routes>
        <Route path="/" element={<UpcomingPage />} />
        <Route path="upcoming" element={<UpcomingPage />} />
        <Route path="crews" element={<CrewPage />} />
        <Route path="launches" element={<Launches />} />
      </Routes>
    </div>
  );
}

export default App;
