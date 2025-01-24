import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "../components/CreateEvent";
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const handleLogin = () => {
    window.location.href = "https://whitecarrotassignment-backend.onrender.com/auth";
  };
  console.log("I was here ");
  useEffect(() => {
    axios
      .get("https://whitecarrotassignment-backend.onrender.com/events", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
        setEvents(response.data);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);
  const handleFilter = (date) => {
    // Filter events by date
    const filteredEvents = events.filter(
      (event) => new Date(event.date).toISOString().slice(0, 10) === date
    );
    setEvents(filteredEvents);
  };
  const formatTime = (timeString) => {
    try {
      if (!timeString) throw new Error("Empty time value");
      const date = new Date(`1970-01-01T${timeString}`);
      if (isNaN(date)) throw new Error("Invalid date");
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting time:", error.message);
      return "Invalid time";
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEvents([]);
    window.location.href = "https://whitecarrotassignment-backend.onrender.com/logout";
  };
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `https://whitecarrotassignment-backend.onrender.com/delete-event/${eventId}`,
        {
          withCredentials: true,
        }
      );
      setMessage("Event deleted successfully!");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      setMessage("Failed to delete event.");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Google Calendar Events</h1>
      {!isAuthenticated && (
        <button
          onClick={handleLogin}
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Login with Google
        </button>
      )}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      )}
      <div className="mt-6 w-full max-w-3xl">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            handleFilter(e.target.value);
          }}
          className="border text-gray-900 border-gray-300 px-3 py-2 rounded-lg w-full"
        />
        <table className="mt-4 w-full bg-gray-700 rounded-lg shadow-lg p-6">
          <thead>
            <tr className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No events found
                </td>
              </tr>
            )}
            {events.map((event, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{event.title}</td>
                <td className="p-3">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="p-3">{formatTime(event.time)}</td>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="mt-2 border bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Event
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 w-full max-w-6xl">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};
export default Calendar;
