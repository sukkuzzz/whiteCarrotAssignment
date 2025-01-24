
# Link to the project:- https://white-carrot-assignment.vercel.app/calendar

# Project Title WhiteCarrot Assignment

This is the Calendar page that contains the login button 
<img width="1440" alt="Screenshot 2025-01-24 at 9 11 38 PM" src="https://github.com/user-attachments/assets/74174480-75de-47db-99f0-ea088006e42f" />

After you have successfully logged in you can see existing events on calendar and You can also create an event and also delete an event 
<img width="1440" alt="Screenshot 2025-01-24 at 9 13 46 PM" src="https://github.com/user-attachments/assets/c04355b7-4260-4aad-97c9-e7c8c801b871" />
<img width="1440" alt="Screenshot 2025-01-24 at 9 14 07 PM" src="https://github.com/user-attachments/assets/2e8a5c90-cdf2-4f06-ae49-2bc6746431a1" />


This is the home page that contains detail about the project and also the code snippets 

<img width="1440" alt="Screenshot 2025-01-24 at 9 11 17 PM" src="https://github.com/user-attachments/assets/1691928c-ab3e-4f0b-b4c2-de2d6f606159" />
<img width="1440" alt="Screenshot 2025-01-24 at 9 11 26 PM" src="https://github.com/user-attachments/assets/ae248939-0604-4380-a8bd-360bb6e883ba" />

A **React Calendar App** built with Vite and React for the frontend, and Node.js for the backend. The app uses Google OAuth for user authentication and allows users to view, create, and delete events on their Google Calendar.

## Features

- **Google OAuth Authentication**: Securely log in using your Google account.
- **View Events**: Display events from your Google Calendar.
- **Create Events**: Add new events directly from the application.
- **Delete Events**: Remove events from your calendar with ease.

## Tech Stack

### Frontend
- **Vite**: Fast and modern development build tool.
- **React**: UI library for building the user interface.

### Backend
- **Node.js**: Backend runtime.
- **Express.js**: Framework for building RESTful APIs.
- **Google Calendar API**: For fetching, creating, and deleting events.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or Yarn
- A Google Cloud Platform (GCP) account with Google Calendar API enabled

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sukkuzzz/whiteCarrotAssignment.git
cd whiteCarrotAssignment
```

### 2. Create Google API Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the Google Calendar API for your project.
3. Create OAuth 2.0 credentials:
   - Obtain your **Client ID** and **Client Secret**.
   - Add `http://localhost:5173` (or your frontend URL) as an authorized redirect URI.
4. Download the JSON file containing your credentials and save it securely.

### 3. Configure Environment Variables

Create a `.env` file in the root directory of both your backend and frontend folders.

#### Backend `.env`:
```
PORT=8000
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
REDIRECT_URI=http://localhost:3000
``` 



### 4. Install Dependencies

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd backend
npm install
```

### 5. Run the Application

#### Start the Backend Server:
```bash
cd backend
npm start
```

#### Start the Frontend Server:
```bash
cd frontend
npm run dev
```

### 6. Access the App

Open your browser and navigate to `http://localhost:5173`.



## Scripts

### Backend
- `npm start`: Start the backend server.
- `npm run dev`: Start the backend in development mode.

### Frontend
- `npm run dev`: Start the Vite development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.

## API Endpoints

### Authentication
- `GET /auth`: Handles Google OAuth login.

### Events
- `GET /events`: Fetch all events.
- `POST /create-events`: Create a new event.
- `DELETE /delete-event/:id`: Delete an event by ID.

## Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the frontend to a hosting platform like Vercel
3. Deploy the backend to a server like Render


## Acknowledgments

- [Google Cloud Console](https://console.cloud.google.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)


