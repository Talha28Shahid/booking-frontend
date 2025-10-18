import { useState, useEffect } from "react";
import api from "../services/axios";

export default function UserDashboard() {
  const [vehicleType, setVehicleType] = useState("");
  const [issueDescription, setIssue] = useState("");
  const [preferredDate, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const res = await api.get("/api/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/bookings", {
        vehicleType,
        issueDescription,
        preferredDate,
        location,
      });
      setVehicleType("");
      setIssue("");
      setDate("");
      setLocation("");
      fetchMyBookings(); // refresh list
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create a Booking</h2>
        <form
          onSubmit={handleBooking}
          className="grid grid-cols-1 gap-4"
        >
          <input
            type="text"
            placeholder="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="border px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Issue Description"
            value={issueDescription}
            onChange={(e) => setIssue(e.target.value)}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setDate(e.target.value)}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Book Service
          </button>
        </form>

        <h3 className="text-xl font-semibold mt-8 mb-2">My Bookings</h3>
        <ul className="space-y-2">
          {bookings.map((b) => (
            <li
              key={b._id}
              className="border p-4 rounded bg-gray-50"
            >
              <p>
                <strong>Vehicle:</strong> {b.vehicleType}
              </p>
              <p>
                <strong>Issue:</strong> {b.issueDescription}
              </p>
              <p>
                <strong>Date:</strong> {b.preferredDate}
              </p>
              <p>
                <strong>Location:</strong> {b.location}
              </p>
              <p>
                <strong>Status:</strong> {b.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
