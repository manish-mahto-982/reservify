import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Register from "./screens/Register";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./screens/Layout";
import Home from "./screens/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Home />}  />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
