import express from "express";
const router = express.Router();
import { addBooking, showBookings, deleteBooking, deleteAllBookingsByEmail } from "../controllers/bookingController.mjs";
router.post("/", addBooking);
router.get("/:email", showBookings);
router.delete("/:id", deleteBooking);
router.delete("/user/:email", deleteAllBookingsByEmail);

export default router;
