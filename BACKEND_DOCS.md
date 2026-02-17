# Uzhavan Mart Documentation: Backend & API 📂

This document records the step-by-step setup of our Node.js/Express backend and API logic.

---

## 1. Initial Infrastructure
We have set up a standalone `backend/` directory to keep our server logic separate from the React frontend.

### Tech Stack Installed:
1.  **Express**: Our web framework for handling routes.
2.  **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
3.  **Dotenv**: For managing sensitive environment variables (.env).
4.  **CORS**: To bridge the gap between our Frontend (Vite) and Backend (Express).
5.  **Bcryptjs & JWT**: Libraries we use for secure user login and session management.

---

## 2. Server Architecture (`server.js`)
The server follows a standard "MERN" entry pattern:
- **Middlewares**: We use `express.json()` to accept data from the frontend and `cors()` to allow cross-origin requests.
- **Environment**: Secrets like the MongoDB URI and Server Port are stored in `.env` for security.
- **Authentication Routes**: Mounted at `/api/auth`.

---

## 3. Database & Cloud Setup
**Status**: ✅ Successfully connected to MongoDB Atlas on 2026-02-17.

#### Steps to set up Atlas:
1.  **Sign Up**: [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2.  **Create Cluster**: Choose **M0 (Free)**.
3.  **Database User**: Create a user with a password.
4.  **Network Access**: Allow IP `0.0.0.0/0`.
5.  **Connect**: Copy the connection string into `backend/.env`.

---

## 4. Authentication Module 🔐

### User Schema (`/models/User.js`)
- **Fields**: `name`, `email`, `password`, `role` (buyer/farmer), `phone`.
- **Security**: 
    - Auto-hashing passwords with `bcryptjs` before saving.
    - Password field hidden from API results (`select: false`).
    - Email uniqueness enforced at the database level.

### API Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Create a new account | Public |
| POST | `/api/auth/login` | Login and get JWT Token | Public |

---

## 5. Troubleshooting 🛠️

### "Cannot GET /"
If you see this, you are visiting `http://localhost:5000/`. The backend is an **API**, not the main website. I have added a welcome message to the backend root so it's clearer.

### "MongoDB Connection Error" (ECONNREFUSED / ReplicaSetNoPrimary)
This usually means the IP address is not whitelisted or the cluster is unavailable. 
- **Solution**: Go to Atlas -> Network Access -> Ensure `0.0.0.0/0` is active.
