import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    summary: "",
    description: "",
    start: "",
    end: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://whitecarrotassignment.onrender.com/create-event",
        eventData,
        {
          withCredentials: true,
        }
      );
      setMessage("Event created successfully!");
      console.log(response.data);
      setEventData({ summary: "", description: "", start: "", end: "" });
      window.location.reload();
    } catch (error) {
      setMessage("Failed to create event.");
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="event-form-container flex flex-col items-center ">
      <h1 className="event-form-title text-2xl font-bold">Create New Event</h1>
      {message && <p className="message">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="event-form border bg-gray-700 border-gray-300 px-3 py-2 rounded-lg w-full max-w-md"
        style={{ maxWidth: "1000px" }}
      >
        <label htmlFor="summary">Event Title:</label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={eventData.summary}
          onChange={handleInputChange}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          className="  border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />

        <label htmlFor="start">Start Time:</label>
        <input
          type="datetime-local"
          id="start"
          name="start"
          value={eventData.start}
          onChange={handleInputChange}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />

        <label htmlFor="end">End Time:</label>
        <input
          type="datetime-local"
          id="end"
          name="end"
          value={eventData.end}
          onChange={handleInputChange}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        <button
          type="submit"
          className="mt-4 event-form border bg-[#6469ff] border-gray-300 px-3 py-2 rounded-lg w-full max-w-md ml-60 "
          style={{ maxWidth: "200px" }}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
