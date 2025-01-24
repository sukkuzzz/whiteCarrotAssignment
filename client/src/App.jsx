import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import whitecarrotLogo from "./assets/whitecarrotio.png";
import Home from "./pages/Home";
import Sukriti from "./pages/Sukriti";
import CalendarPage from "./pages/Calendar";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img
            src={whitecarrotLogo}
            alt="logo"
            className="w-28 object-full"
            style={{ cursor: "pointer" }}
          />
        </Link>
        <h1 className="font-inter font-semibold text-3xl">
          Welcome to the Whitecarrot Calendar Application
        </h1>
        <Link
          to="/calendar"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Calendar
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/sukriti" element={<Sukriti />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
