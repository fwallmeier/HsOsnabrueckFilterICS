import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import EventFilterPage from './EventFilterPage';
import FilterICS from "./FilterICS";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/filter" element={<EventFilterPage />} />
          <Route path="/filter/ics" element={<FilterICS />} />
        </Routes>
      </Router>
  );
}

export default App;