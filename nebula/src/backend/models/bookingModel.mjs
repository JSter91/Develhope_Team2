import database from '../config/database.mjs';

const { db } = database
export function getAllBookings(email) { return db.any("SELECT * FROM bookings WHERE email = $1", email); }
export function addBooking(booking) {
  return db.none(
    "INSERT INTO bookings (id, email, adults, children, baggages, selectedOption, selectedDate, totalPrice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [booking.id, booking.email, booking.adults, booking.children, booking.baggages, booking.selectedOption, booking.selectedDate, booking.totalPrice]
  );
}
export function deleteBooking(id) { return db.none("DELETE FROM bookings WHERE id = $1", id); }
export function deleteAllBookingsByEmail(email) { return db.none("DELETE FROM bookings WHERE email = $1", email); }
