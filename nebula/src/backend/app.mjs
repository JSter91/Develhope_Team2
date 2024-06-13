import express, { json } from "express";
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
import database from './config/database.mjs';

const { setupDb } = database

import bookingRoutes from './routes/bookingRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';

app.use(cors());
app.use(json());
app.use(morgan('dev'));
app.use(helmet());

setupDb(); // Setup the database

app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res) => {
  console.error("Internal server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
