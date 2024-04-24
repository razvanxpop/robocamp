import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import RobotsPage from './pages/RobotsPage';
import TasksPage from './pages/TasksPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/robots" element={<RobotsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );  
}

export default App;