import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import GoogleOAuth from "../assets/GoogleOAuth.png";
import CreateEvents from "../assets/CreateEvent.png";
import GetEvents from "../assets/GetEvents.png";
const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <header className="mb-8">
        <a href="sukritisharma.site" className="text-4xl font-bold">
          Sukriti Sharma
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a href="https://github.com/sukkuzzz">
            <FaGithub className="text-4xl ml-20" color="cyan" />
          </a>
          <a href="https://www.linkedin.com/in/sukkuzzz">
            <FaLinkedin className="text-4xl " color="cyan" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      {/* About Me */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">About Project</h2>
        <p>
          The <span className="text-[#6469ff]">Calendar Management System</span>{" "}
          is a responsive web app built with React.js, Node.js, and MongoDB,
          integrating Google Calendar for seamless event scheduling and
          management. It features an intuitive UI, real-time updates, and
          efficient time zone handling using date-fns, showcasing modern web
          development practices and third-party API integration.
        </p>
      </div>
      <main className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Tech Stack */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Authorization</h2>
          <p>
            The Authorization process ensures secure access to resources by
            validating user credentials and generating an authentication token.
            This token is then used to verify permissions for subsequent API
            requests.
          </p>
          <img className="mt-4" src={GoogleOAuth} />
        </div>

        {/* Remote Work */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Events</h2>
          <p>
            The CreateEvents process enables users to add new events by
            submitting details like event name, date, and description. The
            system validates the input, stores the event data in the database,
            and returns a confirmation response.
          </p>
          <img className="mt-4" src={CreateEvents} />
        </div>

        {/* Passion for Coding */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Get Events</h2>
          <p>
            The GetEvents process retrieves event details based on user
            requests. It queries the database for relevant events, formats the
            data, and sends it back in a structured response, ensuring optimized
            and secure data delivery.
          </p>
          <img className="mt-4" src={GetEvents} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8">
        <p className="text-gray-500 text-sm">
          &copy; 2025 Sukriti Sharma. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
export default Home;
