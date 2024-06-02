import { getAllBookings, addBooking as _addBooking, deleteBooking as _deleteBooking, deleteAllBookingsByEmail as _deleteAllBookingsByEmail } from '../models/bookingModel.mjs';

export async function showBookings(req, res) {
  const userEmail = req.params.email;

  try {
    const bookings = await getAllBookings(userEmail);
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Errore durante il recupero delle prenotazioni:", error);
    res.status(500).json({ success: false, message: "Errore durante il recupero delle prenotazioni" });
  }
}
export async function addBooking(req, res) {
  const booking = req.body;

  try {
    await _addBooking(booking);
    res.json({ success: true, message: "Prenotazione effettuata con successo" });
  } catch (error) {
    console.error("Errore durante la prenotazione:", error);
    res.status(500).json({ success: false, message: "Errore durante la prenotazione" });
  }
}
export async function deleteBooking(req, res) {
  const bookingId = req.params.id;

  try {
    await _deleteBooking(bookingId);
    res.json({ success: true, message: "Prenotazione eliminata con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione della prenotazione:", error);
    res.status(500).json({ success: false, message: "Errore durante l'eliminazione della prenotazione" });
  }
}
export async function deleteAllBookingsByEmail(req, res) {
  const userEmail = req.params.email;

  try {
    await _deleteAllBookingsByEmail(userEmail);
    res.json({ success: true, message: "Prenotazioni eliminate con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione delle prenotazioni:", error);
    res.status(500).json({ success: false, message: "Errore durante l'eliminazione delle prenotazioni" });
  }
}
