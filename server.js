import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import donorRoutes from './routes/donorRoutes.js';
import centerRoutes from './routes/centerRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import authRoutes from "./routes/auth.js"; 
import db from './db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// // Routes
app.use('/api/donors', donorRoutes);     //  // Donor-related endpoints
app.use('/api/centers', centerRoutes);     // Donation centers 
app.use('/api/appointments', appointmentRoutes); // Appointment management
app.use('/api/campaigns', campaignRoutes); // Blood donation campaigns //////
app.use('/api/requests', requestRoutes);   // Blood requests

app.use("/api/auth", authRoutes);
// Home route
app.get("/", (req, res) => {
  res.send('GiveLife home route running');
});

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

db.connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error("Failed to connect to the database:", err);
});
