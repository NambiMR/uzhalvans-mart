import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// 1. CONFIGURATION
// dotenv.config() loads variables from our .env file into process.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. MIDDLEWARES
// cors() allows our frontend (port 5173) to talk to our backend (port 5000)
app.use(cors());
// express.json() allows us to receive and parse JSON data in the request body
app.use(express.json());

// 3. DATABASE CONNECTION
// We use Mongoose to connect to MongoDB. 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 4. BASIC ROUTES
// Root route to show the server is active
app.get('/', (req, res) => {
    res.send('<h1>Uzhavan Mart Backend API</h1><p>The server is running! Use <b>/api/ping</b> to test connection.</p>');
});

// A simple "Ping" route to verify the server is alive
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Pong! Backend server is running successfully.' });
});

// 5. SERVER START
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
