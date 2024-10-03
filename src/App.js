import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "../src/component/Login";
import Dashboard from "../src/component/Dashboard";
import Report1 from "../src/component/Report1";
import Report2 from "../src/component/Report2";
import Report3 from "../src/component/Report3";
import Navbar from "../src/component/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/report1" element={<Report1 />} />
            <Route path="/report2" element={<Report2 />} />
            <Route path="/report3" element={<Report3 />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
