import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import EventFilterPage from './EventFilterPage';
import FilterICS from "./FilterICS";
import DownloadICSButton from "./DownloadICSButton";
import Sidebar from "./Test";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/filter" element={<EventFilterPage />} />
          <Route path="/ics" element={<FilterICS />} />
            <Route path="/icstest" element={<DownloadICSButton />} />
        </Routes>
      </Router>
  );
}

export default App;