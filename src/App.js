import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router basename='/News-Monkey'>
        <Navbar />
        <Routes>
          <Route exact path="/general" element={<News key="home-general" pageSize={6} category="general" />} />
          <Route exact path="/" element={<News key="general" pageSize={6} category="general"/>} />
          <Route exact path="/business" element={<News key="Business" pageSize={6} category="business"/>} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} category="entertainment"/>} />
          <Route exact path="/health" element={<News  key="health" pageSize={6} category="health"/>} />
          <Route exact path="/science" element={<News  key="science" pageSize={6} category="science"/>} />
          <Route exact path="/technology" element={<News  key="technology" pageSize={6} category="technology"/>} />
          <Route exact path="/politics" element={<News  key="politics" pageSize={6} category="politics"/>} />
          <Route exact path="/sports" element={<News  key="sports" pageSize={6} category="sports"/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

