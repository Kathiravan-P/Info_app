import { Route, Routes } from "react-router-dom";
import React from "react";
import Form from "./components/Form";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
