import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import EventFilterPage from './components/EventFilterPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/filter" element={<EventFilterPage />} />
          <Route path="/*" element={<WelcomePage/>} />
        </Routes>
      </Router>
  );
}

export default App;