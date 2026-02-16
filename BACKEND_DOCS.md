# Uzhavan Mart Documentation: Backend Setup 📂

This document records the step-by-step setup of our Node.js/Express backend.

---

## 1. Initial Infrastructure
We have set up a standalone `backend/` directory to keep our server logic separate from the React frontend.

### Tech Stack Installed:
1.  **Express**: Our web framework for handling routes.
2.  **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
3.  **Dotenv**: For managing sensitive environment variables (.env).
4.  **CORS**: To bridge the gap between our Frontend (Vite) and Backend (Express).
5.  **Bcryptjs & JWT**: Libraries we will use soon for secure user login.
6.  **Multer & Cloudinary**: For handling image uploads from farmers.

---

## 2. Server Architecture (`server.js`)
The server follows a standard "MERN" entry pattern:
- **Middlewares**: We use `express.json()` to accept data from the frontend and `cors()` to allow cross-origin requests.
- **Environment**: Secrets like the MongoDB URI and Server Port are stored in `.env` for security.
- **Connection**: We use Mongoose to establish a heartbeat with the MongoDB database.

### Current Endpoints:
- `GET /api/ping`: Simple verification route to confirm the server is running.

---

## 3. How to Run
1. Navigate to the backend folder: `cd backend`
2. Start in development mode: `npm run dev` (Uses the new Node 20+ `--watch` feature).

---

## 4. Concepts Learned Today 💡
- **Separation of Concerns**: Keeping frontend and backend dependencies separate avoids version conflicts.
- **CORS (Cross-Origin Resource Sharing)**: Why the browser blocks a React app on port 5173 from talking to a server on port 5000 by default, and how we fix it.
- **ES Modules (`type: module`)**: Using the modern `import` syntax instead of the older `require()`.

---

## 5. Troubleshooting 🛠️

### "Cannot GET /"
If you see this, you are visiting `http://localhost:5000/`. The backend is an **API**, not the main website. The main UI is still hosted at `http://localhost:5173/`. I have now added a welcome message to the backend root so it's clearer.

### "MongoDB Connection Error" (ECONNREFUSED)
This means your local MongoDB service is not running. 
**Finalized Solution**: We are using **MongoDB Atlas**.

#### Steps to set up Atlas:
1.  **Sign Up**: [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2.  **Create Cluster**: Choose **M0 (Free)**.
3.  **Database User**: Create a user with a password.
4.  **Network Access**: Allow IP `0.0.0.0/0`.
5.  **Connect**: Copy the connection string into `backend/.env`.

**Status**: ✅ Successfully connected to MongoDB Atlas on 2026-02-17.
