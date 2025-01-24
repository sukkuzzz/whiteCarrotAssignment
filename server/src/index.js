// 1. Backend: server.js (Node.js & Express.js)
import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    console.log("Refresh token:", tokens.refresh_token);
  }
});

// Routes
app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "openid",
      "email",
      "profile",
    ],
  });
  res.redirect(url);
});

app.get("/auth/redirect", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.cookie("access_token", tokens.access_token, { httpOnly: true });
  res.redirect("http://localhost:5173/calendar");
});

app.get("/events", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const events = await calendar.events.list({
      calendarId: "primary",
      orderBy: "startTime",
      singleEvents: true,
      timeMin: new Date().toISOString(),
    });

    res.json(
      events.data.items.map((event) => ({
        id: event.id,
        title: event.summary,
        date: event.start.date || event.start.dateTime.split("T")[0],
        time: event.start.dateTime?.split("T")[1] || "All Day",
      }))
    );
  } catch (error) {
    res.status(500).send("Error fetching events");
  }
});
app.use(express.json());
app.post("/create-event", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

  const { summary, description, start, end } = req.body;

  if (!summary || !description || !start || !end) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const parsedStart = new Date(start);
  const parsedEnd = new Date(end);

  if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: {
        summary,
        description,
        start: { dateTime: parsedStart, timeZone: "Asia/Kolkata" },
        end: { dateTime: parsedEnd, timeZone: "Asia/Kolkata" },
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error creating event:",
      error.response?.data || error.message
    );
    res.status(500).send("Error creating event");
  }
});

app.delete("/delete-event/:eventId", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
    });
    res.json({ message: "Event deleted successfully", data: response.data });
  } catch (error) {
    console.error(
      "Error deleting event:",
      error.response?.data || error.message
    );
    res.status(500).send("Error deleting event");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("http://localhost:5173");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
