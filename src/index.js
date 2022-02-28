import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./functionBased/components/Navbar"
import TodoContainer from "./functionBased/components/TodoContainer"
import About from "./functionBased/pages/About"
import NoMatch from "./functionBased/pages/NoMatch";
import "./functionBased/App.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoContainer />} />
        <Route path="/about/*" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  , document.getElementById("root")
)